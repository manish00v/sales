const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const { sendPasswordResetEmail } = require("./emailService");
const cloudinary = require("../utils/cloudinary");

// Retrieve secrets from environment variables
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "youraccesstokensecret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "yourrefreshtokensecret";

// In-memory storage for refresh tokens (for demonstration only)
let refreshTokens = [];

const otpStore = new Map(); // Store OTPs temporarily

exports.sendEmailOtp = async (email) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    specialChars: false,
  });
  otpStore.set(email, otp);

  // Send email using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  });

  return { message: "OTP sent to email" };
};

exports.verifyEmailOtp = async (email, otp) => {
  if (otpStore.get(email) === otp) {
    otpStore.delete(email);
    return { message: "Email verified successfully" };
  }
  throw new Error("Invalid OTP");
};

exports.registerUser = async ({ name, email, password, phoneNumber }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters, one uppercase letter,lowercase letter,number, and a special character."
    );
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org|gov|edu|co)$/;
  if (!emailRegex.test(email)) {
    throw new Error(
      "Invalid email format. Email must end with .com, .in, .org, etc."
    );
  }
  console.log(name, email, password, phoneNumber)

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      emailVerified: true,
      
    },
  });
};
exports.login = async ({ email, password }) => {
  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  // Compare passwords
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }
  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user.userId, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { userId: user.userId, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Longer-lived refresh token
  );
  // Store the refresh token
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken, user };
};

exports.refreshToken = async ({ token }) => {
  if (!token) {
    throw new Error("Refresh token is required");
  }
  if (!refreshTokens.includes(token)) {
    throw new Error("Invalid refresh token");
  }
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return { accessToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

exports.logout = async ({ token }) => {
  // Remove the refresh token from the in-memory store
  refreshTokens = refreshTokens.filter((t) => t !== token);
  return;
};

exports.forgotPassword = async ({ email }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save reset token in database with expiration time (15 minutes)
  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  // Send email with reset link
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
  await sendPasswordResetEmail(email, resetLink, resetToken, hashedToken);
};

exports.resetPassword = async ({ token, newPassword }) => {
  // Hash the received token (since it's stored hashed in the DB)
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find the user by the hashed token
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { gt: new Date() }, // Ensure token is not expired
    },
  });

  if (!user) {
    throw new Error("Token expired or invalid");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password and clear reset token fields
  await prisma.user.update({
    where: { userId: user.userId },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return { message: "Password reset successfully" };
};

exports.editProfile = async (userId, body, file) => {
  try {
    const { name, phoneNumber, email } = body;

    const existingUser = await prisma.user.findUnique({
      where: { userId },
      select: {
        email: true,
        password: true,
        profilePic: true,
        name: true,
        phoneNumber: true,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Use Cloudinary URL if a new file is uploaded
    let profilePicUrl = existingUser.profilePic;
    if (file) {
      profilePicUrl = file.path; // Cloudinary provides a public URL in 'path'
    }

    const updateData = {
      name: name || existingUser.name,
      phoneNumber: phoneNumber || existingUser.phoneNumber,
      profilePic: profilePicUrl, // Store Cloudinary URL
      email: existingUser.email,
      password: existingUser.password,
    };

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

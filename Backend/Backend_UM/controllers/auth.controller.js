const authService = require("../services/auth.service");

exports.sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.sendEmailOtp(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await authService.verifyEmailOtp(email, otp);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const user = await authService.registerUser({
      name,
      email,
      password,
      phoneNumber,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const tokens = await authService.login(req.body);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editProfile = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debugging
    console.log("Received file:", req.file); // Debugging file upload
    console.log("User ID:", req.userId); // Debugging userId

    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    // Call the service with the correct parameters
    const user = await authService.editProfile(req.userId, req.body, req.file);

    res.status(200).json({ message: "User details edited successfully", user });
  } catch (error) {
    console.error("Edit Profile Error:", error);
    res
      .status(400)
      .json({ error: error.message || "An unknown error occurred" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // Pass the userId from the request (set by the auth middleware)
    const user = await authService.getUser(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data in the response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const tokens = await authService.refreshToken(req.body);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await authService.logout(req.body);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const data = await authService.forgotPassword(req.body);
    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

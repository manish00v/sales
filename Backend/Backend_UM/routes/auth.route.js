const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { forgotPasswordLimiter } = require("../middlewares/rateLimit");
const { validateResetPassword } = require("../middlewares/validation");
const authenticate = require("../middlewares/auth.middleware");
const upload = require("../utils/multer");

router.get("/get-user", authenticate, authController.getUser);

// Registration endpoint
// router.post("/register", authController.register);

// Email OTP routes
router.post("/send-email-otp", authController.sendEmailOtp);
router.post("/verify-email-otp", authController.verifyEmailOtp);

// Phone OTP routes
// router.post("/send-phone-otp", authController.sendPhoneOtp);
// router.post("/verify-phone-otp", authController.verifyPhoneOtp);

// User Registration
router.post("/register", authController.registerUser);

// Login endpoint
router.post("/login", authController.login);

router.patch(
  "/edit-profile",
  authenticate,
  upload.single("profilePic"),
  authController.editProfile
);

// Refresh token endpoint
router.post("/refresh-token", authController.refreshToken);

// Logout endpoint
router.post("/logout", authController.logout);

// Forgot and Reset Password Routes
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validateResetPassword,
  authController.resetPassword
);

module.exports = router;

const validator = require("validator");

exports.validateResetPassword = (req, res, next) => {
  const { newPassword } = req.body;

  if (
    !validator.isStrongPassword(newPassword, { minLength: 8, minNumbers: 1 })
  ) {
    return res
      .status(400)
      .json({
        error: "Password must be at least 8 characters and include numbers",
      });
  }

  next();
};

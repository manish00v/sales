
import "./login.css";
import galvinusLogo from "../assets/galvinus_logo.jpeg";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [showEmailOTPInput, setShowEmailOTPInput] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number input: allow only numbers
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Only numbers are allowed",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: "" })); // Clear error if input is valid
    }

    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!register.name) newErrors.name = "Name is required.";
    if (!register.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(register.email))
      newErrors.email = "Invalid email address.";
    if (!register.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    if (!register.password || register.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmailVerification = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/send-email-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: register.email }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send OTP");

      setShowEmailOTPInput(true);
      toast.success("OTP sent to email!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyEmailOTP = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-email-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: register.email, otp: emailOTP }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid OTP");

      setEmailVerified(true);
      setShowEmailOTPInput(false);
      toast.success("Email verified!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerUser = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    if (!emailVerified) {
      toast.error("Please verify email first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        throw new Error(data.error || "Registration failed");
      }

      alert("User Registered Successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-form">
      <Toaster position="top-center" />
      <div className="logo-box">
        <img src={galvinusLogo} alt="galvinus-logo" />
      </div>
      <h2>Sales & Distribution Sign Up</h2>

      <form onSubmit={registerUser}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={register.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={register.email}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={sendEmailVerification}
            disabled={emailVerified}
          >
            {emailVerified ? "✅ Verified" : "Verify Email"}
          </button>
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {showEmailOTPInput && (
          <div className="otp-input">
            <input
              type="text"
              placeholder="Enter Email OTP"
              value={emailOTP}
              onChange={(e) => setEmailOTP(e.target.value)}
            />
            <button type="button" onClick={verifyEmailOTP}>
              Verify
            </button>
          </div>
        )}

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={register.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            value={register.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && (
            <span className="error-text">{errors.phoneNumber}</span>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <a href="login">Login</a>
      </p>
    </div>
  );
};

export default SignUp;

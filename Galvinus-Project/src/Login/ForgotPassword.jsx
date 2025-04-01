import "./login.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import galvinusLogo from "../assets/galvinus_logo.jpeg";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org|gov|edu|co)$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset link");
      }

      toast.success("Reset link sent!");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-form">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="logo-box">
        <img src={galvinusLogo} alt="galvinus-logo" />
      </div>
      <h2>Sales & Distribution Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="error">{emailError}</p>}
        <button type="submit">Reset Password</button>
      </form>
      <p>
        Remember your password? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default ForgotPassword;

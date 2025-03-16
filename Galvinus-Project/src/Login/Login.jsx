// src/components/Login.js
import './login.css';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import galvinusLogo from "../assets/galvinus_logo.jpeg";

const Login = () => {
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  // Function to detect if the input is an email or phone number
  const detectInputType = (input) => {
    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex for phone number validation (simple check for digits, adjust as needed)
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number

    if (emailRegex.test(input)) {
      return "email";
    } else if (phoneRegex.test(input)) {
      return "phone";
    } else {
      return "invalid";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputType = detectInputType(emailOrPhone);

    if (inputType === "invalid") {
      alert("Please enter a valid email or phone number.");
      return;
    }

    if (login(inputType === "email" ? emailOrPhone : null, inputType === "phone" ? emailOrPhone : null, password)) {
      alert("Login successful!");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-form">
      <div className="logo-box">
        <img src={galvinusLogo} alt="galvinus-logo" />
      </div>
      <h2> Sales & Distribution Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email or Phone Number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        <a href="forgotpassword">Forgot Password?</a>
      </p>
      <p>
        Don't have an account? <a href="signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
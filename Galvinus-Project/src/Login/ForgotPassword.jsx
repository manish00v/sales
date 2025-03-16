// src/components/ForgotPassword.js
import './login.css'
import { useState, useContext,useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import galvinusLogo from "../assets/galvinus_logo.jpeg"

const ForgotPassword = () => {

    useEffect(() => {
      document.body.classList.add('login-page');
      return () => {
        document.body.classList.remove('login-page');
      };
    }, []);
    

  const [email, setEmail] = useState("");
  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forgotPassword(email)) {
      alert(`Password reset link sent to ${email}`);
    } else {
      alert("Failed to send reset link");
    }
  };

  return (
    <div className="auth-form">
      <div className="logo-box">
                <img src={galvinusLogo} alt="galvinus-logo" />
      </div>
      <h2> Sales & Distribution Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>
        Remember your password? <a href="login">Login</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
import "./login.css";
import { useState } from "react";
import galvinusLogo from "../assets/galvinus_logo.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("accessToken", data.accessToken); // Store token
      localStorage.setItem("refreshToken", data.refreshToken);
      toast.success("User logged in successfully!", { position: "top-center" });

      setLogin({
        email: "",
        password: "",
      });

      setError(""); // Clear error after successful login

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      setError(error.message); // Set error message from backend
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
          name="email"
          value={login.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={login.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />

        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
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

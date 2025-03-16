// src/AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulate login logic
    if (email === "user@example.com" && password === "password") {
      setUser({ email });
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    // Simulate registration logic
    setUser({ email });
    return true;
  };

  const forgotPassword = (email) => {
    // Simulate forgot password logic
    console.log(`Password reset link sent to ${email}`);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
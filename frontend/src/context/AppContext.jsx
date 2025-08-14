// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Context create करें
export const AppContext = createContext();

// 2️⃣ Provider component बनाएँ
export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


  // 🖼️ Image states
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  // 👤 Auth states
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // 🔁 Restore user info if needed (optional)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Register
  const handleRegister = async (userData) => {
    try {
      const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token;
        setToken(token);
        localStorage.setItem("token", token);

        // Save user info if provided
        const userInfo = { username: userData.username, email: userData.email };
        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));

        return { success: true, data };
      } else {
        return { success: false, message: data.message || "Registration failed." };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Network error." };
    }
  };

  // ✅ Login
  const handleLogin = async (credentials) => {
    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token;
        setToken(token);
        localStorage.setItem("token", token);

        // Save user info if provided (adjust based on your backend response)
        const userInfo = { email: credentials.email };
        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));

        return { success: true, data };
      } else {
        return { success: false, message: data.message || "Login failed." };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error." };
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  // 🎁 Context value (जो सब components को मिलेगा)
  const value = {
    backendUrl,
    image,
    setImage,
    resultImage,
    setResultImage,
    user,
    token,
    handleRegister,
    handleLogin,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


export default AppContextProvider;
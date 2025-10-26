import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider initializing...");
    const currentUser = authService.getCurrentUser();
    console.log("Current user from storage:", currentUser);

    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      console.log("AuthContext: Attempting login");
      // ✅ CORRECT: Use authService.login()
      const user = await authService.login(userData);
      setUser(user);
      console.log("AuthContext: Login successful", user);
      return { success: true, user };
    } catch (error) {
      console.error("AuthContext: Login error", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return {
        success: false,
        message,
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log("AuthContext: Attempting registration");
      // ✅ CORRECT: Use authService.register()
      const user = await authService.register(userData);
      setUser(user);
      console.log("AuthContext: Registration successful", user);
      return { success: true, user };
    } catch (error) {
      console.error("AuthContext: Registration error", error);
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      return {
        success: false,
        message,
      };
    }
  };

  const logout = () => {
    console.log("AuthContext: Logging out");
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(data.status);
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = async (email, username, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/signup",
        { email, username, password },
        { withCredentials: true }
      );
      
      if (data.success) {
        setIsAuthenticated(true);
        toast.success("Signup successful! Welcome to our platform!", {
          onClose: () => navigate("/")
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
    }
  };

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        { username, password },
        { withCredentials: true }
      );
      
      if (data.success) {
        setIsAuthenticated(true);
        toast.success("Logged in successfully!", {
          onClose: () => navigate("/")
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success("Logged out successfully", {
        onClose: () => {
          navigate("/login");
        }
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 
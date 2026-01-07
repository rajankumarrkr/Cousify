import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("cousify_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("cousify_token") || ""
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar token hai to user ko as-is use kar rahe hain (MVP ke liye)
    setLoading(false);
  }, [token]);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);

    localStorage.setItem("cousify_user", JSON.stringify(userData));
    localStorage.setItem("cousify_token", accessToken);
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint to clear refresh token cookie
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setToken("");
      localStorage.removeItem("cousify_user");
      localStorage.removeItem("cousify_token");
    }
  };

  const value = { user, token, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

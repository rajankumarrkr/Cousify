import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {id, name, email, role}
  const [token, setToken] = useState(localStorage.getItem("cousify_token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    // TODO: optionally call /auth/me to validate token later
    setLoading(false);
  }, [token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("cousify_token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("cousify_token");
  };

  const value = { user, token, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("cine_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(()=>{
    if (user) localStorage.setItem("cine_user", JSON.stringify(user));
    else localStorage.removeItem("cine_user");
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

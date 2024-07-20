import React, { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <SessionContext.Provider
      value={{ user, setUser, signOut, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </SessionContext.Provider>
  );
};

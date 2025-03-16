import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setIsAuth(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuth(false);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

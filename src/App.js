import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar/nav-bar";
import { useAuth } from "./hooks/auth-context";
import ChangePassword from "./pages/change-password";
import DatasPage from "./pages/datas";
import LoginPage from "./pages/login";

const AdminPanel = () => {
  const { isAuth, logout } = useAuth();

  return (
    <Router>
      <div className="page_wrapper container">
        <NavBar />

        <div className="pages_content ">
          {isAuth ? (
            <Routes>
              <Route path="/" element={<DatasPage />} />
              <Route path="/data" element={<DatasPage />} />
              <Route path="/password-change" element={<ChangePassword />} />
            </Routes>
          ) : (
            <LoginPage />
          )}
        </div>
      </div>
    </Router>
  );
};

export default AdminPanel;

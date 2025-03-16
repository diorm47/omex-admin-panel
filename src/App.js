import React, { useState } from "react";
import DatasPage from "./components/datas";
import LoginPage from "./components/login";
import { useAuth } from "./hooks/auth-context";
import ChangePassword from "./components/change-password";

const AdminPanel = () => {
  const { isAuth, logout } = useAuth();

  const [passChange, setPassChange] = useState(false);
  return (
    <div className="page_wrapper">
      {isAuth ? (
        <div className="page_menu">
          <p onClick={() => setPassChange(false)}>Обновить контент</p>
          <p onClick={() => setPassChange(true)}>Сменить пароль</p>
          <p onClick={logout}>Выйти</p>
        </div>
      ) : (
        ""
      )}

      <div className="container">
        <h2>Админ-панель</h2>

        {passChange ? (
          <ChangePassword />
        ) : (
          <> {isAuth ? <DatasPage /> : <LoginPage />} </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

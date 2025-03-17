import React, { useState } from "react";
import "./nav-bar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Menu } from "../../assets/icons/menu.svg";
import { ReactComponent as CloseMenu } from "../../assets/icons/close-menu.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/auth-context";

function NavBar() {
  const { isAuth, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  return (
    <nav>
      <div className="nav_wrapper">
        <NavLink to="/">
          <div className="nav_logo">
            <Logo />
            <p>Omexeth admin</p>
          </div>
        </NavLink>
        <div className="nav_menu">
          <NavLink to="/data">
            <p>Data change</p>
          </NavLink>
          <NavLink to="/password-change">
            <p>Password change</p>
          </NavLink>
          <p onClick={logout}>Logout</p>
        </div>
        <Menu className="mob_menu_btn" onClick={() => setMenu(!menu)} />
      </div>
      <div class={menu ? "mob_menu visible_mob_menu" : "mob_menu"}>
        <div class="mob_menu_exit">
          <CloseMenu onClick={() => setMenu(!menu)} />
        </div>
        <div className="nav_menu">
          <NavLink to="/data">
            <p>Data change</p>
          </NavLink>
          <NavLink to="/password-change">
            <p>Password change</p>
          </NavLink>
          <p onClick={logout}>Logout</p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

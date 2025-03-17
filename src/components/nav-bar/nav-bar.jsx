import React from "react";
import "./nav-bar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

function NavBar() {
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
          <p>Logout</p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

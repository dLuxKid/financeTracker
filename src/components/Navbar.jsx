// import React from "react";
import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../contexts/authContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { ...state } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Tracka</li>
        {state?.user ? (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

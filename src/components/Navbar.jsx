//  REACT
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// STYLE
import styles from "./navbar.module.css";
// ICON
import { FiBarChart2 } from "react-icons/fi";
// HOOK
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../contexts/authContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Fin9nce Traka</li>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className={showMenu && styles.navMenu}
          style={{ display: !showMenu && "none" }}
        >
          {user ? (
            <div className={styles.navItem}>
              <li>Hello {user.displayName}</li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <li onClick={() => setShowMenu(!showMenu)}>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          )}
        </div>
        <div className={styles.navIcon} onClick={() => setShowMenu(!showMenu)}>
          <FiBarChart2 />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

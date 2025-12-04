import React, { useCallback, useContext, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./Header.module.css";


function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = useMemo(() => location?.pathname === "/login", [location?.pathname]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const linkClass = ({ isActive }) => (isActive ? styles.activeLink : styles.link);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.logoWrapper}>
        <img src="logo.png" alt="CineFlex" className={styles.logoImage} />
      </div>

      {!isLoginPage && (
        <>
          <nav className={styles.menu} aria-label="Main navigation">
            <NavLink to="/" className={linkClass}>
              HOME
            </NavLink>

            <NavLink to="/allMovies" className={linkClass}>
              ALL MOVIES
            </NavLink>

            {user && (
              <NavLink to="/showTime" className={linkClass}>
                NOW SHOWING
              </NavLink>
            )}
          </nav>

          <div className={styles.rightSide}>
            {user ? (
              <>
                <span className={styles.username} aria-live="polite">
                  Hi {user.name}
                </span>
                <span className={styles.separator} aria-hidden="true"> | </span>
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                  aria-label="Logout"
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={styles.loginBtn}>
                LOGIN
              </NavLink>
            )}
          </div>
        </>
      )}
    </header>
  );
}

export default React.memo(Header);
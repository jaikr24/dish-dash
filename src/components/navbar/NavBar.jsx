import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { usePlate } from "../../contexts/PlateProvider";
import { useAccount } from "../../contexts/AccountProvider";

function NavBar({ page, setPage }) {
  const { plateItems } = usePlate();

  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const currentPage = useLocation();
  const { loggedIn, setLoggedIn } = useAccount();

  useEffect(
    function () {
      setPage(currentPage.pathname);
    },
    [setPage, currentPage]
  );

  function authenticate() {
    setLoggedIn((initial) => !initial);
  }

  const handleScroll = () => {
    const currentScrollTop = document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navContainer} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div>
        <h1 className={styles.navLabel}>DishDash</h1>
      </div>

      <div className={styles.itemContainer}>
        <ul className={styles.navItems}>
          <li className={page === "/" ? styles.currentNav : ""}>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className={page === "/menu" ? styles.currentNav : ""}>
            <NavLink to={"/menu"}>Menu</NavLink>
          </li>
          <li className={page === "/plate" ? styles.currentNav : ""}>
            <NavLink to={"/plate"}>Plate</NavLink>
            {plateItems.size > 0 && (
              <span className={styles.badge}>{plateItems.size}</span>
            )}
          </li>
        </ul>
      </div>

      {loggedIn ? (
        <button className={styles.logoutBtn} onClick={authenticate}>
          Log out
        </button>
      ) : (
        <button className={styles.logoutBtn} onClick={authenticate}>
          Log in
        </button>
      )}
    </nav>
  );
}

export default NavBar;

import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { usePlate } from "../../contexts/PlateProvider";
import { useAccount } from "../../contexts/AccountProvider";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";

function NavBar({ page, setPage }) {
  let lastScrollTop = 0;

  const currentPage = useLocation();
  const { plateItems } = usePlate();

  const [isVisible, setIsVisible] = useState(true);

  const { loggedIn, setLoggedIn } = useAccount();
  const { signOut, getUserAttributes } = useCognitoAuth();

  useEffect(
    function () {
      setPage(currentPage.pathname);
    },
    [setPage, currentPage]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
    setLoggedIn(false);
  }

  function handleScroll() {
    const currentScrollTop = document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }

  // async function getAttributes() {
  //   try {
  //     const data = await getUserAttributes();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
        <button className={styles.logoutBtn} onClick={handleSignOut}>
          Sign out
        </button>
      ) : (
        <button className={styles.logoutBtn}>Sign in</button>
      )}
    </nav>
  );
}

export default NavBar;

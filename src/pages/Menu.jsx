// import { useEffect, useState } from "react";
import Section from "../components/menu/Section";
import styles from "./Menu.module.css";
import { useMenu } from "../contexts/MenuProvider";

// "server": "json-server --watch data/items.json --port 8000"

function Menu() {
  const menu = useMenu();

  return (
    <div className={styles.menu}>
      {/* <h1 className={styles.menuLabel}>----- Menu -----</h1> */}
      <div className={styles.menuSections}>
        {Object.keys(menu).map((section) => (
          <Section section={section} key={section} />
        ))}
      </div>
    </div>
  );
}

export default Menu;

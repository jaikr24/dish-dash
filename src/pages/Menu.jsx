// import { useEffect, useState } from "react";
import Section from "../components/menu/Section";
import styles from "./Menu.module.css";
import { useMenu } from "../contexts/MenuProvider";

// "server": "json-server --watch data/items.json --port 8000"

function Menu() {
  const menu = useMenu();

  // useEffect(function () {
  //   async function getMenuItems() {
  //     try {
  //       const res = await fetch("http://localhost:8000/Recommended");
  //       const data = res.json();
  //       if (!data) throw new Error("No menu availale");
  //       // setMenu(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getMenuItems();
  // }, []);

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

import { useMenu } from "../../contexts/MenuProvider";
import Item from "./Item";
import styles from "./Section.module.css";

function Section({ section }) {
  const menu = useMenu();
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionLable}>{section}</h2>
      <div className={styles.sectionItems}>
        {menu[section].map((item) => (
          <Item item={item} />
        ))}
      </div>
    </div>
  );
}

export default Section;

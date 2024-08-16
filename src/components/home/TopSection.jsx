import styles from "./TopSection.module.css";

function TopSection() {
  return (
    <div className={styles.topsection}>
      <div className={styles.background}>
        <img src="./home/topsection/top-section-2.png " alt="" />
      </div>
      <div className={styles.quote}>
        <h2>Life is too short to eat boring food</h2>
      </div>
    </div>
  );
}

export default TopSection;

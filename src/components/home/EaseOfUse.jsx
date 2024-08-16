import styles from "./EaseOfUse.module.css";

function EaseOfUse() {
  return (
    <div className={styles.easeOfUseSection}>
      <div className={styles.easeOfUse}>
        <div className={styles.imageContainer}>
          <img src="./home/easeofuse/website.svg" alt="" />
        </div>
        <p className={styles.imageLabel}>Esay to Order</p>
        <p className={styles.imageDescription}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          animi doloribus nulla.
        </p>
      </div>

      <div className={styles.easeOfUse}>
        <div className={styles.imageContainer}>
          <img src="./home/easeofuse/delivery.svg" alt="" />
        </div>
        <p className={styles.imageLabel}>Fastest Delivery</p>
        <p className={styles.imageDescription}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          animi doloribus nulla.
        </p>
      </div>

      <div className={styles.easeOfUse}>
        <div className={styles.imageContainer}>
          <img src="./home/easeofuse/badge.svg" alt="" />
        </div>
        <p className={styles.imageLabel}>Best Quality</p>
        <p className={styles.imageDescription}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          animi doloribus nulla.
        </p>
      </div>
    </div>
  );
}

export default EaseOfUse;

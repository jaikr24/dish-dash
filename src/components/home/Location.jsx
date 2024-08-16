import styles from "./Location.module.css";

function Location() {
  return (
    <div className={styles.location}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Location"></input>
        <img src="./home/location/location-crosshairs.svg" alt="" />
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.deliveryButton}>Delivery</button>
        <p> or </p>
        <button className={styles.pickupButton}>Pickup</button>
      </div>
    </div>
  );
}

export default Location;

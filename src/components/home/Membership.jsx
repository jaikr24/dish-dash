import styles from "./Membership.module.css";

function Membership() {
  return (
    <div className={styles.membership}>
      <div className={styles.membershipContainer}>
        <div className={styles.imageContainer}>
          <img src="./home/membership/membership-background.jpg" alt="" />
        </div>

        <p>
          Join our prime membership and get offers like never before on delivery
          and dine-in.
        </p>

        <div className={styles.inputContainer}>
          <input type="text" placeholder="Email" />
          <button>Join</button>
        </div>
        
      </div>
    </div>
  );
}

export default Membership;

import Authentication from "../components/authentication/Authentication";
import PlateItem from "../components/plate/PlateItem";
import { useAccount } from "../contexts/AccountProvider";
import { usePlate } from "../contexts/PlateProvider";
import styles from "./Plate.module.css";

function Plate() {
  const { plateItems, totalPrice } = usePlate();
  const { loggedIn } = useAccount();

  return (
    <>
      {!loggedIn && <Authentication />}
      <div className={styles.plate}>
        {plateItems.size === 0 && (
          <div className={styles.blankPlate}>
            <p>Your plate is empty</p>
            <img src="./plate/plate-with-fork-and-knife.svg" alt="" />
          </div>
        )}
        <div className={styles.foodSection}>
          <div className={styles.plateItemsSection}>
            {Array.from(plateItems.entries()).map(
              ([item, itemQuantity]) => (
                //   itemQuantity !== 0 && (
                <PlateItem item={item} quantity={itemQuantity} />
              )
              //) // will stop rendering of items with quantity = 0
            )}
          </div>

          {plateItems.size !== 0 && (
            <div className={styles.billSection}>
              <h3>Grand Total: ₹{totalPrice}</h3>
              <button>Proceed to Pay</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Plate;

import { usePlateUpdte } from "../../hooks/usePlateUpdate";
import styles from "./PlateItem.module.css";

function PlateItem({ item, quantity }) {
  const { increaseQuantity, decreaseQuantity, deleteItem } =
    usePlateUpdte(item);

  return (
    <div className={styles.plateItem}>
      <div className={styles.plateItemInfo}>
        <p>{item.name}</p>
        <p>{item.price}</p>
        <p>{item.price * quantity}</p>
      </div>
      <div className={styles.quantityButton}>
        <button onClick={decreaseQuantity}>-</button>
        <p key={quantity}>{quantity}</p>
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button onClick={deleteItem}>&#10006;</button>
    </div>
  );
}

export default PlateItem;

import { usePlate } from "../../contexts/PlateProvider";
import { usePlateUpdte } from "../../hooks/usePlateUpdate";
import styles from "./Item.module.css";

function Item({ item }) {
  const { plateItems } = usePlate();

  const { addItem, increaseQuantity, decreaseQuantity } = usePlateUpdte(item);

  return (
    <div className={`${styles.item} ${item.inStock ? "" : styles.outOfStock}`}>
      <img src={item.image} alt=""></img>
      <div className={styles.infoContainer}>
        <p className={styles.cardName}>{item.name}</p>
        {/* <p className={styles.cardPrice}>{`Rs. ${item.price}`}</p> */}
        <div className={styles.priceAndRating}>
          <p className={styles.cardPrice}>{`Rs. ${item.price}`}</p>
          <div className={styles.rating}>
            <img src="./home/reviews/star.svg" alt="" />
            <p>4.5</p>
          </div>
        </div>
      </div>

      <div className={styles.cardButtonContainer}>
        {item.inStock ? (
          plateItems.get(item) > 0 ? (
            <>
              <button className={styles.buttonLeft} onClick={decreaseQuantity}>
                -
              </button>
              <p key={plateItems.get(item)} className={styles.quantity}>
                {plateItems.get(item)}
              </p>
              <button className={styles.buttonRight} onClick={increaseQuantity}>
                +
              </button>
            </>
          ) : (
            <button className={styles.addButton} onClick={addItem}>
              Add
            </button>
          )
        ) : (
          <p className={styles.outOfStockText}>Not available</p>
        )}
      </div>
    </div>
  );
}

export default Item;

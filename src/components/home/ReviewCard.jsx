import styles from "./ReviewCard.module.css";

function ReviewCard({ review }) {
  return (
    <div className={styles.reviewCard}>
      <h4 className={styles.reviewName}>{review.name}</h4>
      <div className={styles.reviewContainer}>
        <img src="./home/reviews/quote.svg" alt="" className={styles.quote} />
        <p className={styles.review}>{review.review}</p>
      </div>
      <div className={styles.ctarContainer}>
        {review.rating.map((isStar) =>
          isStar ? (
            <img src="./home/reviews/star.svg" alt="" className={styles.star} />
          ) : (
            <img
              src="./home/reviews/starblank.svg"
              alt=""
              className={styles.star}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ReviewCard;

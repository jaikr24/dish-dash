import ReviewCard from "./ReviewCard";
import styles from "./Reviews.module.css";

const reviewData = [
  {
    name: "Jai",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum architecto similique tempora corporis? Incidunt, dolores",
    rating: [true, true, true, true, true],
  },
  {
    name: "Piyush",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum architecto similique tempora corporis? Incidunt, dolores",
    rating: [true, true, true, true, false],
  },
  {
    name: "Wasim",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum architecto similique tempora corporis? Incidunt, dolores",
    rating: [true, true, true, true, true],
  },
  {
    name: "Shail",
    review:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum architecto similique tempora corporis? Incidunt, dolores",
    rating: [true, true, true, true, false],
  },
];

function Reviews() {
  return (
    <div className={styles.reviews}>
      <h2 className={styles.reviewsLabel}>
        Our Lovely Customers Love Our Food
      </h2>
      <div className={styles.reviewsContainer}>
        {reviewData.map((review) => (
          <ReviewCard review={review} />
        ))}
      </div>
    </div>
  );
}

export default Reviews;

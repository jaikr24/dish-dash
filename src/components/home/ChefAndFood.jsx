import styles from "./ChefAndFood.module.css";

function ChefAndFood() {
  return (
    <div className={styles.chefandfood}>
      <div className={styles.imageContainer}>
        <img src="./home/chefandfood/chef.svg" alt="" />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.infoHeading}>
          Elevate Your Palate: Exceptional Food by Our Master Chef
        </p>
        <p className={styles.infoDescription}>
          Discover a world of flavor with our exquisite dishes, meticulously
          prepared by our skilled chef. Each plate is a masterpiece, showcasing
          the finest ingredients and culinary techniques. Experience a dining
          adventure where passion meets creativity, and every bite tells a
          story. Come and taste the difference!
        </p>
      </div>
    </div>
  );
}

export default ChefAndFood;

import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <img src="./authentication/loader.svg" alt="loader" className={styles.loaderImage}/>
    </div>
  );
}

export default Loader;

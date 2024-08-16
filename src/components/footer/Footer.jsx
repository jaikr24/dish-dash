import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <div className={styles.subscriptionContainer}>
          <p className={styles.subscriptionLabel}>
            Subscribe for latest offers
          </p>
          <form className={styles.subscription}>
            <input type="text" placeholder="Enter Your Email"></input>
            <button>SUBSCRIBE</button>
          </form>
        </div>
      </div>
      <div className={styles.footeRight}>
        <div className={styles.socialsContainer}>
          <p>Get in touch</p>
          <Socials />
        </div>
      </div>
    </div>
  );
}

function Socials() {
  return (
    <div className={styles.socials}>
      <a href="https://github.com/jaikr24">
        <img src="./Social/github-svgrepo-com.svg" alt="" />
      </a>
      <a href="https://instagram.com/j41kr">
        <img src="./Social/instagram-svgrepo-com.svg" alt="" />
      </a>
      <a href="https://www.linkedin.com/in/jaikr24/">
        <img src="./Social/linkedin-svgrepo-com.svg" alt="" />
      </a>
      <a href="https://x.com/j41kr">
        <img src="./Social/twitter-svgrepo-com.svg" alt="" />
      </a>
    </div>
  );
}
export default Footer;

import { useState } from "react";
import styles from "./Authentication.module.css";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import { useAccount } from "../../contexts/AccountProvider";
import Loader from "./Loader";

function Authentication({ page = "/plate" }) {
  const [hasAccount, setHasAccount] = useState(true);
  const [showDialog, setShowDialog] = useState(true);

  const { isLoading } = useAccount();

  function slide() {
    setHasAccount((initial) => !initial);
  }

  function visibility() {
    setShowDialog((initial) => !initial);
  }

  return (
    <div className={`${showDialog ? styles.authentication : styles.close}`}>
      {isLoading && <Loader />}
      <div className={styles.authContainer}>
        {page !== "/plate" && (
          <p className={styles.closeButton} onClick={visibility}>
            &#10006;
          </p>
        )}
        <div
          className={`${styles.cover} ${
            hasAccount ? styles.moveLeft : styles.moveRight
          }`}
        >
          <h2>
            {hasAccount ? "Don't have an account!" : "Already have an account"}
          </h2>
          <button onClick={slide}>
            {hasAccount ? "Create an account" : "Sign in to account"}
          </button>
        </div>
        <div className={styles.formContainer}>
          <SignUpForm hasAccount={hasAccount} />
          <LogInForm hasAccount={hasAccount} />
        </div>
      </div>
    </div>
  );
}

export default Authentication;

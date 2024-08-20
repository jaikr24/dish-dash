import { useState } from "react";
import { useAccount } from "../../contexts/AccountProvider";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";
import styles from "./SignUpForm.module.css";

function SignUpForm({ hasAccount }) {
  const [verification, setVerification] = useState(false);
  const [message, setMessage] = useState();
  const [verificationCode, setVerificationCode] = useState(null);

  const {
    setLoggedin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    setIsLoading,
    resetFields,
  } = useAccount();

  const { signUp, verifyUser, signIn } = useCognitoAuth();

  function messageType(err) {
    switch (err.code) {
      case "CodeMismatchException":
        setMessage("Invalid verification code provided, please try again.");
        break;
      default:
        setMessage("An unknown error occurred.");
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);
      await signUp(name, email, password);
      console.log(
        "Sign-up successful! Please check your email for the verification code."
      );
      setVerification(true);
    } catch (err) {
      setMessage(err.split('"').join(""));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (verificationCode === null) return;
    try {
      setIsLoading(true);
      setMessage("");
      await verifyUser(email, verificationCode);
      console.log(email);
      console.log(password);
      await signIn(email, password);
      setLoggedin(true);
      setVerification(false);
      resetFields();
    } catch (err) {
      console.log(err);
      messageType(err);
      // setMessage(err.split('"').join(""));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {verification ? (
        <form
          className={`${styles.signupForm} ${
            hasAccount ? styles.scaleDown : styles.scaleUp
          }`}
          onSubmit={handleVerify}
        >
          <input
            className={styles.verificationCodeBox}
            type="text"
            placeholder="Verification Code"
            maxLength={6}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="submit">Verify</button>
          <p className={styles.message}>{message}</p>
        </form>
      ) : (
        <form
          className={`${styles.signupForm} ${
            hasAccount ? styles.scaleDown : styles.scaleUp
          }`}
          onSubmit={handleSignUp}
        >
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign up</button>
          <p className={styles.message}>{message}</p>
        </form>
      )}
    </>
  );
}

export default SignUpForm;

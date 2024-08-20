import { useState } from "react";
import { useAccount } from "../../contexts/AccountProvider";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";
import styles from "./LogInForm.module.css";
import PasswordResetForm from "./PasswordResetForm";

function LogInForm({ hasAccount }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setLoggedIn,
    setIsLoading,
    resetFields,
  } = useAccount();

  const [message, setMessage] = useState();

  const { signIn } = useCognitoAuth();

  const [resetPassword, setResetPassword] = useState(false);

  function messageType(err) {
    switch (err.code) {
      case "NotAuthorizedException":
        setMessage("Incorrect username or password.");
        break;
      case "UserNotFoundException":
        setMessage("User does not exist.");
        break;
      default:
        setMessage("An unknown error occurred.");
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    if (email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signIn(email, password);
      setLoggedIn(true);
      resetFields();
    } catch (err) {
      messageType(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {resetPassword ? (
        <PasswordResetForm />
      ) : (
        <form
          onSubmit={handleSignIn}
          className={`${styles.loginForm} ${
            hasAccount ? styles.scaleUp : styles.scaleDown
          }`}
        >
          <h2>Log In</h2>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            className={styles.passwordReset}
            onClick={() => setResetPassword(true)}
          >
            Forgot Password
          </p>
          <button type="submit">Sign in</button>
          <p className={styles.message}>{message}</p>
        </form>
      )}
    </>
  );
}

export default LogInForm;

import { useState } from "react";
import { useAccount } from "../../contexts/AccountProvider";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";
import styles from "./PasswordResetForm.module.css";

function PasswordResetForm() {
  const {
    email,
    setEmail,
    message,
    setMessage,
    verificationCode,
    setVerificationCode,

    setIsLoading,

    resetFields,
  } = useAccount();
  const { initiatePasswordReset, confirmPasswordReset } = useCognitoAuth();

  const [codeSent, setCodeSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handlePasswordReset(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await initiatePasswordReset(email);
      setMessage("Code Sent to your email");
      setCodeSent(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirmPassword(e) {
    e.preventDefault();
    if (confirmPassword !== newPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await confirmPasswordReset(email, verificationCode, newPassword);
      setMessage("Password Changed");
    } catch (err) {
      console.log(err);
    } finally {
      codeSent(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      {!codeSent ? (
        <form className={`${styles.loginForm}`} onSubmit={handlePasswordReset}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Get Code</button>
          <p className={styles.message}>{message}</p>
        </form>
      ) : (
        <form className={`${styles.loginForm}`}>
          <input
            type="password"
            placeholder="New Password"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            className={styles.verificationCodeBox}
            type="text"
            placeholder="Verification Code"
            maxLength={6}
            required
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="submit" onClick={handleConfirmPassword}>
            Change Password
          </button>
          <p className={styles.message}>{message}</p>
        </form>
      )}
    </>
  );
}

export default PasswordResetForm;

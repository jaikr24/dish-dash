import styles from "./LogInForm.module.css";

function LogInForm({ hasAccount }) {
  return (
    <>
      <form
        className={`${styles.loginForm} ${
          hasAccount ? styles.scaleUp : styles.scaleDown
        }`}
      >
        <h2>Log In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <p>Forgot Password</p>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}

export default LogInForm;

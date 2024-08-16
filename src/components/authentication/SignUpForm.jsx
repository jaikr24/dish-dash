import styles from "./SignUpForm.module.css";

function SignUpForm({ hasAccount }) {
  return (
    <form
      className={`${styles.signupForm} ${
        hasAccount ? styles.scaleDown : styles.scaleUp
      }`}
    >
      <h2>Sign Up</h2>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUpForm;

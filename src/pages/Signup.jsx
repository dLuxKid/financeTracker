import { useState } from "react";
import styles from "./signup.module.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(() => ({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Login</h2>
      <label>
        <span>username:</span>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formValues.username}
        />
      </label>
      <label>
        <span>email:</span>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formValues.password}
        />
      </label>
      <label>
        <span>confirm password:</span>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formValues.confirmPassword}
        />
      </label>
      <button className="btn" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
};

export default Signup;

import { useState } from "react";
import styles from "./signup.module.css";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isPending, error } = useSignup();

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formValues.email, formValues.password, formValues.username);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Signup</h2>
      <label>
        <span>username:</span>
        <input
          type="text"
          name="username"
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
          name="confirmPassword"
          onChange={handleChange}
          value={formValues.confirmPassword}
        />
      </label>
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}

      {!isPending && (
        <button className="btn" onClick={handleSubmit}>
          Signup
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;

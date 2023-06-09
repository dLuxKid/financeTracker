// REACT
import { useState } from "react";
// STYLES
import styles from "./login.module.css";
// HOOKS
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { login, isPending, error } = useLogin();

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      login(formValues.email, formValues.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
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

export default Login;

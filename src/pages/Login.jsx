import { useState } from "react";
import styles from "./login.module.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(() => ({
      email: "",
      password: "",
    }));
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
          value={values.email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <button className="btn" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
};

export default Login;

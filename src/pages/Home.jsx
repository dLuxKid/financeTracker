import React from "react";
// STYLES
import styles from "./home.module.css";
// COMPONENTS
import TransactionForm from "../components/TransactionForm";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;

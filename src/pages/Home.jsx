import React from "react";
// STYLES
import styles from "./home.module.css";
// COMPONENTS
import TransactionForm from "../components/TransactionForm";
import { useAuthContext } from "../contexts/authContext";

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;

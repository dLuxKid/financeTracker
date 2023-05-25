import React from "react";
// STYLES
import styles from "./home.module.css";
// COMPONENTS
import TransactionForm from "../components/TransactionForm";
//  HOOKS
import { useAuthContext } from "../contexts/authContext";
import useCollection from "../hooks/useCollection";
import TransactionList from "../components/TransactionList";

const Home = () => {
  const { user } = useAuthContext();
  const { error, documents } = useCollection("transactions");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;

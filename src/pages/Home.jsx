import React from "react";
// STYLES
import styles from "./home.module.css";
// COMPONENTS
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
//  HOOKS
import { useAuthContext } from "../contexts/authContext";
import useCollection from "../hooks/useCollection";

const Home = () => {
  const { user } = useAuthContext();
  const { error, documents } = useCollection("transactions", user.uid);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && (
          <TransactionList transactions={documents} id={user.uid} />
        )}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;

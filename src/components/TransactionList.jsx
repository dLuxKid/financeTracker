// HOOK
import useFirestore from "../hooks/useFirestore";
// STYLES
import styles from "../pages/home.module.css";

const TransactionList = ({ transactions }) => {
  const { deleteData } = useFirestore();

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.transactionName}</p>
          <p className={styles.amount}>${transaction.transactionAmount}</p>
          <button onClick={() => deleteData(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;

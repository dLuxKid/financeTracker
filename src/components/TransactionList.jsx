import styles from "../pages/home.module.css";

const TransactionList = ({ transactions }) => {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.transactionName}</p>
          <p className={styles.amount}>${transaction.transactionAmount}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;

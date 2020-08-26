import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const { transactions } = useContext(TransactionContext);
  const sortedTransactionsArr = transactions.sort(
    (transaction1, transaction2) =>
      transaction1.createdAt > transaction2.createdAt ? -1 : 1
  );

  return (
    <div>
      {sortedTransactionsArr.length > 0 ? (
        <ul className="transaction-item-list">
          {sortedTransactionsArr.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <p>Start adding transactions...</p>
      )}
    </div>
  );
};

export default TransactionList;

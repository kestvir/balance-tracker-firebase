import React, { useContext } from "react";
import firebase from "../../firebase";
import { TransactionContext } from "../../contexts/TransactionContext";
import { AlertContext } from "../../contexts/AlertContext";

const TransactionItem = ({ transaction }) => {
  const { dispatch } = useContext(TransactionContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const deleteTransaction = () => {
    const db = firebase.firestore();

    db.collection("transactions")
      .doc(transaction.id)
      .delete()
      .then(() => {
        alertDispatch({
          type: "SET_SUCCESS",
          successMessage: "Transaction deleted",
        });
      })
      .catch(function (err) {
        console.error("Error removing document: ", err);
        alertDispatch({
          type: "SET_ERROR",
          errorMessage: "Something went wrong...",
        });
      });
  };

  const prepareUpdate = () => {
    dispatch({ type: "SET_EDITING", editing: true });

    dispatch({
      type: "SET_EDIT_TRANSACTION_ITEM",
      transaction,
    });
  };

  const transactionType =
    Math.sign(transaction.amount) === 1 ? "income" : "expense";

  return (
    <li className="row justify-content-center align-items-center">
      <div className="col-12">
        <div className={`transaction-item d-flex p-3 ${transactionType}`}>
          <div className="text-capitalize transaction-title">
            {transaction.title}
          </div>
          <div className="transaction-amount">
            <span>{transaction.amount} &euro;</span>
          </div>
        </div>
      </div>
      <div className="d-flex transaction-item-opions">
        <span
          onClick={deleteTransaction}
          className="transaction-delete-button mr-2"
        >
          X
        </span>
        <span onClick={prepareUpdate} className="transaction-update-button">
          <i className="fas fa-edit"></i>
        </span>
      </div>
    </li>
  );
};

export default TransactionItem;

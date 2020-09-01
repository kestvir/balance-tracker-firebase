import React, { useContext } from "react";
import firebase from "../../firebase";
import { TransactionContext } from "../../contexts/TransactionContext";
import { AlertContext } from "../../contexts/AlertContext";
import {
  setSuccess,
  setError,
  setEditing,
  resetActiveTransaction,
  changeAmount,
  changeTitle,
} from "../../actions/actions";

const TransactionForm = () => {
  const { userID, activeTransaction, editing, dispatch } = useContext(
    TransactionContext
  );
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const createTransaction = () => {
    let fixedFloatTransactionObj = {
      ...activeTransaction,
      userID,
      createdAt: Date.now(),
      amount: parseFloat(activeTransaction.amount.toFixed(2)),
    };

    const db = firebase.firestore();

    db.collection("transactions")
      .add(fixedFloatTransactionObj)
      .then((docRef) => {
        alertDispatch(setSuccess("Transaction added!"));
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((err) => {
        console.error("Error adding document: ", err);
        alertDispatch(setError());
      })
      .finally(() => {
        dispatch(resetActiveTransaction());
      });
  };

  const updateTransaction = () => {
    let fixedFloatTransactionObj = {
      ...activeTransaction,
      userID,
      createdAt: Date.now(),
      amount: parseFloat(activeTransaction.amount.toFixed(2)),
    };

    const db = firebase.firestore();

    const transactionRef = db
      .collection("transactions")
      .doc(fixedFloatTransactionObj.id);
    transactionRef
      .update({
        amount: fixedFloatTransactionObj.amount,
        title: activeTransaction.title,
      })
      .then(() => {
        dispatch(setEditing(false));
        alertDispatch(setSuccess("Transaction updated!"));
      })
      .catch((err) => {
        alertDispatch(setError("Transaction amount cannot be 0"));
        console.error("Error updating document: ", err);
      })
      .finally(() => {
        dispatch(resetActiveTransaction());
      });
  };

  const handleAmountChange = (e) => {
    let changedAmount = parseFloat(e.target.value);

    if (changedAmount) {
      dispatch(changeAmount(changedAmount));
    } else if (changedAmount === 0) {
      dispatch(changeAmount(changedAmount));
    } else {
      dispatch(changeAmount(""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) updateTransaction();
    else createTransaction();
  };

  return (
    <div className="row">
      <div className="col-12">
        <form id="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <span>Transaction name:</span>
            <input
              className="form-control"
              id="title"
              value={activeTransaction.title}
              type="text"
              name="title"
              required
              placeholder="Add title.."
              onChange={(e) => dispatch(changeTitle(e.target.value))}
            />
          </div>

          <div className="form-group">
            <span>
              Transaction amount (if it is expense, add - before amount):
            </span>
            <input
              className="form-control"
              id="amount"
              value={activeTransaction.amount}
              type="number"
              step="0.01"
              name="amount"
              required
              placeholder="Add amount..."
              onChange={handleAmountChange}
            />
          </div>

          <button
            id="submit"
            type="submit"
            name="Add"
            className="btn btn-dark float-right "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;

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

  const getActiveTransactionObj = () => {
    const currDate = Date.now();
    return {
      title: activeTransaction.title,
      userID,
      createdAt: currDate,
      amount: parseFloat(activeTransaction.amount.toFixed(2)),
    };
  };

  const createTransaction = () => {
    const fixedFloatTransactionObj = getActiveTransactionObj();

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
    if (parseFloat(activeTransaction.amount) === 0) {
      return alertDispatch(setError("Transaction amount cannot be 0"));
    }

    const db = firebase.firestore();

    const transactionRef = db
      .collection("transactions")
      .doc(activeTransaction.id);
    transactionRef
      .update({
        amount: parseFloat(activeTransaction.amount.toFixed(2)),
        title: activeTransaction.title,
      })
      .then(() => {
        dispatch(setEditing(false));
        alertDispatch(setSuccess("Transaction updated!"));
      })
      .catch((err) => {
        alertDispatch(setError());
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

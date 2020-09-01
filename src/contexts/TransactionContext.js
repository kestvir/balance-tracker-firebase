import React, { createContext, useReducer, useEffect, useContext } from "react";
import firebase from "../firebase";
import { transactionReducer } from "../reducers/transactionReducer";
import { AlertContext } from "./AlertContext";
import {
  getTransactions,
  calcBalance,
  setError,
  setLoading,
} from "../actions/actions";

export const TransactionContext = createContext();

const initialState = {
  userID: null,
  transactions: [],
  activeTransaction: {
    id: null,
    title: "",
    amount: "",
  },
  editing: false,
  balance: 0,
  income: 0,
  expense: 0,
  loading: false,
};

const TransactionContextProvider = (props) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  useEffect(() => {
    const fetchTransactions = () => {
      dispatch(setLoading(true));

      const db = firebase.firestore();
      const unsubscribe = db
        .collection("transactions")
        .where("userID", "==", state.userID)
        .onSnapshot(
          (querySnapshot) => {
            dispatch(setLoading(false));
            const transactions = [];
            querySnapshot.forEach((doc) => {
              transactions.push({
                ...doc.data(),
                id: doc.id,
              });
            });
            dispatch(getTransactions(transactions));
            dispatch(calcBalance());
          },
          (err) => {
            console.error(err);
            alertDispatch(setError());
          }
        );

      return unsubscribe;
    };

    let unsubscribe;
    if (state.userID) {
      unsubscribe = fetchTransactions();
    }
    return unsubscribe;
  }, [state.userID, alertDispatch]);

  return (
    <TransactionContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;

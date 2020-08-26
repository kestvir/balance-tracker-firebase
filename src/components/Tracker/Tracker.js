import React, { useContext } from "react";
import TransactionInfo from "./TransactionInfo";
import TransactionForm from "./TransactionForm";
import Balance from "./Balance";
import IncomeAndExpense from "./IncomAndExpense";
import User from "../User";
import { Redirect } from "react-router-dom";
import { TransactionContext } from "../../contexts/TransactionContext";

const Tracker = () => {
  const { userID } = useContext(TransactionContext);

  return (
    <>
      {userID ? (
        <>
          <User />
          <div className="tracker-container">
            <Balance />
            <IncomeAndExpense />
            <TransactionInfo />
            <TransactionForm />
          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Tracker;

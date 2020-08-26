import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import TransactionList from "./TransactionList";
import Loader from "react-loader-spinner";

const TransactionInfo = () => {
  const { loading } = useContext(TransactionContext);

  return (
    <div className="row">
      <div className="col-12">
        <h3>History:</h3>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Loader type="Puff" color="#000" height={100} width={100} />
          </div>
        ) : (
          <TransactionList />
        )}
      </div>
    </div>
  );
};

export default TransactionInfo;

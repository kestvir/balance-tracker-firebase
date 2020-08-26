import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

const Balance = () => {
  const { balance } = useContext(TransactionContext);

  return (
    <div className="row justify-content-center text-center mb-3">
      <div className="col-12">
        <div className="balance">
          <h2 className="text-uppercase">Your Balance</h2>
          <h2>{balance} &euro;</h2>
        </div>
      </div>
    </div>
  );
};

export default Balance;

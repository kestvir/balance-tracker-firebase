import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

const IncomeAndExpense = () => {
  const { income, expense } = useContext(TransactionContext);

  return (
    <div className="row mt-4 mb-4 text-center">
      <div className="col-12">
        <div className="income-and-expense">
          <div className="row justify-content-between">
            <div className="col-md-6 border-mid">
              <div className="total-income-wrapper">
                <h3 className="text-uppercase">Income</h3>
                <h3 className="total-income">{income} &euro;</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="total-expense-wrapper">
                <h3 className="text-uppercase">Expense</h3>
                <h3 className="total-expense">{expense} &euro;</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeAndExpense;

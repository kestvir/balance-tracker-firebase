export const setUserID = (userObjID) => {
  return { type: "SET_USER_ID", userID: userObjID };
};

export const getTransactions = (transactionData) => {
  return {
    type: "GET_TRANSACTIONS",
    payload: transactionData,
  };
};

export const resetActiveTransaction = () => {
  return {
    type: "RESET_ACTIVE_TRANSACTION",
  };
};

export const setEditing = (isEditing) => {
  return { type: "SET_EDITING", payload: isEditing };
};

export const setEditTransactionItem = (transanctionItem) => {
  return {
    type: "SET_EDIT_TRANSACTION_ITEM",
    payload: transanctionItem,
  };
};

export const calcBalance = () => {
  return {
    type: "CALC_BALANCE",
  };
};

export const changeAmount = (changedAmount) => {
  return { type: "CHANGE_AMOUNT", payload: changedAmount };
};

export const changeTitle = (newTitle) => {
  return { type: "CHANGE_TITLE", payload: newTitle };
};

export const setSuccess = (message) => {
  return { type: "SET_SUCCESS", payload: message };
};

export const setError = (message = "Something went wrong...") => {
  return {
    type: "SET_ERROR",
    payload: message,
  };
};

export const setLoading = (isLoading) => {
  return { type: "SET_LOADING", payload: isLoading };
};

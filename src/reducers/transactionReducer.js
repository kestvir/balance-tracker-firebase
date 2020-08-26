import { sum } from "./utility";

export const transactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.transactions,
      };
    case "CHANGE_TITLE":
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          title: action.title,
        },
      };
    case "CHANGE_AMOUNT":
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          amount: action.amount,
        },
      };
    case "RESET_ACTIVE_TRANSACTION":
      return {
        ...state,
        activeTransaction: {
          id: null,
          title: "",
          amount: 0,
        },
      };
    case "SET_EDIT_TRANSACTION_ITEM":
      return {
        ...state,
        activeTransaction: { ...action.transaction },
      };

    case "SET_EDITING":
      return {
        ...state,
        editing: action.editing,
      };
    case "CALC_BALANCE":
      return {
        ...state,
        balance: sum(state.transactions, "general"),
        income: sum(state.transactions, "income"),
        expense: sum(state.transactions, "expense"),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userID: action.userID,
      };
    default:
      return state;
  }
};

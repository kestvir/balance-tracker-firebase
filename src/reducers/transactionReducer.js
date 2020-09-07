import { sum } from "./utility";

export const transactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "CHANGE_TITLE":
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          title: action.payload,
        },
      };
    case "CHANGE_AMOUNT":
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          amount: action.payload,
        },
      };
    case "RESET_ACTIVE_TRANSACTION":
      return {
        ...state,
        activeTransaction: {
          id: null,
          title: "",
          amount: "",
        },
      };
    case "SET_EDIT_TRANSACTION_ITEM":
      return {
        ...state,
        activeTransaction: { ...action.payload },
      };

    case "SET_EDITING":
      return {
        ...state,
        editing: action.payload,
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
        loading: action.payload,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userID: action.payload,
      };
    default:
      return state;
  }
};

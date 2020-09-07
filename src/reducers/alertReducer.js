export const alertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
};

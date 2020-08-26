import React, { createContext, useReducer } from "react";
import { alertReducer } from "../reducers/alertReducer";

export const AlertContext = createContext();

const initialState = {
  errorMessage: { message: "" },
  sucessMessage: { message: "" },
};

const AlertContextProvider = (props) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;

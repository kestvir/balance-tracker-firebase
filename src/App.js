import React from "react";
import TransactionContextProvider from "./contexts/TransactionContext";
import AlertContextProvider from "./contexts/AlertContext";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/layout/Alert";
import Tracker from "./components/Tracker/Tracker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

const App = () => {
  return (
    <div className="App container">
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <AlertContextProvider>
          <TransactionContextProvider>
            <BrowserRouter>
              <Alert />
              <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/balance-tracker" component={Tracker} />
              </Switch>
            </BrowserRouter>
          </TransactionContextProvider>
        </AlertContextProvider>
      </AlertProvider>
    </div>
  );
};

export default App;

import React, { useEffect, useContext } from "react";
import firebase from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import { TransactionContext } from "../contexts/TransactionContext";

const SignIn = () => {
  const { userID, dispatch } = useContext(TransactionContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userObj) => {
      if (userObj) {
        dispatch({ type: "SET_USER_ID", userID: userObj.uid });
      } else dispatch({ type: "SET_USER_ID", userID: null });
    });
  }, [dispatch]);

  return (
    <div className="signin-container">
      {userID ? (
        <Redirect to="/balance-tracker" />
      ) : (
        <>
          <h1 className="signin-welcome">Welcome to Balance Tracker!</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </>
      )}
    </div>
  );
};

export default SignIn;

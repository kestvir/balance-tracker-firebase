import React from "react";
import firebase from "../firebase";

const User = () => {
  return (
    <div className="user-container">
      <h5>Hello, {firebase.auth().currentUser.displayName}</h5>
      <img
        className="profile-picture"
        alt="profile avatar"
        src={firebase.auth().currentUser.photoURL}
      />
      <button
        className="btn btn-dark btn-sm sign-out"
        onClick={() => firebase.auth().signOut()}
      >
        Sign out!
      </button>
    </div>
  );
};

export default User;

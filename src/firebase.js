import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "balance-calculator-13f6d.firebaseapp.com",
  databaseURL: "https://balance-calculator-13f6d.firebaseio.com",
  projectId: "balance-calculator-13f6d",
  storageBucket: "balance-calculator-13f6d.appspot.com",
  messagingSenderId: "50083221167",
  appId: "1:50083221167:web:a549f3230ea441760ece5a",
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;

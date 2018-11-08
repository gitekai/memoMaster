import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCTVq5p69TcLQllT3hqr8KYhEDxJTnpgM4",
  authDomain: "memomaster-f4051.firebaseapp.com",
  databaseURL: "https://memomaster-f4051.firebaseio.com",
  projectId: "memomaster-f4051",
  storageBucket: "memomaster-f4051.appspot.com",
  messagingSenderId: "744189030326"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };

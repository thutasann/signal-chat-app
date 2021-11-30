import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5tlIQDJ-K6ct6YucUwqAInzpo14--YiA",
  authDomain: "signal-clone-b6a27.firebaseapp.com",
  projectId: "signal-clone-b6a27",
  storageBucket: "signal-clone-b6a27.appspot.com",
  messagingSenderId: "879930230130",
  appId: "1:879930230130:web:0db58eff30937937fc89eb"
};

let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };


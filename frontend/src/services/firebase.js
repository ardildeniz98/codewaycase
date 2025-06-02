import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD__MbdIxQS4P5cHPvlxIAsyC8echVvjlI",
  authDomain: "codewaycase-a3705.firebaseapp.com",
  projectId: "codewaycase-a3705",
  storageBucket: "codewaycase-a3705.appspot.com",
  messagingSenderId: "120935251032",
  appId: "1:120935251032:web:a6c93766aed21ffc8cde2d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };

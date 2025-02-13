import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCft7Kgu2psUtx2dQcLE0acWnuRujL7jkk",
  authDomain: "map-ast-bd5e8.firebaseapp.com",
  projectId: "map-ast-bd5e8",
  storageBucket: "map-ast-bd5e8.firebasestorage.app",
  messagingSenderId: "997636774085",
  appId: "1:997636774085:web:733f69a912f41df24d78ac",
  measurementId: "G-F6561W85FB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

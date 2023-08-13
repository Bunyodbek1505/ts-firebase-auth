import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBx9EPJQ7mfCm5PySs08K9-AQXkvJqP0gg",
  authDomain: "ts-auth-197af.firebaseapp.com",
  projectId: "ts-auth-197af",
  storageBucket: "ts-auth-197af.appspot.com",
  messagingSenderId: "113456135136",
  appId: "1:113456135136:web:2d95886e3ec2a1b089c985"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export{ db, auth};
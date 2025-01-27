import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_sOdQuROrj8QZ1f2E-5NAQqoZZI6Refc",
  authDomain: "quizmaster-cccd9.firebaseapp.com",
  projectId: "quizmaster-cccd9",
  storageBucket: "quizmaster-cccd9.firebasestorage.app",
  messagingSenderId: "867662056287",
  appId: "1:867662056287:web:883b6408fcfe2e740a44ea",
  measurementId: "G-H1P8W6WK91"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
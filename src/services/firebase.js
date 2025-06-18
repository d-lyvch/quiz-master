import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfLQ8XKvGU7DMUhlM2ZVy8Sf3RO_QA4Z0",
  authDomain: "quiztest-b49af.firebaseapp.com",
  projectId: "quiztest-b49af",
  storageBucket: "quiztest-b49af.firebasestorage.app",
  messagingSenderId: "1038873946473",
  appId: "1:1038873946473:web:5736657bce787ebadff5f8",
  measurementId: "G-CYKTJGXM4L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

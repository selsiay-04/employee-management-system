import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDneoBjgESKdlPlVwybxJ7j0kn6dthDSKg",
  authDomain: "dashboard-project-04-ccf05.firebaseapp.com",
  projectId: "dashboard-project-04-ccf05",
  storageBucket: "dashboard-project-04-ccf05.firebasestorage.app",
  messagingSenderId: "1002022106718",
  appId: "1:1002022106718:web:be83da75e1f08da1c5a6cf",
  measurementId: "G-QWDWEPGM31"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, firebaseConfig };

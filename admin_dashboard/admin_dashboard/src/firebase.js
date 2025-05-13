// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- Make sure this is here

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdRLO2Rq9hrv1rqY90O_AqhdbWjAdl7Cw",
  authDomain: "billingsys-3facc.firebaseapp.com",
  projectId: "billingsys-3facc",
  storageBucket: "billingsys-3facc.firebasestorage.app",
  messagingSenderId: "810998973348",
  appId: "1:810998973348:web:c1913295f0579936f47731",
  measurementId: "G-3B7N0V80KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

// config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjebO_3Rqq3mKd3UlDaBDQ84GG81bGdl0",
  authDomain: "ridemate-412eb.firebaseapp.com",
  projectId: "ridemate-412eb",
  storageBucket: "ridemate-412eb.appspot.com",
  messagingSenderId: "966028347905",
  appId: "1:966028347905:web:3d4a6415acd899543d4e00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore for use in other files

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXY8ym6yDVu4U2A4c2fN7yNA0El6Esmrs",
  authDomain: "bughunter-76c0e.firebaseapp.com",
  projectId: "bughunter-76c0e",
  storageBucket: "bughunter-76c0e.appspot.com",
  messagingSenderId: "180675127246",
  appId: "1:180675127246:web:c2c731e55a575241356d9f",
  measurementId: "G-GSEEH9XP53",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

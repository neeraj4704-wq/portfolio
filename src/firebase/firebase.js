import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaQVciZgGGdDWHwBIA0iwedmbaIFTR580",
  authDomain: "neeraj-portfolio-70e1d.firebaseapp.com",
  projectId: "neeraj-portfolio-70e1d",
  storageBucket: "neeraj-portfolio-70e1d.firebasestorage.app",
  messagingSenderId: "822539866897",
  appId: "1:822539866897:web:7cb717fead4aaa323e32b0",
  measurementId: "G-H8NP45R1XG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
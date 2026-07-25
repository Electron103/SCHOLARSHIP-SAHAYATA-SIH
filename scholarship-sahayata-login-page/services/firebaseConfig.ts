import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4wP2Nzt_TSWtby18WFGllgZjrAg226bE",
  authDomain: "scholarshipsahayataloginpage.firebaseapp.com",
  projectId: "scholarshipsahayataloginpage",
  storageBucket: "scholarshipsahayataloginpage.firebasestorage.app",
  messagingSenderId: "993588671050",
  appId: "1:993588671050:web:76a71bf5897a9a2fc82cb3",
  measurementId: "G-DNYYH21RXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
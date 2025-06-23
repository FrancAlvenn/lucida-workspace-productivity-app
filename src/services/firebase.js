// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk8J1IYZH6Zhe8Oo6L77nrvZIpLD5kGx4",
  authDomain: "lucida-workspace.firebaseapp.com",
  projectId: "lucida-workspace",
  storageBucket: "lucida-workspace.firebasestorage.app",
  messagingSenderId: "128957414316",
  appId: "1:128957414316:web:83fa5ddd473269f2121809",
  measurementId: "G-8SJP0ZZ9D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export  { app, analytics, db, auth, storage };
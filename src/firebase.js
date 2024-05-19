// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGzYNczazeTmg6K1XyATmBgjgQJi0orow",
  authDomain: "cancoestfm-168c1.firebaseapp.com",
  projectId: "cancoestfm-168c1",
  storageBucket: "cancoestfm-168c1.appspot.com",
  messagingSenderId: "221603640072",
  appId: "1:221603640072:web:55e76b73d7b3e61cabf2bd",
  measurementId: "G-5MKCFNBYP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAqjnQ3r_EsgVaFqxByEt8Fsy568LDbdcc",
  authDomain: "campus-connect-9ecec.firebaseapp.com",
  projectId: "campus-connect-9ecec",
  storageBucket: "campus-connect-9ecec.appspot.com",
  messagingSenderId: "637600543895",
  appId: "1:637600543895:web:05b29ff2779a243c7765d2",
};

const app = initializeApp(firebaseConfig);
console.log("firebase app", app);
export const auth = getAuth();
export const messaging = getMessaging(app);

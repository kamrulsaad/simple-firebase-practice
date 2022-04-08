// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwroRvmm9IQVwjXETCdzpja65THn-YCic",
  authDomain: "simple-firebase-auth-df8e3.firebaseapp.com",
  projectId: "simple-firebase-auth-df8e3",
  storageBucket: "simple-firebase-auth-df8e3.appspot.com",
  messagingSenderId: "242410133008",
  appId: "1:242410133008:web:51d1eb087b447b26111c95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
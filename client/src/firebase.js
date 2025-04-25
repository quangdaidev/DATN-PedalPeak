// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7FJptywx8MU4zRaTLWJg4unBOB85b1K0",
  authDomain: "pealpeak-2219e.firebaseapp.com",
  projectId: "pealpeak-2219e",
  storageBucket: "pealpeak-2219e.firebasestorage.app",
  messagingSenderId: "351169261446",
  appId: "1:351169261446:web:a13ebd5af5a15adde94607"
  // apiKey: "AIzaSyDlRPLOruDmwV6dP_wyPEwC1LzcGn9ibKk",
  // authDomain: "pedalpeak-8c823.firebaseapp.com",
  // projectId: "pedalpeak-8c823",
  // storageBucket: "pedalpeak-8c823.firebasestorage.app",
  // messagingSenderId: "304030110863",
  // appId: "1:304030110863:web:9dcdaa644061da41128cfa"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM8f-gB3Ekx6g0TznUz3MLIoH3896MkBo",
  authDomain: "myjobs-200e6.firebaseapp.com",
  projectId: "myjobs-200e6",
  storageBucket: "myjobs-200e6.appspot.com",
  messagingSenderId: "930830707086",
  appId: "1:930830707086:web:5d91785986e6a0b1891cdf",
  measurementId: "G-QC9ZG5W1M0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

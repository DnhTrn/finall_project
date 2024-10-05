// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "finall-server.firebaseapp.com",
  projectId: "finall-server",
  storageBucket: "finall-server.appspot.com",
  messagingSenderId: "100588323064",
  appId: "1:100588323064:web:32826aee7ad91bd03d3b0d",
  measurementId: "G-GY90GBB77W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
const analytics = getAnalytics(app);

export {auth, analytics };

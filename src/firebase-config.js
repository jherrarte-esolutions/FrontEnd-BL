import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAD7M3NGQ5IaoryXwUpZUfcWCRR91mzfk",
  authDomain: "firestore-blautech.firebaseapp.com",
  projectId: "firestore-blautech",
  storageBucket: "firestore-blautech.appspot.com",
  messagingSenderId: "70654236985",
  appId: "1:70654236985:web:2f7a4d820bf20e783c30e8",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

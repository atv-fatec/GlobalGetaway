import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5PIK3TzZxw7SKQh9wJ-L0cCI-4eC-XaE",
  authDomain: "globalgetaway-d544b.firebaseapp.com",
  databaseURL: "https://globalgetaway-d544b-default-rtdb.firebaseio.com",
  projectId: "globalgetaway-d544b",
  storageBucket: "globalgetaway-d544b.appspot.com",
  messagingSenderId: "852572506695",
  appId: "1:852572506695:web:f2d6ce3c83225e3d74bf62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authFirebase = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
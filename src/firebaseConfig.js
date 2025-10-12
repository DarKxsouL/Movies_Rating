// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reactmovies-8d4a9.firebaseapp.com",
  projectId: "reactmovies-8d4a9",
  storageBucket: "reactmovies-8d4a9.firebasestorage.app",
  messagingSenderId: "32988234677",
  appId: "1:32988234677:web:547fe2b0644a70e8684ffc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


export {auth, db, googleProvider, githubProvider};
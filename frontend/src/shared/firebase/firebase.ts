import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCr2teqJT0Bnm8mfusaZPP_gjXhMV5WQFI",
  authDomain: "todo-list-73003.firebaseapp.com",
  projectId: "todo-list-73003",
  storageBucket: "todo-list-73003.firebasestorage.app",
  messagingSenderId: "670697010049",
  appId: "1:670697010049:web:e3ca7cf47a3b2ffdd5ee80",
  measurementId: "G-HPNT30DVNK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjsr4LTeWcc0CwLo2pWRVGpcqY2dR2Uks",
  authDomain: "x-ppdb.firebaseapp.com",
  projectId: "x-ppdb",
  storageBucket: "x-ppdb.firebasestorage.app",
  messagingSenderId: "1024737155564",
  appId: "1:1024737155564:web:6a2ab3d6d6f52c3de708c9",
  measurementId: "G-2811PD4BD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;

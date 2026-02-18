import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfNTzAwzdtqYGqloORFeev7BrubtN6HA0",
  authDomain: "daftarukm-beb09.firebaseapp.com",
  projectId: "daftarukm-beb09",
  storageBucket: "daftarukm-beb09.firebasestorage.app",
  messagingSenderId: "66488865661",
  appId: "1:66488865661:web:5c78c59d1463583ffe7214",
  measurementId: "G-J59THRXGYW"
};

// Inisialisasi Firebase (Mencegah error saat Hot Reload di Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Inisialisasi Firestore Database
const db = getFirestore(app);

export { db };
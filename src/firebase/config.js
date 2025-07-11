import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA2W6gWUI3C-HQmVBPByfhcqnewxL6j6Ig",
  authDomain: "melos-db-9680b.firebaseapp.com",
  projectId: "melos-db-9680b",
  storageBucket: "melos-db-9680b.firebasestorage.app",
  messagingSenderId: "378841216139",
  appId: "1:378841216139:web:1eba8a15af3d2e5029908e",
  measurementId: "G-1E557WXEFM"
};

export const app = initializeApp(firebaseConfig);
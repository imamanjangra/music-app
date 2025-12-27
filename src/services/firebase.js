import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX",
};

// Only initialize Firebase if we have real config values
let app;
let auth;
let githubProvider;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  githubProvider = new GithubAuthProvider();
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn("Firebase initialization failed:", error);
  // Create mock auth for development
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
  };
  githubProvider = {};
  googleProvider = {};
}

let analytics;
if (typeof window !== "undefined" && firebaseConfig.measurementId && app) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Firebase Analytics initialization failed:", error);
  }
}

export { auth, githubProvider, googleProvider };

'use client';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

let firebaseApp;
let firebaseDb;
let firebaseAuth;
let firebaseStorage;
let firebaseRealtimeDb;
let firebaseAnalytics;
let firebaseGoogleProvider;

if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: "AIzaSyDki9Rj37WA3Y7YiNXFvS_Xphez3xTS1AI",
    authDomain: "cocokart-2bcc8.firebaseapp.com",
    projectId: "cocokart-2bcc8",
    storageBucket: "cocokart-2bcc8.firebasestorage.app",
    messagingSenderId: "340972510516",
    appId: "1:340972510516:web:bb039d0c5d52d1fe19d961",
    measurementId: "G-TLBBBG8YDR"
  };

  try {
    // Initialize Firebase only on client side
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAnalytics = getAnalytics(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getFirestore(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
    firebaseRealtimeDb = getDatabase(firebaseApp);
    firebaseGoogleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
  }
}

// Initialize reCAPTCHA verifier
const initRecaptcha = (buttonId) => {
  if (typeof window !== 'undefined' && firebaseAuth) {
    return new RecaptchaVerifier(firebaseAuth, buttonId, {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  }
  return null;
}

export { 
  firebaseDb as db,
  firebaseAuth as auth,
  firebaseStorage as storage,
  firebaseRealtimeDb as realtimeDb,
  firebaseAnalytics as analytics,
  firebaseGoogleProvider as googleProvider,
  initRecaptcha
};
// =========================================================
// AKU BISA - FIREBASE INITIALIZATION
// =========================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firebase Firestore
const db = getFirestore(app);

export {
    app,
    auth,
    db
};

console.log("AKU BISA: Firebase berhasil diinisialisasi.");

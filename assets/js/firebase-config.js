// =====================================================
// AKU BISA - Firebase Configuration
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// -----------------------------------------------------
// Firebase Configuration
// -----------------------------------------------------

const firebaseConfig = {
    apiKey: "AIzaSyCEB8IbCtIu36LmUILqM4oHuwP-3FPz-xk",
    authDomain: "aku-bisa-bfc8c.firebaseapp.com",
    projectId: "aku-bisa-bfc8c",
    storageBucket: "aku-bisa-bfc8c.firebasestorage.app",
    messagingSenderId: "897998654509",
    appId: "1:897998654509:web:0128e3a56a9b44084dfca4"
};

// -----------------------------------------------------
// Initialize Firebase
// -----------------------------------------------------

const app = initializeApp(firebaseConfig);

// -----------------------------------------------------
// Export
// -----------------------------------------------------

export { app };

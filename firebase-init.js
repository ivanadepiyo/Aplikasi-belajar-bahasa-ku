// =====================================================
// AKU BISA - Firebase Initialization
// =====================================================
// File ini bertugas menginisialisasi Firebase.
// Konfigurasi Firebase diambil dari firebase-config.js.
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    firebaseConfig
} from "./firebase-config.js";

// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);

// =====================================================
// DEBUG
// =====================================================

console.log(
    "AKU BISA: Firebase berhasil diinisialisasi."
);

console.log(
    "AKU BISA: Project ID:",
    firebaseConfig.projectId
);

// =====================================================
// EXPORT FIREBASE APP
// =====================================================

export {
    app
};

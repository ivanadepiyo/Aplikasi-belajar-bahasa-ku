// =====================================================
// AKU BISA - Firestore Service
// Firebase Firestore Database
// =====================================================
// File ini bertugas menangani data pengguna di Firestore.
//
// Struktur:
// users/{Firebase Auth UID}
//
// Password TIDAK disimpan di Firestore.
// Password sepenuhnya dikelola oleh Firebase Authentication.
// =====================================================

console.log(
    "AKU BISA: firestore-service.js BERHASIL DIMUAT"
);


// =====================================================
// FIREBASE FIRESTORE IMPORT
// =====================================================

import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// =====================================================
// FIREBASE APP
// =====================================================

import {
    app
} from "./firebase-init.js";


// =====================================================
// FIRESTORE INSTANCE
// =====================================================

const db = getFirestore(app);


// =====================================================
// MEMBUAT PROFILE USER
// =====================================================
// Data disimpan menggunakan UID Firebase Authentication.
//
// Lokasi:
// users/{uid}
// =====================================================

async function createUserProfile(
    uid,
    userData = {}
) {

    if (!uid) {

        throw new Error(
            "FIRESTORE_UID_REQUIRED"
        );
    }


    // -------------------------------------------------
    // REFERENSI DOKUMEN USER
    // -------------------------------------------------

    const userRef = doc(
        db,
        "users",
        uid
    );


    // -------------------------------------------------
    // DATA USER
    // -------------------------------------------------
    // Password sengaja TIDAK dimasukkan.
    // -------------------------------------------------

    const profileData = {

        nama:
            userData.nama || "",

        email:
            userData.email || "",

        username:
            userData.username || "",

        nomorTelepon:
            userData.nomorTelepon || "",

        tanggalLahir:
            userData.tanggalLahir || "",

        jenisKelamin:
            userData.jenisKelamin || "",

        bahasaDipilih:
            userData.bahasaDipilih || "",

        emailVerified:
            userData.emailVerified === true,

        role:
            "user",

        membership:
            "Free",

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp()
    };


    // -------------------------------------------------
    // SIMPAN KE FIRESTORE
    // -------------------------------------------------

    await setDoc(
        userRef,
        profileData
    );


    console.log(
        "AKU BISA: Data pengguna berhasil disimpan ke Firestore.",
        uid
    );


    return profileData;
}


// =====================================================
// UPDATE PROFILE USER
// =====================================================
// Digunakan misalnya setelah email berhasil diverifikasi.
// =====================================================

async function updateUserProfile(
    uid,
    userData = {}
) {

    if (!uid) {

        throw new Error(
            "FIRESTORE_UID_REQUIRED"
        );
    }


    const userRef = doc(
        db,
        "users",
        uid
    );


    const updateData = {
        ...userData,
        updatedAt: serverTimestamp()
    };


    await updateDoc(
        userRef,
        updateData
    );


    console.log(
        "AKU BISA: Data pengguna berhasil diperbarui.",
        uid
    );
}


// =====================================================
// MENGAMBIL DATA PROFILE USER
// =====================================================

async function getUserProfile(
    uid
) {

    if (!uid) {

        throw new Error(
            "FIRESTORE_UID_REQUIRED"
        );
    }


    const userRef = doc(
        db,
        "users",
        uid
    );


    const snapshot = await getDoc(
        userRef
    );


    if (!snapshot.exists()) {

        return null;
    }


    return {
        id: snapshot.id,
        ...snapshot.data()
    };
}


// =====================================================
// CEK PROFILE USER
// =====================================================

async function userProfileExists(
    uid
) {

    if (!uid) {

        return false;
    }


    const userRef = doc(
        db,
        "users",
        uid
    );


    const snapshot = await getDoc(
        userRef
    );


    return snapshot.exists();
}


// =====================================================
// EXPORT
// =====================================================

export {

    // Firestore
    db,

    // Create
    createUserProfile,

    // Update
    updateUserProfile,

    // Read
    getUserProfile,

    // Check
    userProfileExists
};

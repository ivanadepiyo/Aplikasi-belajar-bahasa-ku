// =====================================================
// AKU BISA - Firestore Service
// =====================================================
// File ini menangani penyimpanan data pengguna
// ke Cloud Firestore.
//
// Struktur:
// users/{Firebase Auth UID}
// =====================================================

console.log(
    "AKU BISA: firestore-service.js BERHASIL DIMUAT"
);


// =====================================================
// FIRESTORE IMPORT
// =====================================================

import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
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
// BUAT PROFILE USER
// =====================================================

async function createUserProfile(
    uid,
    userData
) {

    if (!uid) {

        throw new Error(
            "FIRESTORE_NO_UID"
        );
    }


    const userRef =
        doc(
            db,
            "users",
            uid
        );


    const profileData = {

        // ---------------------------------------------
        // DATA PENGGUNA
        // ---------------------------------------------

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


        // ---------------------------------------------
        // STATUS EMAIL
        // ---------------------------------------------

        emailVerified:
            userData.emailVerified === true,


        // ---------------------------------------------
        // ROLE & MEMBERSHIP
        // ---------------------------------------------

        role:
            "user",

        membership:
            "Free",


        // ---------------------------------------------
        // WAKTU
        // ---------------------------------------------

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp()
    };


    // -----------------------------------------------
    // SIMPAN KE FIRESTORE
    // -----------------------------------------------

    await setDoc(
        userRef,
        profileData
    );


    console.log(
        "AKU BISA: Profile berhasil disimpan ke Firestore.",
        uid
    );


    return profileData;
}


// =====================================================
// UPDATE PROFILE USER
// =====================================================

async function updateUserProfile(
    uid,
    userData
) {

    if (!uid) {

        throw new Error(
            "FIRESTORE_NO_UID"
        );
    }


    const userRef =
        doc(
            db,
            "users",
            uid
        );


    const updateData = {

        ...userData,

        updatedAt:
            serverTimestamp()
    };


    await updateDoc(
        userRef,
        updateData
    );


    console.log(
        "AKU BISA: Profile berhasil diperbarui.",
        uid
    );
}


// =====================================================
// EXPORT
// =====================================================

export {

    db,

    createUserProfile,

    updateUserProfile

};

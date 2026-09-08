// =====================================================
// AKU BISA - Authentication Service
// Firebase Authentication
// =====================================================

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
    updateProfile,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { app } from "./firebase-config.js";


// =====================================================
// FIREBASE AUTH
// =====================================================

const auth = getAuth(app);


// =====================================================
// LOGIN DENGAN EMAIL & PASSWORD
// =====================================================

async function loginWithEmail(
    email,
    password,
    rememberMe = false
) {

    const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;

    await setPersistence(
        auth,
        persistence
    );

    const credential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return credential.user;
}


// =====================================================
// REGISTER AKUN
// =====================================================

async function registerWithEmail(
    email,
    password,
    displayName = ""
) {

    const credential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    const user = credential.user;


    // -------------------------------------------------
    // Simpan nama pengguna
    // -------------------------------------------------

    if (displayName.trim() !== "") {

        await updateProfile(
            user,
            {
                displayName: displayName.trim()
            }
        );
    }


    // -------------------------------------------------
    // Kirim email verifikasi
    // -------------------------------------------------

    await sendEmailVerification(user);

    return user;
}


// =====================================================
// RESET PASSWORD
// =====================================================

async function sendResetPassword(email) {

    return await sendPasswordResetEmail(
        auth,
        email
    );
}


// =====================================================
// KIRIM ULANG EMAIL VERIFIKASI
// =====================================================

async function sendVerificationEmail(
    user = auth.currentUser
) {

    if (!user) {

        throw new Error(
            "AUTH_NO_USER"
        );
    }

    return await sendEmailVerification(user);
}


// =====================================================
// LOGOUT
// =====================================================

async function logout() {

    return await signOut(auth);
}


// =====================================================
// MENDAPATKAN USER YANG SEDANG LOGIN
// =====================================================

function getCurrentUser() {

    return auth.currentUser;
}


// =====================================================
// MEMANTAU STATUS LOGIN
// =====================================================

function observeAuthState(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );
}


// =====================================================
// CEK EMAIL SUDAH DIVERIFIKASI
// =====================================================

function isEmailVerified(
    user = auth.currentUser
) {

    if (!user) {
        return false;
    }

    return user.emailVerified === true;
}


// =====================================================
// PESAN ERROR FIREBASE AUTH
// =====================================================

function getAuthErrorMessage(error) {

    const code =
        error?.code || "";


    const messages = {

        // -------------------------------------------------
        // LOGIN
        // -------------------------------------------------

        "auth/invalid-email":
            "Format email tidak valid.",

        "auth/invalid-credential":
            "Email atau password salah.",

        "auth/user-not-found":
            "Akun dengan email tersebut tidak ditemukan.",

        "auth/wrong-password":
            "Password salah.",

        "auth/user-disabled":
            "Akun ini telah dinonaktifkan.",


        // -------------------------------------------------
        // REGISTER
        // -------------------------------------------------

        "auth/email-already-in-use":
            "Email tersebut sudah terdaftar.",

        "auth/weak-password":
            "Password terlalu lemah. Gunakan password yang lebih kuat.",

        "auth/missing-password":
            "Password wajib diisi.",


        // -------------------------------------------------
        // REQUEST
        // -------------------------------------------------

        "auth/too-many-requests":
            "Terlalu banyak percobaan. Silakan coba lagi beberapa saat.",

        "auth/network-request-failed":
            "Koneksi internet bermasalah. Periksa koneksi Anda.",


        // -------------------------------------------------
        // FIREBASE CONFIGURATION
        // -------------------------------------------------

        "auth/operation-not-allowed":
            "Metode autentikasi ini belum diaktifkan di Firebase.",

        "auth/configuration-not-found":
            "Konfigurasi Firebase Authentication belum tersedia.",


        // -------------------------------------------------
        // SESSION
        // -------------------------------------------------

        "auth/user-token-expired":
            "Sesi login telah berakhir. Silakan login kembali.",

        "auth/requires-recent-login":
            "Silakan login kembali untuk melakukan tindakan ini."
    };


    return (
        messages[code] ||
        "Terjadi kesalahan autentikasi. Silakan coba lagi."
    );
}


// =====================================================
// EXPORT
// =====================================================

export {

    // Firebase Auth
    auth,

    // Login
    loginWithEmail,

    // Register
    registerWithEmail,

    // Reset password
    sendResetPassword,

    // Email verification
    sendVerificationEmail,

    // Logout
    logout,

    // Current user
    getCurrentUser,

    // Auth state
    observeAuthState,

    // Verification
    isEmailVerified,

    // Error handler
    getAuthErrorMessage
};

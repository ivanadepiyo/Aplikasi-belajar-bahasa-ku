// =====================================================
// AKU BISA - Authentication Service
// Firebase Authentication
// =====================================================

console.log(
    "AKU BISA: auth-service.js BERHASIL DIMUAT"
);


// =====================================================
// FIREBASE AUTH IMPORT
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
    reload,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// =====================================================
// FIREBASE APP
// =====================================================

import {
    app
} from "./firebase-init.js";


// =====================================================
// FIREBASE AUTH INSTANCE
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
    // SIMPAN NAMA KE FIREBASE AUTH PROFILE
    // -------------------------------------------------

    if (
        typeof displayName === "string" &&
        displayName.trim() !== ""
    ) {

        await updateProfile(
            user,
            {
                displayName: displayName.trim()
            }
        );
    }


    // -------------------------------------------------
    // KIRIM EMAIL VERIFIKASI FIREBASE
    // -------------------------------------------------

    await sendEmailVerification(user);

    console.log(
        "AKU BISA: email verifikasi Firebase berhasil dikirim."
    );


    return user;
}


// =====================================================
// KIRIM EMAIL VERIFIKASI
// =====================================================

async function sendVerificationEmail(
    user = auth.currentUser
) {

    if (!user) {

        throw new Error(
            "AUTH_NO_USER"
        );
    }

    await sendEmailVerification(user);

    console.log(
        "AKU BISA: email verifikasi dikirim ulang."
    );
}


// =====================================================
// CEK EMAIL SUDAH DIVERIFIKASI
// =====================================================

async function checkEmailVerified(
    user = auth.currentUser
) {

    if (!user) {
        return false;
    }

    await reload(user);

    return user.emailVerified === true;
}


// =====================================================
// CEK STATUS EMAIL
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
// RESET PASSWORD
// =====================================================

async function sendResetPassword(email) {

    return await sendPasswordResetEmail(
        auth,
        email
    );
}


// =====================================================
// LOGOUT
// =====================================================

async function logout() {

    return await signOut(auth);
}


// =====================================================
// USER YANG SEDANG LOGIN
// =====================================================

function getCurrentUser() {

    return auth.currentUser;
}


// =====================================================
// MONITOR AUTH STATE
// =====================================================

function observeAuthState(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );
}


// =====================================================
// PESAN ERROR FIREBASE AUTH
// =====================================================

function getAuthErrorMessage(error) {

    const code =
        error?.code || "";

    const messages = {

        // LOGIN
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


        // REGISTER
        "auth/email-already-in-use":
            "Email tersebut sudah terdaftar.",

        "auth/weak-password":
            "Password terlalu lemah. Gunakan password yang lebih kuat.",

        "auth/missing-password":
            "Password wajib diisi.",


        // REQUEST
        "auth/too-many-requests":
            "Terlalu banyak percobaan. Silakan coba lagi beberapa saat.",

        "auth/network-request-failed":
            "Koneksi internet bermasalah. Periksa koneksi Anda.",


        // CONFIG
        "auth/operation-not-allowed":
            "Metode autentikasi ini belum diaktifkan di Firebase.",

        "auth/configuration-not-found":
            "Konfigurasi Firebase Authentication belum tersedia.",


        // SESSION
        "auth/user-token-expired":
            "Sesi login telah berakhir. Silakan login kembali.",

        "auth/requires-recent-login":
            "Silakan login kembali untuk melakukan tindakan ini.",

        // USER
        "AUTH_NO_USER":
            "Pengguna Firebase tidak ditemukan."
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

    // Verification
    sendVerificationEmail,
    checkEmailVerified,
    isEmailVerified,

    // Password
    sendResetPassword,

    // Session
    logout,
    getCurrentUser,
    observeAuthState,

    // Error
    getAuthErrorMessage
};

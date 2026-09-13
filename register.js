// =====================================================
// AKU BISA - Register Service
// =====================================================

console.log(
    "AKU BISA: register.js BERHASIL DIMUAT"
);


// =====================================================
// FIREBASE AUTH SERVICE
// =====================================================

import {
    registerWithEmail,
    sendVerificationEmail,
    checkEmailVerified,
    getAuthErrorMessage
} from "./auth-service.js";


// =====================================================
// ELEMENT
// =====================================================

const form = document.getElementById("form");
const toast = document.getElementById("toast");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthInput = document.getElementById("birth");
const genderInput = document.getElementById("gender");
const learningInput = document.getElementById("learning");

const usernameInput = document.getElementById("user");
const passwordInput = document.getElementById("pass");
const confirmInput = document.getElementById("confirm");
const agreeInput = document.getElementById("agree");

const strengthText = document.getElementById("strengthText");

const verificationPanel =
    document.getElementById("verificationPanel");

const verificationName =
    document.getElementById("verificationName");

const verificationEmail =
    document.getElementById("verificationEmail");

const verificationUsername =
    document.getElementById("verificationUsername");

const verificationPhone =
    document.getElementById("verificationPhone");

const verificationBirth =
    document.getElementById("verificationBirth");

const verificationGender =
    document.getElementById("verificationGender");

const verificationLearning =
    document.getElementById("verificationLearning");

const verificationCode =
    document.getElementById("verificationCode");

const verificationCodeMessage =
    document.getElementById("verificationCodeMessage");

const checkVerification =
    document.getElementById("checkVerification");

const resendVerification =
    document.getElementById("resendVerification");

const verificationStatus =
    document.getElementById("verificationStatus");

const completionPanel =
    document.getElementById("completionPanel");

const goToLogin =
    document.getElementById("goToLogin");


// =====================================================
// STATE
// =====================================================

let registeredUser = null;
let verificationCooldown = false;


// =====================================================
// TOAST
// =====================================================

function showToast(message, type = "info") {

    if (!toast) {
        console.log(message);
        return;
    }

    toast.textContent = message;

    toast.className = "toast";

    if (type === "success") {
        toast.classList.add("success");
    }

    if (type === "error") {
        toast.classList.add("error");
    }

    if (type === "warning") {
        toast.classList.add("warning");
    }

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);
}


// =====================================================
// PASSWORD STRENGTH
// =====================================================

function updatePasswordStrength() {

    if (!passwordInput || !strengthText) {
        return;
    }

    const password =
        passwordInput.value;

    if (!password) {

        strengthText.textContent =
            "Kekuatan password akan tampil di sini.";

        return;
    }

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    if (score <= 2) {

        strengthText.textContent =
            "Password lemah.";

    } else if (score <= 4) {

        strengthText.textContent =
            "Password cukup kuat.";

    } else {

        strengthText.textContent =
            "Password sangat kuat.";
    }
}


// =====================================================
// TOGGLE PASSWORD
// =====================================================

document.querySelectorAll(".eye").forEach(button => {

    button.addEventListener("click", () => {

        const targetId =
            button.dataset.id;

        const target =
            document.getElementById(targetId);

        if (!target) {
            return;
        }

        if (target.type === "password") {

            target.type = "text";

            button.setAttribute(
                "aria-label",
                "Sembunyikan password"
            );

        } else {

            target.type = "password";

            button.setAttribute(
                "aria-label",
                "Tampilkan password"
            );
        }
    });

});


// =====================================================
// PASSWORD EVENT
// =====================================================

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        updatePasswordStrength
    );
}

// =====================================================
// BAHASA ANTARMUKA
// =====================================================

const interfaceLanguageButton =
    document.getElementById("lang");

if (interfaceLanguageButton) {

    interfaceLanguageButton.addEventListener(
        "click",
        () => {

            showToast(
                "Bahasa antarmuka: Indonesia 🇮🇩",
                "info"
            );

        }
    );
}

// =====================================================
// PILIH BAHASA
// =====================================================

const languageButtons = document.querySelectorAll("#langs button");

languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        languageButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        if (learningInput) {
            learningInput.value =
                button.dataset.v || "";
        }
    });

});

// =====================================================
// VALIDASI EMAIL
// =====================================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}


// =====================================================
// VALIDASI FORM REGISTER
// =====================================================

function validateRegisterForm() {

    if (!nameInput?.value.trim()) {

        showToast(
            "Nama lengkap wajib diisi.",
            "error"
        );

        nameInput?.focus();

        return false;
    }

    if (!emailInput?.value.trim()) {

        showToast(
            "Email wajib diisi.",
            "error"
        );

        emailInput?.focus();

        return false;
    }

    if (
        !isValidEmail(
            emailInput.value.trim()
        )
    ) {

        showToast(
            "Format email tidak valid.",
            "error"
        );

        emailInput.focus();

        return false;
    }

    if (!phoneInput?.value.trim()) {

        showToast(
            "Nomor telepon wajib diisi.",
            "error"
        );

        phoneInput?.focus();

        return false;
    }

    if (!birthInput?.value) {

        showToast(
            "Tanggal lahir wajib diisi.",
            "error"
        );

        birthInput?.focus();

        return false;
    }

    if (!genderInput?.value) {

        showToast(
            "Jenis kelamin wajib dipilih.",
            "error"
        );

        genderInput?.focus();

        return false;
    }

    if (!learningInput?.value) {

        showToast(
            "Bahasa yang ingin dipelajari wajib dipilih.",
            "error"
        );

        learningInput?.focus();

        return false;
    }

    if (!usernameInput?.value.trim()) {

        showToast(
            "Username wajib diisi.",
            "error"
        );

        usernameInput?.focus();

        return false;
    }

    if (!passwordInput?.value) {

        showToast(
            "Password wajib diisi.",
            "error"
        );

        passwordInput?.focus();

        return false;
    }

    if (passwordInput.value.length < 8) {

        showToast(
            "Password minimal 8 karakter.",
            "error"
        );

        passwordInput.focus();

        return false;
    }

    if (
        passwordInput.value !==
        confirmInput?.value
    ) {

        showToast(
            "Konfirmasi password tidak cocok.",
            "error"
        );

        confirmInput?.focus();

        return false;
    }

    if (!agreeInput?.checked) {

        showToast(
            "Anda harus menyetujui syarat dan ketentuan.",
            "error"
        );

        agreeInput?.focus();

        return false;
    }

    return true;
}


// =====================================================
// TAMPILKAN DATA VERIFIKASI
// =====================================================

function showVerificationData() {

    if (verificationName) {
        verificationName.textContent =
            nameInput.value.trim();
    }

    if (verificationEmail) {
        verificationEmail.textContent =
            emailInput.value.trim();
    }

    if (verificationUsername) {
        verificationUsername.textContent =
            usernameInput.value.trim();
    }

    if (verificationPhone) {
        verificationPhone.textContent =
            phoneInput.value.trim();
    }

    if (verificationBirth) {
        verificationBirth.textContent =
            birthInput.value;
    }

    if (verificationGender) {
        verificationGender.textContent =
            genderInput.value;
    }

    if (verificationLearning) {
        verificationLearning.textContent =
            learningInput.value;
    }
}


// =====================================================
// PINDAH KE STAGE
// =====================================================

function showStage(stageNumber) {

    const panels =
        document.querySelectorAll(
            ".stage-panel"
        );

 panels.forEach(panel => {
    panel.classList.add("hidden");
});

    const target =
        document.querySelector(
            `.stage-panel[data-stage="${stageNumber}"]`
        );

   if (target) {
    target.classList.remove("hidden");
}

    // -----------------------------------------------
    // UPDATE STEPPER
    // -----------------------------------------------

    const steps =
        document.querySelectorAll(
            ".step"
        );

    steps.forEach((step, index) => {

        const current =
            index + 1;

        step.classList.remove(
            "active",
            "completed"
        );

        if (current < stageNumber) {

            step.classList.add(
                "completed"
            );

        } else if (
            current === stageNumber
        ) {

            step.classList.add(
                "active"
            );
        }
    });
}


// =====================================================
// REGISTER FIREBASE
// =====================================================

async function handleRegister(event) {

    event.preventDefault();

    if (!validateRegisterForm()) {
        return;
    }

    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    try {

        showToast(
            "Membuat akun AKU BISA...",
            "info"
        );

        const user =
            await registerWithEmail(
                email,
                password,
                name
            );

        registeredUser = user;

        // -------------------------------------------
        // SIMPAN DATA SEMENTARA
        // -------------------------------------------
        // Password TIDAK disimpan.
        // -------------------------------------------

        sessionStorage.setItem(
            "akuBisaPendingRegistration",
            JSON.stringify({
                uid: user.uid,
                nama: name,
                email: email,
                username:
                    usernameInput.value.trim(),
                nomorTelepon:
                    phoneInput.value.trim(),
                tanggalLahir:
                    birthInput.value,
                jenisKelamin:
                    genderInput.value,
                bahasaDipilih:
                    learningInput.value
            })
        );

        showVerificationData();

        showStage(2);

        showToast(
            "Akun berhasil dibuat. Silakan periksa email untuk verifikasi.",
            "success"
        );

    } catch (error) {

        console.error(
            "AKU BISA: Register error:",
            error
        );

        showToast(
            getAuthErrorMessage(error),
            "error"
        );
    }
}


// =====================================================
// FORM SUBMIT
// =====================================================

if (form) {

    form.addEventListener(
        "submit",
        handleRegister
    );
}


// =====================================================
// CEK VERIFIKASI EMAIL
// =====================================================

async function handleCheckVerification() {

    if (!registeredUser) {

        showToast(
            "Sesi pendaftaran tidak ditemukan.",
            "error"
        );

        return;
    }

    try {

       if (verificationStatus) {
    verificationStatus.textContent =
        "Memeriksa status email...";
}

        const verified =
            await checkEmailVerified(
                registeredUser
            );

        if (!verified) {

           if (verificationStatus) {

    verificationStatus.textContent =
        "Email belum terverifikasi. Silakan buka email dari Firebase dan klik tautan verifikasi.";
}

            showToast(
                "Email belum terverifikasi.",
                "warning"
            );

            return;
        }

     if (verificationStatus) {

    verificationStatus.textContent =
        "Email berhasil diverifikasi.";
}

        showStage(3);

        showToast(
            "Email berhasil diverifikasi.",
            "success"
        );

    } catch (error) {

        console.error(
            "AKU BISA: Verification error:",
            error
        );

       if (verificationStatus) {

    verificationStatus.textContent =
        "Terjadi kesalahan saat memeriksa verifikasi.";
}

        showToast(
            getAuthErrorMessage(error),
            "error"
        );
    }
}


// =====================================================
// TOMBOL CEK VERIFIKASI
// =====================================================

if (checkVerification) {

    checkVerification.addEventListener(
        "click",
        handleCheckVerification
    );
}


// =====================================================
// KIRIM ULANG EMAIL VERIFIKASI
// =====================================================

async function handleResendVerification() {

    if (verificationCooldown) {
        return;
    }

    if (!registeredUser) {

        showToast(
            "Sesi pendaftaran tidak ditemukan.",
            "error"
        );

        return;
    }

    try {

        await sendVerificationEmail(
            registeredUser
        );

        showToast(
            "Email verifikasi berhasil dikirim ulang.",
            "success"
        );

        // -------------------------------------------
        // COOLDOWN
        // -------------------------------------------

        verificationCooldown = true;

        const originalText =
            resendVerification.textContent;

        let seconds = 60;

        resendVerification.disabled =
            true;

        resendVerification.textContent =
            `Kirim ulang (${seconds})`;

        const timer =
            setInterval(() => {

                seconds--;

                resendVerification.textContent =
                    `Kirim ulang (${seconds})`;

                if (seconds <= 0) {

                    clearInterval(timer);

                    verificationCooldown =
                        false;

                    resendVerification.disabled =
                        false;

                    resendVerification.textContent =
                        originalText;
                }

            }, 1000);

    } catch (error) {

        console.error(
            "AKU BISA: Resend verification error:",
            error
        );

        showToast(
            getAuthErrorMessage(error),
            "error"
        );
    }
}


// =====================================================
// TOMBOL KIRIM ULANG
// =====================================================

if (resendVerification) {

    resendVerification.addEventListener(
        "click",
        handleResendVerification
    );
}


// =====================================================
// KODE VERIFIKASI 6 DIGIT
// =====================================================
// Firebase Authentication TIDAK mengirim OTP 6 digit
// melalui sendEmailVerification().
//
// Karena itu input OTP lokal tidak digunakan untuk
// mengonfirmasi akun.
//
// Verifikasi dilakukan melalui email verification link
// resmi dari Firebase.
// =====================================================

if (verificationCode) {

    verificationCode.value = "";

    verificationCode.disabled = true;

    verificationCode.placeholder =
        "Verifikasi melalui link email";
}

if (verificationCodeMessage) {

    verificationCodeMessage.textContent =
        "Firebase menggunakan tautan verifikasi email. Buka email dari Firebase lalu klik tautan verifikasi.";
}


// =====================================================
// LOGIN
// =====================================================

if (goToLogin) {

    goToLogin.addEventListener(
        "click",
        () => {

            window.location.href =
                "./Login.html";

        }
    );
}


// =====================================================
// INITIAL STATE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showStage(1);

        updatePasswordStrength();

    }
);

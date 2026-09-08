console.log("AKU BISA: register.js BERHASIL DIMUAT");
// =====================================================
// AKU BISA - Register Page
// Firebase Authentication
// =====================================================

import {
    registerWithEmail,
    getAuthErrorMessage
} from "./auth-service.js";

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // =================================================
    // HELPER
    // =================================================

    const $ = (id) => document.getElementById(id);
    const query = (selector) => document.querySelector(selector);

    const form = $("form");
    const toast = $("toast");

    function notify(message) {
        if (!toast) {
            alert(message);
            return;
        }

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.akuBisaToastTimer);

        window.akuBisaToastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    function showFieldError(fieldId, message) {
        const field = $(fieldId);

        if (!field) {
            return;
        }

        const label = field.closest("label");

        if (!label) {
            return;
        }

        label.classList.toggle("invalid", Boolean(message));

        const errorElement = label.querySelector("em");

        if (errorElement) {
            errorElement.textContent = message || "";
        }
    }

    function clearErrors() {
        document.querySelectorAll("label.invalid").forEach((label) => {
            label.classList.remove("invalid");
        });

        document.querySelectorAll("label em").forEach((element) => {
            element.textContent = "";
        });

        const agreeError = query(".agree-error");

        if (agreeError) {
            agreeError.textContent = "";
        }
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidUsername(value) {
        return /^[A-Za-z0-9_]{4,20}$/.test(value);
    }

    // =================================================
    // PILIH BAHASA
    // =================================================

    const languageButtons =
        document.querySelectorAll("#langs button");

    languageButtons.forEach((button) => {

        button.addEventListener("click", () => {

            languageButtons.forEach((item) => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            $("learning").value =
                button.dataset.v || "";
        });

    });

    // =================================================
    // TOGGLE PASSWORD
    // =================================================

    document.querySelectorAll(".eye").forEach((button) => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.id;
            const input = $(targetId);

            if (!input) {
                return;
            }

            if (input.type === "password") {

                input.type = "text";
                button.textContent = "◌";

            } else {

                input.type = "password";
                button.textContent = "◉";

            }

        });

    });

    // =================================================
    // PASSWORD STRENGTH
    // =================================================

    const passwordInput = $("pass");
    const strengthText = $("strengthText");
    const strengthBars =
        document.querySelectorAll(".strength i");

    if (passwordInput) {

        passwordInput.addEventListener("input", () => {

            const value = passwordInput.value;

            let score = 0;

            if (value.length >= 8) {
                score++;
            }

            if (/[A-Z]/.test(value)) {
                score++;
            }

            if (/[0-9]/.test(value)) {
                score++;
            }

            if (/\W/.test(value)) {
                score++;
            }

            strengthBars.forEach((bar, index) => {

                bar.style.background =
                    index < score
                        ? "#1769e8"
                        : "#e6ebf2";

            });

            if (!value) {

                strengthText.textContent =
                    "Minimal 8 karakter";

            } else if (score < 2) {

                strengthText.textContent =
                    "Password lemah";

            } else if (score < 3) {

                strengthText.textContent =
                    "Password cukup";

            } else if (score < 4) {

                strengthText.textContent =
                    "Password kuat";

            } else {

                strengthText.textContent =
                    "Password sangat kuat";

            }

        });

    }

    // =================================================
    // BAHASA ANTARMUKA
    // =================================================

    const languageButton = $("lang");

    if (languageButton) {

        languageButton.addEventListener("click", () => {
            notify("Bahasa antarmuka: Indonesia 🇮🇩");
        });

    }

    // =================================================
    // FORM REGISTER
    // =================================================

    if (!form) {
        console.error(
            "AKU BISA: Form register tidak ditemukan."
        );
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        clearErrors();

        // ---------------------------------------------
        // AMBIL DATA FORM
        // ---------------------------------------------

        const name =
            $("name").value.trim();

        const email =
            $("email").value.trim();

        const phone =
            $("phone").value.trim();

        const birth =
            $("birth").value;

        const gender =
            $("gender").value;

        const learning =
            $("learning").value;

        const username =
            $("user").value.trim();

        const password =
            $("pass").value;

        const confirmPassword =
            $("confirm").value;

        const agree =
            $("agree").checked;

        let valid = true;

        // ---------------------------------------------
        // VALIDASI NAMA
        // ---------------------------------------------

        if (name.length < 3) {

            showFieldError(
                "name",
                "Nama minimal 3 karakter."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI EMAIL
        // ---------------------------------------------

        if (!isValidEmail(email)) {

            showFieldError(
                "email",
                "Email belum valid."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI NOMOR TELEPON
        // ---------------------------------------------

        if (
            phone.replace(/\D/g, "").length < 8
        ) {

            showFieldError(
                "phone",
                "Nomor telepon belum valid."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI TANGGAL LAHIR
        // ---------------------------------------------

        if (!birth) {

            showFieldError(
                "birth",
                "Pilih tanggal lahir."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI JENIS KELAMIN
        // ---------------------------------------------

        if (!gender) {

            showFieldError(
                "gender",
                "Pilih jenis kelamin."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI BAHASA
        // ---------------------------------------------

        if (!learning) {

            const languageLabel =
                $("learning").closest("label");

            const errorElement =
                languageLabel?.querySelector("em");

            if (errorElement) {
                errorElement.textContent =
                    "Pilih bahasa yang ingin dipelajari.";
            }

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI USERNAME
        // ---------------------------------------------

        if (!isValidUsername(username)) {

            showFieldError(
                "user",
                "Username 4–20 karakter tanpa spasi."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI PASSWORD
        // ---------------------------------------------

        if (password.length < 8) {

            showFieldError(
                "pass",
                "Password minimal 8 karakter."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI KONFIRMASI PASSWORD
        // ---------------------------------------------

        if (password !== confirmPassword) {

            showFieldError(
                "confirm",
                "Password tidak sama."
            );

            valid = false;
        }

        // ---------------------------------------------
        // VALIDASI PERSETUJUAN
        // ---------------------------------------------

        if (!agree) {

            const agreeError =
                query(".agree-error");

            if (agreeError) {
                agreeError.textContent =
                    "Setujui syarat dan ketentuan.";
            }

            valid = false;
        }

        // ---------------------------------------------
        // JIKA VALIDASI GAGAL
        // ---------------------------------------------

        if (!valid) {

            notify(
                "Periksa kembali data pendaftaran."
            );

            return;
        }

        // =================================================
        // DISABLE BUTTON
        // =================================================

        const submitButton =
            form.querySelector(".submit");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = "0.7";
            submitButton.style.cursor = "wait";
        }

        try {

            // =============================================
            // BUAT AKUN FIREBASE
            // =============================================

            const user =
                await registerWithEmail(
                    email,
                    password,
                    name
                );

            // =============================================
            // SIMPAN DATA NON-SENSITIF SEMENTARA
            // =============================================
            //
            // Password TIDAK disimpan.
            //
            // Data profil lengkap akan kita pindahkan
            // ke Firestore pada tahap berikutnya.
            //

            localStorage.setItem(
                "akuBisaRegisterPending",
                JSON.stringify({
                    uid: user.uid,
                    name: name,
                    email: email,
                    phone: phone,
                    birth: birth,
                    gender: gender,
                    username: username,
                    language: learning
                })
            );

            // =============================================
            // TAMPILKAN LANGKAH VERIFIKASI
            // =============================================

            const steps =
                document.querySelectorAll(".step");

            steps.forEach((step) => {
                step.classList.remove("active");
            });

            if (steps[1]) {
                steps[1].classList.add("active");
            }

            notify(
                "Akun berhasil dibuat! Silakan cek email untuk verifikasi. 📧"
            );

            // =============================================
            // ARAHKAN KE LOGIN
            // =============================================

            setTimeout(() => {

                window.location.href =
                    "Login.html";

            }, 2200);

        } catch (error) {

            console.error(
                "AKU BISA - Register Error:",
                error
            );

            notify(
                getAuthErrorMessage(error)
            );

        } finally {

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.style.opacity = "";
                submitButton.style.cursor = "";

            }

        }

    });

});

// =====================================================
// AKU BISA - Login JavaScript
// Menghubungkan Login.html dengan Firebase Authentication
// =====================================================

import {
    loginWithEmail,
    logout,
    getAuthErrorMessage
} from "./auth-service.js";


// =====================================================
// HELPER
// =====================================================

const getElement = (id) => {
    return document.getElementById(id);
};


// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    // -------------------------------------------------
    // ELEMENT LOGIN
    // -------------------------------------------------

    const loginForm = getElement("loginForm");
    const identity = getElement("identity");
    const password = getElement("password");
    const rememberMe = getElement("rememberMe");

    const loginButton = getElement("loginButton");
    const loginButtonText = getElement("loginButtonText");
    const loginSpinner = getElement("loginSpinner");

    const togglePassword = getElement("togglePassword");
    const eyeIcon = getElement("eyeIcon");

    const alertBox = getElement("alertBox");
    const identityError = getElement("identityError");
    const passwordError = getElement("passwordError");

    const googleLogin = getElement("googleLogin");
    const facebookLogin = getElement("facebookLogin");


    // -------------------------------------------------
    // CEK FORM
    // -------------------------------------------------

    if (!loginForm) {

        console.error(
            "AKU BISA: loginForm tidak ditemukan."
        );

        return;
    }


    // =================================================
    // ALERT
    // =================================================

    function showAlert(message, type = "error") {

        if (!alertBox) {
            return;
        }

        alertBox.textContent = message;

        alertBox.classList.remove(
            "error",
            "success",
            "warning",
            "info"
        );

        alertBox.classList.add(type);

        alertBox.style.display = "block";
    }


    // =================================================
    // HIDE ALERT
    // =================================================

    function hideAlert() {

        if (!alertBox) {
            return;
        }

        alertBox.textContent = "";

        alertBox.style.display = "none";
    }


    // =================================================
    // CLEAR ERROR
    // =================================================

    function clearErrors() {

        if (identityError) {
            identityError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (identity) {
            identity.classList.remove("input-error");
        }

        if (password) {
            password.classList.remove("input-error");
        }
    }


    // =================================================
    // VALIDASI FORM
    // =================================================

    function validateForm() {

        let valid = true;

        clearErrors();


        // -------------------------------------------------
        // EMAIL
        // -------------------------------------------------

        const email =
            identity?.value.trim() || "";


        if (!email) {

            if (identityError) {
                identityError.textContent =
                    "Email wajib diisi.";
            }

            identity?.classList.add(
                "input-error"
            );

            valid = false;

        } else {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                if (identityError) {
                    identityError.textContent =
                        "Masukkan alamat email yang valid.";
                }

                identity?.classList.add(
                    "input-error"
                );

                valid = false;
            }
        }


        // -------------------------------------------------
        // PASSWORD
        // -------------------------------------------------

        const passwordValue =
            password?.value || "";


        if (!passwordValue) {

            if (passwordError) {
                passwordError.textContent =
                    "Password wajib diisi.";
            }

            password?.classList.add(
                "input-error"
            );

            valid = false;
        }


        return valid;
    }


    // =================================================
    // LOADING BUTTON
    // =================================================

    function setLoading(isLoading) {

        if (loginButton) {
            loginButton.disabled =
                isLoading;
        }


        if (loginSpinner) {

            loginSpinner.style.display =
                isLoading
                    ? "inline-block"
                    : "none";
        }


        if (loginButtonText) {

            loginButtonText.textContent =
                isLoading
                    ? "Memproses..."
                    : "Masuk";
        }
    }


    // =================================================
    // TOGGLE PASSWORD
    // =================================================

    if (togglePassword && password) {

        togglePassword.addEventListener(
            "click",
            function () {

                const isPassword =
                    password.type === "password";


                password.type =
                    isPassword
                        ? "text"
                        : "password";


                if (eyeIcon) {

                    eyeIcon.classList.toggle(
                        "fa-eye",
                        !isPassword
                    );

                    eyeIcon.classList.toggle(
                        "fa-eye-slash",
                        isPassword
                    );
                }
            }
        );
    }


    // =================================================
    // LOGIN FIREBASE
    // =================================================

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            hideAlert();


            // ---------------------------------------------
            // Validasi
            // ---------------------------------------------

            if (!validateForm()) {
                return;
            }


            // ---------------------------------------------
            // Ambil data
            // ---------------------------------------------

            const email =
                identity.value.trim();

            const passwordValue =
                password.value;

            const remember =
                rememberMe
                    ? rememberMe.checked
                    : false;


            // ---------------------------------------------
            // Loading
            // ---------------------------------------------

            setLoading(true);


            try {

                // -----------------------------------------
                // Firebase Login
                // -----------------------------------------

                const user =
                    await loginWithEmail(
                        email,
                        passwordValue,
                        remember
                    );


                // -----------------------------------------
                // Cek verifikasi email
                // -----------------------------------------

                if (!user.emailVerified) {

                    await logout();

                    showAlert(
                        "Email Anda belum diverifikasi. Silakan verifikasi email terlebih dahulu.",
                        "warning"
                    );

                    setLoading(false);

                    return;
                }


                // -----------------------------------------
                // Login berhasil
                // -----------------------------------------

                showAlert(
                    "Login berhasil. Mengalihkan...",
                    "success"
                );


                // -----------------------------------------
                // Redirect dashboard user
                // -----------------------------------------

                setTimeout(
                    function () {

                        window.location.href =
                            "dasboard_user.html";

                    },
                    700
                );


            } catch (error) {

                console.error(
                    "AKU BISA Login Error:",
                    error
                );


                // -----------------------------------------
                // Tampilkan pesan Firebase
                // -----------------------------------------

                showAlert(
                    getAuthErrorMessage(error),
                    "error"
                );


            } finally {

                setLoading(false);
            }
        }
    );


    // =================================================
    // GOOGLE LOGIN
    // =================================================

    if (googleLogin) {

        googleLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showAlert(
                    "Login dengan Google belum diaktifkan. Kita akan mengaktifkannya pada tahap berikutnya.",
                    "info"
                );
            }
        );
    }


    // =================================================
    // FACEBOOK LOGIN
    // =================================================

    if (facebookLogin) {

        facebookLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showAlert(
                    "Login dengan Facebook belum diaktifkan. Kita akan mengaktifkannya pada tahap berikutnya.",
                    "info"
                );
            }
        );
    }


    // =================================================
    // HILANGKAN ERROR SAAT USER MULAI MENGETIK
    // =================================================

    if (identity) {

        identity.addEventListener(
            "input",
            function () {

                identityError &&
                    (identityError.textContent = "");

                identity.classList.remove(
                    "input-error"
                );

                hideAlert();
            }
        );
    }


    if (password) {

        password.addEventListener(
            "input",
            function () {

                passwordError &&
                    (passwordError.textContent = "");

                password.classList.remove(
                    "input-error"
                );

                hideAlert();
            }
        );
    }

});

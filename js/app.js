function isValidStudentNumber(value) {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    const regex = /^\d{2}-\d{4}-\d{3}$/;
    return regex.test(trimmed);
}

function isValidPassword(value) {
    if (typeof value !== "string") return false;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])^\S{8,}$/;
    return regex.test(value);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("registrationForm");
        const fullNameInput = document.getElementById("fullName");
        const studentNumberInput = document.getElementById("studentNumber");
        const emailInput = document.getElementById("email");
        const mobileNumberInput = document.getElementById("mobileNumber");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const courseSelect = document.getElementById("course");
        const termsCheckbox = document.getElementById("terms");

        const fullNameError = document.getElementById("fullNameError");
        const studentNumberError = document.getElementById("studentNumberError");
        const emailError = document.getElementById("emailError");
        const mobileNumberError = document.getElementById("mobileNumberError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const courseError = document.getElementById("courseError");
        const termsError = document.getElementById("termsError");
        const passwordFeedback = document.getElementById("passwordFeedback");

        const successMessage = document.getElementById("successMessage");
        const registrationSummary = document.getElementById("registrationSummary");

        const summaryName = document.getElementById("summaryName");
        const summaryStudentNumber = document.getElementById("summaryStudentNumber");
        const summaryEmail = document.getElementById("summaryEmail");
        const summaryMobileNumber = document.getElementById("summaryMobileNumber");
        const summaryCourse = document.getElementById("summaryCourse");

        function setError(input, errorElement, message) {
            input.setAttribute("aria-invalid", "true");
            errorElement.textContent = message;
        }

        function clearError(input, errorElement) {
            input.setAttribute("aria-invalid", "false");
            errorElement.textContent = "";
        }

        fullNameInput.addEventListener("blur", () => {
            const val = fullNameInput.value.trim();
            if (val === "" || val.length < 2) {
                setError(fullNameInput, fullNameError, "Full name is required and must be at least two characters (no spaces-only).");
            } else {
                clearError(fullNameInput, fullNameError);
            }
        });

        passwordInput.addEventListener("input", () => {
            const val = passwordInput.value;
            if (isValidPassword(val)) {
                passwordFeedback.textContent = "Password meets all requirements.";
                passwordFeedback.style.color = "#3c763d";
            } else {
                passwordFeedback.textContent = "Password must be >= 8 chars, include 1 uppercase letter, 1 digit, 1 symbol (@, $, !), and no spaces.";
                passwordFeedback.style.color = "#f0ad4e";
            }
        });

        courseSelect.addEventListener("change", () => {
            if (courseSelect.value === "BSIT" || courseSelect.value === "BSCS") {
                clearError(courseSelect, courseError);
            } else {
                setError(courseSelect, courseError, "Please select a valid course (BSIT or BSCS).");
            }
        });

        termsCheckbox.addEventListener("change", () => {
            if (termsCheckbox.checked) {
                clearError(termsCheckbox, termsError);
            } else {
                setError(termsCheckbox, termsError, "You must agree to the terms and conditions.");
            }
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let isValid = true;

            const nameVal = fullNameInput.value.trim();
            if (nameVal === "" || nameVal.length < 2) {
                setError(fullNameInput, fullNameError, "Full name is required and must be at least two characters.");
                isValid = false;
            } else {
                clearError(fullNameInput, fullNameError);
            }

            const studVal = studentNumberInput.value.trim();
            if (!isValidStudentNumber(studVal)) {
                setError(studentNumberInput, studentNumberError, "Enter a student number in the format 24-1234-123.");
                isValid = false;
            } else {
                clearError(studentNumberInput, studentNumberError);
            }

            const emailVal = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                setError(emailInput, emailError, "Enter a valid email address following the required pattern.");
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            const mobileVal = mobileNumberInput.value.trim();
            const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
            if (!mobileRegex.test(mobileVal)) {
                setError(mobileNumberInput, mobileNumberError, "Enter a valid mobile number starting with 09 or +639 with no spaces or hyphens.");
                isValid = false;
            } else {
                clearError(mobileNumberInput, mobileNumberError);
            }

            const passVal = passwordInput.value;
            if (!isValidPassword(passVal)) {
                setError(passwordInput, passwordError, "Password does not meet required criteria.");
                isValid = false;
            } else {
                clearError(passwordInput, passwordError);
            }

            const confirmPassVal = confirmPasswordInput.value;
            if (confirmPassVal !== passVal || confirmPassVal === "") {
                setError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
                isValid = false;
            } else {
                clearError(confirmPasswordInput, confirmPasswordError);
            }

            const courseVal = courseSelect.value;
            if (courseVal !== "BSIT" && courseVal !== "BSCS") {
                setError(courseSelect, courseError, "Please select BSIT or BSCS.");
                isValid = false;
            } else {
                clearError(courseSelect, courseError);
            }

            if (!termsCheckbox.checked) {
                setError(termsCheckbox, termsError, "You must agree to the terms.");
                isValid = false;
            } else {
                clearError(termsCheckbox, termsError);
            }

            if (isValid) {
                successMessage.textContent = "Registration details validated successfully!";
                successMessage.style.display = "block";

                summaryName.textContent = nameVal;
                summaryStudentNumber.textContent = studVal;
                summaryEmail.textContent = emailVal;
                summaryMobileNumber.textContent = mobileVal;
                summaryCourse.textContent = courseVal;
                registrationSummary.style.display = "block";
            } else {
                successMessage.style.display = "none";
                registrationSummary.style.display = "none";
            }
        });

        form.addEventListener("reset", () => {
            const inputs = form.querySelectorAll("input, select");
            inputs.forEach(input => {
                input.setAttribute("aria-invalid", "false");
            });

            const errors = form.querySelectorAll(".error-message");
            errors.forEach(err => err.textContent = "");

            passwordFeedback.textContent = "";
            successMessage.textContent = "";
            successMessage.style.display = "none";
            registrationSummary.style.display = "none";
        });
    });
}
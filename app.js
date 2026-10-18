const password = document.getElementById("user-password");
const toggleBtn = document.getElementById("eyeIcon");
const eyeIcon = document.querySelector(".eyeIcon i");
const label = document.querySelector(".acc-info label");
const loginForm = document.getElementById("acc-info");
const ruleElements = document.querySelectorAll(".valid-pass-rule");

// Individual rule validations for corresponding rules
const validators = [
  (val) => /[A-Z]/.test(val),
  (val) => /[a-z]/.test(val),
  (val) => /\d/.test(val),
  (val) => /[\W_]/.test(val),
  (val) => /^.{8,}$/.test(val),
];

// Main password regex for final form submission
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (password.value === "") {
    alert("Password can't be empty!");
  } else if (!passwordRegex.test(password.value)) {
    alert("Invalid Password! Please follow all requirements.");
  } else {
    alert("Success!");
  }
});

// Update Floating Label and Rule States
const updatePasswordValidationUI = () => {
  const value = password.value;
  const isActive = value !== "" || document.activeElement === password;
  label.classList.toggle("active", isActive);

  if (!isActive && value === "") {
    password.type = "password";
    eyeIcon.classList.toggle("fa-eye-slash", "fa-eye");
  }

  const hasStartedTyping = value.length > 0;

  ruleElements.forEach((ruleEl, index) => {
    if (!hasStartedTyping) {
      ruleEl.classList.remove("valid");
    } else {
      const isValid = validators[index](value);
      ruleEl.classList.toggle("valid", isValid);
    }
  });
};

// Password visibility toggle
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";

  eyeIcon.classList.toggle("fa-eye-slash", !isPassword);
  eyeIcon.classList.toggle("fa-eye", isPassword);

  password.focus();
});

toggleBtn.addEventListener("mousedown", (e) => {
  if (label.classList.contains("active")) {
    e.preventDefault();
  }
});

password.addEventListener("focus", updatePasswordValidationUI);
password.addEventListener("blur", updatePasswordValidationUI);
password.addEventListener("input", updatePasswordValidationUI);

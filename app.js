//
// window.addEventListener("mousemove", (e) => {
//   const coursor = document.querySelector(".coursor");

//   coursor.style.top = e.clientY + "px";
//   coursor.style.left = e.clientX + "px";
// });

//
const input = document.querySelector("input.counter");

if (input) {
  if (!input.value) input.value = "1";

  document
    .querySelectorAll(".prdct-counter .increment, .prdct-counter .decrement")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let val = parseInt(input.value) || 1;
        input.value = btn.classList.contains("increment")
          ? val + 1
          : Math.max(1, val - 1);
      });
    });

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });

  input.addEventListener("blur", () => {
    if (!input.value || parseInt(input.value) < 1) input.value = "1";
  });
}

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
  if (password.value === "") {
    e.preventDefault();
    alert("Password can't be empty!");
  } else if (!passwordRegex.test(password.value)) {
    e.preventDefault();
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

const galleryCnt = document.querySelectorAll(".gallery-cnt");
const popup = document.querySelector(".popup");
const popupImg = popup.querySelector(".popup-img img");
const galleryControls = popup.querySelectorAll("button");

popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    popup.classList.remove("active");
  }
});

let currentImg = 0;

galleryCnt.forEach((cnt, i) => {
  cnt.addEventListener("click", (e) => {
    currentImg = i;
    popup.classList.add("active");
    popupImg.src = e.target.src;
  });
});

galleryControls.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("right") && currentImg < galleryCnt.length) {
      currentImg++;
    } else if (button.classList.contains("left") && currentImg > 0) {
      currentImg--;
    }
    popupImg.src = galleryCnt[currentImg].querySelector("img").src;
  });
});

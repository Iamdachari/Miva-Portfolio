// =========================================================
// contact.js — Contact form validation
// Rules: no empty fields, valid email, phone digits only.
// =========================================================

const contactForm = document.getElementById("contact-form");
const successBox = document.getElementById("form-success");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsPattern = /^[0-9]+$/;

// Each field with its own validation function
const fields = [
  {
    id: "name",
    validate: function (value) {
      if (value === "") return "Please enter your name.";
      return "";
    }
  },
  {
    id: "email",
    validate: function (value) {
      if (value === "") return "Please enter your email address.";
      if (!emailPattern.test(value)) return "Please enter a valid email, e.g. name@example.com";
      return "";
    }
  },
  {
    id: "phone",
    validate: function (value) {
      if (value === "") return "Please enter your phone number.";
      if (!digitsPattern.test(value)) return "Phone number must contain digits only (no spaces, + or -).";
      if (value.length < 7 || value.length > 15) return "Phone number should be 7 to 15 digits long.";
      return "";
    }
  },
  {
    id: "message",
    validate: function (value) {
      if (value === "") return "Please write a message.";
      return "";
    }
  }
];

function checkField(field) {
  const input = document.getElementById(field.id);
  const errorEl = document.getElementById(field.id + "-error");
  const message = field.validate(input.value.trim());

  errorEl.textContent = message;
  input.parentElement.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
  return message === "";
}

// Validate a field as soon as the user leaves it,
// and clear its error while they type a correction
fields.forEach(function (field) {
  const input = document.getElementById(field.id);
  input.addEventListener("blur", function () { checkField(field); });
  input.addEventListener("input", function () {
    if (input.parentElement.classList.contains("invalid")) checkField(field);
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  successBox.classList.remove("show");

  let allValid = true;
  let firstInvalid = null;

  fields.forEach(function (field) {
    const ok = checkField(field);
    if (!ok && !firstInvalid) firstInvalid = document.getElementById(field.id);
    allValid = allValid && ok;
  });

  if (!allValid) {
    firstInvalid.focus();
    return;
  }

  // Simulated send (no server) — show a thank-you message
  const name = document.getElementById("name").value.trim().split(" ")[0];
  successBox.textContent = "Thanks, " + name + "! Your message has been sent. I'll get back to you soon.";
  successBox.classList.add("show");
  contactForm.reset();
});

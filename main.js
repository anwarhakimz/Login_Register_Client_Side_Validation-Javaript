const registerINlogin = document.querySelector(".btn-register-login");
const loginINregister = document.querySelector(".btn-login-register");
const registerForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");

registerINlogin.addEventListener("click", () => {
  registerform();
});

loginINregister.addEventListener("click", function () {
  loginform();
});

function loginform() {
  registerForm.classList.remove("active");
  loginForm.classList.remove("hidden");
}

function registerform() {
  registerForm.classList.add("active");
  loginForm.classList.add("hidden");
}

const passwordLogin = document.getElementById("password-login");
const eyes = document.querySelector(".ph-eye");
const eyeslash = document.querySelector(".ph-eye-slash");

eyes.onclick = () => {
  if (!eyes.classList.contains("ph-eye-slash")) {
    eyes.classList.remove("ph-eye");
    eyes.classList.add("ph-eye-slash");
    passwordLogin.setAttribute("type", "text");
  } else {
    eyes.classList.add("ph-eye");
    eyes.classList.remove("ph-eye-slash");
    passwordLogin.setAttribute("type", "password");
  }
};

// registerForm
const Rusername = document.getElementById("username-register");
const Remail = document.getElementById("username-register");
const Rpassword = document.getElementById("password-register");
// const info = document.querySelector(".info");

let user = false;
let pass = false;
let mail = false;

Rusername.addEventListener("input", function () {
  const username = Rusername.value.trim();
  const email = Remail.value.trim();
  const password = Rpassword.value.trim();
  const usernameRegex =
    /^(?=.*[!@#$%^&*()_0-9])(?=.*[!@#$%^&*()_a-zA-Z])[a-zA-Z0-9!@#$%^&*()_]+$/;

  if (username == "") {
    showerror(Rusername, "Enter Your Username");
  } else if (username.length <= 5) {
    showerror(Rusername, "Username must be longer then 5 characters");
  } else if (username.length >= 20) {
    showerror(Rusername, "Username must be less then 20 characters");
  } else if (!usernameRegex.test(username)) {
    showerror(
      Rusername,

      "Username must be contain letter and special character"
    );
  } else {
    showsucces(Rusername, "Username is available");
    return (user = false);
  }
});

Rpassword.addEventListener("input", function () {
  const email = Remail.value.trim();
  const password = Rpassword.value.trim();
  const username = Rusername.value.trim();

  const passwordRegex =
    /^(?=.*\d)(?=.*\w)[\s\S]+|(?=.*\d)(?=.*\W)[\s\S]+|(?=.*\d)(?=.*\w)[\s\S]+|(?=.*\d)(?=.*\W)[\s\S]+$i/;
  const mostStrong = /\W/;

  if (password == "") {
    showerror(Rpassword, "Enter Your password");
  } else if (password.length <= 5) {
    showerror(Rpassword, "password must be longer then 5 characters");
  } else if (password.length >= 30) {
    showerror(Rpassword, "password must be less then 30 characters");
  } else if (password == username) {
    showerror(Rpassword, "Password cannot be same as Username");
  } else if (!passwordRegex.test(password)) {
    showerror(Rpassword, "password must be contain number");
  } else if (passwordRegex.test(password)) {
    showsucces(Rpassword, "Your password strength is medium ");
    user = false;
  } else if (mostStrong.includes(password)) {
    showsucces(Rpassword, "Your password strength is Excellent  ");
    return (user = false);
  }
});

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (user == true) {
    console.log(" ");
  }
});

function showerror(input, message) {
  input.style.border = "2px solid red";
  const parent = input.parentElement;
  const show = parent.querySelector(".info");
  show.innerText = message;

  show.style.color = "red";
}
function showsucces(input, message) {
  input.style.border = "2px solid green";
  const parent = input.parentElement;
  const show = parent.querySelector(".info");
  show.innerText = message;
  show.style.color = "green";
}

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
const Remail = document.getElementById("email-register");
const Rpassword = document.getElementById("password-register");
// const info = document.querySelector(".info");

let user = false;
let pass = false;
let mail = false;

Rusername.addEventListener("input", function () {
  const username = Rusername.value.trim();

  const usernameRegex =
    /^(?=.*[!@#$%^&*()_0-9])(?=.*[!@#$%^&*()_a-zA-Z])[a-zA-Z0-9!@#$%^&*()_]+$/;

  if (username == "") {
    showerror(Rusername, "Enter Your Username");
    user = false;
  } else if (username.length <= 5) {
    showerror(Rusername, "Username must be longer then 5 characters");
    user = false;
  } else if (username.length >= 20) {
    showerror(Rusername, "Username must be less then 20 characters");
    user = false;
  } else if (!usernameRegex.test(username)) {
    showerror(
      Rusername,
      "Username must be contain letter and special character"
    );
    user = false;
  } else {
    showsuccess(Rusername, "Username is available");
    user = true;
  }
});

Remail.addEventListener("input", function (e) {
  const email = Remail.value.trim();

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email == "") {
    showerror(Remail, "Enter your email addres");
    mail = false;
  } else if (!regex.test(email)) {
    e.target.style.border = "2px solid #202432";
    e.target.parentElement.querySelector(".info").innerText = "";
    mail = false;
  } else {
    showsuccess(Remail, "Email address is valid");
    mail = true;
  }
});

Rpassword.addEventListener("input", function () {
  const password = Rpassword.value.trim();
  const username = Rusername.value.trim();
  const email = Remail.value.trim();

  const regex = /^[A-Za-z]*$/gi;
  const low = /^(?=.*\d)[A-Za-z0-9]*$/gi;
  const medium = /^(?=.*[^\w])[\w\W]*$/gi;
  const Strong = /^(?=.*[^\d])(?=.*[A-Z])[\w\d\W]*$/;

  if (password === "") {
    showerror(Rpassword, "Enter Your password");
    pass = false;
  } else if (password.length <= 5) {
    showerror(Rpassword, "password must be longer than 5 characters");
    pass = false;
  } else if (password.length >= 30) {
    showerror(Rpassword, "password must be less than 30 characters");
    pass = false;
  } else if (password === username) {
    showerror(Rpassword, "Password cannot be the same as Username");
    pass = false;
  } else if (Strong.test(password)) {
    showsuccess(Rpassword, "Your password strength is Excellent");
    pass = true;
  } else if (password == email) {
    showerror(Rpassword, "password cannot be same as email");
    pass = false;
  } else if (medium.test(password)) {
    showsuccess(Rpassword, "Your password strength is medium");
    pass = true;
  } else if (low.test(password)) {
    showsuccess(Rpassword, "Your password strength is low");
    pass = true;
  } else if (regex.test(password)) {
    showerror(
      Rpassword,
      "Password at least contains number or special charackter"
    );
    pass = false;
  }
});

const checkbox = document.getElementById("checkbox");
const errorRegister = document.querySelector(".error-register");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = Remail.value.trim();

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!checkbox.checked && user && pass && mail) {
    errorRegister.classList.add("active");
  } else {
    errorRegister.classList.remove("active");
  }

  if (!regex.test(email) && user && pass) {
    showerror(Remail, "Email address not valid");
  } else if (!regex.test(email) && user && pass && checkbox.checked) {
    showerror(Remail, "Email address not valid");
  }

  if (user && mail && pass && checkbox.checked) {
    window.location.href = "https://www.rakamin.com/";
  }
});

function showerror(input, message) {
  input.style.border = "2px solid red";
  const parent = input.parentElement;
  const show = parent.querySelector(".info");

  show.innerText = message;

  show.style.color = "red";
}
function showsuccess(input, message) {
  input.style.border = "2px solid green";
  const parent = input.parentElement;
  const show = parent.querySelector(".info");
  show.innerText = message;
  show.style.color = "green";
}

function resetInput() {
  const Allinput = document.querySelectorAll("input");

  Allinput.forEach((input) => {
    input.style.border = "2px solid #202432";
  });
}

function resetinfo() {
  const Allinfo = document.querySelectorAll(".info");

  Allinfo.forEach((info) => {
    info.innerText = "";
  });
}

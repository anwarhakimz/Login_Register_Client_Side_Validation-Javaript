import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  child,
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1rGARdzOo4JmuvQSn6Xwph6Cammi11J0",
  authDomain: "login-form-4c7a2.firebaseapp.com",
  databaseURL: "https://login-form-4c7a2-default-rtdb.firebaseio.com",
  projectId: "login-form-4c7a2",
  storageBucket: "login-form-4c7a2.appspot.com",
  messagingSenderId: "360453255572",
  appId: "1:360453255572:web:eb939c9b763593d4401f81",
  measurementId: "G-VJ7XC5GCV1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);

const btnLoginForgot = document.querySelector(".btn-login-forgot");
const forgotpasswornBtn = document.querySelector(".forgot-password-btn");
const forgotForm = document.querySelector(".forgot-form");

forgotpasswornBtn.addEventListener("click", function () {
  forgotForm.classList.add("active");
  loginForm.classList.add("hidden");
});

btnLoginForgot.addEventListener("click", function () {
  loginform();
});

function loginform() {
  forgotForm.classList.remove("active");
  loginForm.classList.remove("hidden");
}

const forgotFormArea = document.getElementById("forgot-form");
const checkEmail = document.querySelector(".check-email");
const Femail = document.getElementById("email-forgot");
const newPass = document.getElementById("password-forgot");
const conPass = document.getElementById("confirm-password-forgot");
const loginForm = document.querySelector(".login-form");

Femail.addEventListener("input", function () {
  const email = Femail.value.trim();

  if (email === "") {
    showerror(Femail, "Enter your email");
  } else {
    Femail.style.border = "2px solid #202432";
    Femail.parentElement.querySelector(".info").innerText = "";
  }
});

checkEmail.addEventListener("click", function () {
  const email = Femail.value.trim();
  get(child(dbRef, `users`))
    .then((user) => {
      if (user.exists()) {
        let check = false;
        user.forEach((us) => {
          if (us.val().email === email) {
            check = true;
          }
        });

        if (check) {
          // } else if (email === "") {
          //   showerror(Femail, "Enter your email");
          showsuccess(Femail, "Your email is valid");

          newPass.disabled = false;
          conPass.disabled = false;
        } else {
          showerror(Femail, "Your email is not valid");
        }
      } else {
        showsuccess(Femail, "Email is available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

let newpass = false;

newPass.addEventListener("input", async function () {
  const password = newPass.value.trim();

  const email = Femail.value.trim();

  const regex = /^[A-Za-z]*$/gi;
  const low = /^(?=.*\d)[A-Za-z0-9]*$/gi;
  const medium = /^(?=.*[^\w])[\w\W]*$/gi;
  const Strong = /^(?=.*[^\d])(?=.*[A-Z])[\w\d\W]*$/;

  const username = await get(child(dbRef, `users`))
    .then((user) => {
      let match = [];
      user.forEach((user) => {
        if (user.val().email === email && user.val().username)
          match.push(user.val().username);
      });

      return match;
    })

    .catch((error) => {
      console.error(error);
    });

  let news = username.length ? username : [];

  if (password === "") {
    showerror(newPass, "Enter Your password");
    newpass = false;
  } else if (password.length <= 5) {
    showerror(newPass, "password must be longer than 5 characters");
    newpass = false;
  } else if (password.length >= 30) {
    showerror(newPass, "password must be less than 30 characters");
    newpass = false;
  } else if (password === news) {
    showerror(newPass, "Password cannot be the same as Username");
    newpass = false;
  } else if (Strong.test(password)) {
    showsuccess(newPass, "Your password strength is Excellent");
    newpass = true;
  } else if (password == email) {
    showerror(newPass, "password cannot be same as email");
    newpass = true;
  } else if (medium.test(password)) {
    showsuccess(newPass, "Your password strength is medium");
    newpass = true;
  } else if (low.test(password)) {
    showsuccess(newPass, "Your password strength is low");
    newpass = true;
  } else if (regex.test(password)) {
    showerror(
      newPass,
      "Password at least contains number or special charackter"
    );
    newpass = false;
  }
});

let conf = false;

conPass.addEventListener("input", () => {
  const confirm = conPass.value.trim();
  const password = newPass.value.trim();
  if (confirm === "") {
    showerror(conPass, "Confirm your password");
    conf = false;
  } else if (confirm !== password) {
    showerror(conPass, "password are not matching");
    conf = false;
  } else {
    showsuccess(conPass, "password matching");
    conf = true;
  }
});

// Mendapatkan path dari referensi database

forgotFormArea.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = Femail.value.trim();
  const confirm = conPass.value.trim();
  const password = newPass.value.trim();

  const inputlogin = forgotFormArea.querySelectorAll("input");

  const id = await get(child(dbRef, `users`))
    .then((user) => {
      let match = [];
      user.forEach((user) => {
        if (user.val().email === email && user.val().username)
          match.push(user.val().id);
      });

      return match;
    })
    .catch((error) => {
      console.error(error);
    });

  const uid = id[0];

  if (confirm === "" && password === "") {
    showerror(Femail, "Enter your email");
  } else if (conf && newpass) {
    const userRef = child(ref(db), `users/${uid}`);
    const newData = {
      password: password,
    };
    // Mengupdate data pengguna pada path yang ditentukan
    update(userRef, newData)
      .then(() => {
        swal("Successfully!", "Reset Password", "success").then((value) => {
          if (value) {
            resetInput();
            resetinfo();
            loginform();
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (email)
    inputlogin.forEach((inp) => {
      if (inp.value.trim() === "") {
        inp.style.border = "2px solid red";
        const parent = inp.parentElement;
        const show = parent.querySelector(".info");
        const label = parent.querySelector("label").innerText;

        show.innerText = `Enter ${label}`;
        show.style.color = "red";
        inp.style.border = "2px solid red";
      } else {
        inp.style.border = "2px solid #202432";
        const parent = inp.parentElement;
        const show = parent.querySelector(".info");
        show.innerText = ``;
      }
    });
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
  const Allinput = forgotFormArea.querySelectorAll("input");

  Allinput.forEach((input) => {
    input.style.border = "2px solid #202432";
    input.value = "";
  });
}

function resetinfo() {
  const Allinfo = forgotFormArea.querySelectorAll(".info");

  Allinfo.forEach((info) => {
    info.innerText = "";
  });
}

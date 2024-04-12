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

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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
const dbRef = ref(getDatabase());

const provider = new GoogleAuthProvider();

const google = document.querySelector(".google");

google.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const user = result.user;

      window.location.href = "https://vite.dev";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

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
const passwordRegister = document.getElementById("password-register");
const eyes = document.querySelector(".ph-eye");
const eyeslash = document.querySelector(".ph-eye-slash");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("ph-ey")) {
    if (!eyes.classList.contains("ph-eye-slash")) {
      eyes.classList.remove("ph-eye");
      eyes.classList.add("ph-eye-slash");
      passwordLogin.setAttribute("type", "text");
    } else {
      eyes.classList.add("ph-eye");
      eyes.classList.remove("ph-eye-slash");
      passwordLogin.setAttribute("type", "password");
    }
  } else if (e.target.classList.contains("ph-eyr")) {
    if (!e.target.classList.contains("ph-eye-slash")) {
      e.target.classList.remove("ph-eye");
      e.target.classList.add("ph-eye-slash");
      passwordRegister.setAttribute("type", "text");
    } else {
      e.target.classList.add("ph-eye");
      e.target.classList.remove("ph-eye-slash");
      passwordRegister.setAttribute("type", "password");
    }
  }
});

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
    /^(?=.*[!@#$%^&*,.()_0-9])(?=.*[!@#$%^&*()_a-zA-Z])[a-zA-Z0-9!@#$%^&,.()_]+$/;

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
  get(child(dbRef, `users`))
    .then((user) => {
      if (user.exists()) {
        user.forEach((user) => {
          if (user.val().username === username) {
            showerror(Rusername, "Username already is taken");
            user = false;
          } else {
            showsuccess(Rusername, "Username is available");
            user = true;
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

Remail.addEventListener("input", function (e) {
  const email = Remail.value.trim();

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const cek = /@/;

  if (email == "") {
    showerror(Remail, "Enter your email addres");
    mail = false;
  } else if (!cek.test(email)) {
    showerror(Remail, "Email address must contain @");
    mail = false;
  } else if (!regex.test(email)) {
    e.target.style.border = "2px solid #202432";
    e.target.parentElement.querySelector(".info").innerText = "";
    mail = false;
  } else {
    showsuccess(Remail, "Email address is valid");
    mail = true;
  }

  get(child(dbRef, `users`))
    .then((user) => {
      if (user.exists()) {
        user.forEach((user) => {
          if (user.val().email === email) {
            showerror(Remail, "Email already is taken");
            mail = false;
          } else {
            showsuccess(Remail, "Email is available");
            mail = true;
          }
        });
      } else {
      }
    })
    .catch((error) => {
      console.error(error);
    });
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
  const password = Rpassword.value.trim();
  const username = Rusername.value.trim();
  const input = registerForm.querySelectorAll("input");

  input.forEach((inp) => {
    if (inp.value === "") {
      inp.style.border = "2px solid red";
      const parent = inp.parentElement;
      const show = parent.querySelector(".info");
      const label = parent.querySelector("label");
      const message = label.innerText.toLowerCase();

      show.innerText = `Enter your ${message}`;

      show.style.color = "red";
    }
  });

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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          username: username,
          email: email,
          password: password,
          id: user.uid,
        });
        swal("Successfully!", "Creating Account", "success").then((value) => {
          if (value) {
            resetInput();
            resetinfo();
            loginform();
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        showerror(Rusername, errorCode);
        user = false;
        // ..
      });
  }
});

const errorLogin = document.querySelector(".error-login");
const loginformarea = document.getElementById("login-form");
const Lusername = document.getElementById("username-login");
const Lpassword = document.getElementById("password-login");

Lusername.addEventListener("input", function () {
  Lusername.style.border = "2px solid  #202432";
  errorLogin.classList.remove("active");
  let usernameLogin = Lusername.value.trim();
  if (remember.checked) {
    let check = true;
    addLS(usernameLogin, check);
  } else {
    localStorage.removeItem("remember");
    localStorage.removeItem("username");
  }
});

Lpassword.addEventListener("input", function () {
  Lpassword.style.border = "2px solid  #202432";
  errorLogin.classList.remove("active");
});

loginformarea.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = Lusername.value.trim();
  const password = Lpassword.value.trim();
  const inputlogin = loginformarea.querySelectorAll("input");

  get(child(dbRef, `users`))
    .then((user) => {
      let match = false;
      user.forEach((user) => {
        const data = user.val();

        if (data.username == username && data.password == password) {
          match = true;
        } else {
          match = false;
        }
      });

      if (match) {
        errorLogin.classList.remove("active");
        window.location.href = "https://vitejs.dev";
        return;
      } else {
        errorLogin.classList.add("active");
        errorLogin.innerText = "Wrong username and password";
      }

      inputlogin.forEach((inp) => {
        if (inp.value.trim() === "") {
          inp.style.border = "2px solid red";
          errorLogin.innerText = "Enter username or password";
          errorLogin.classList.add("active");
        } else {
          inp.style.border = "2px solid #202432";
        }
      });
    })
    .catch((error) => {
      console.error(error);
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

const remember = document.getElementById("Remember");

document.addEventListener("DOMContentLoaded", function () {
  const nameLS = JSON.parse(localStorage.getItem("username"));
  const checkLS = JSON.parse(localStorage.getItem("remember"));

  nameLS ? (Lusername.value = nameLS.username) : Lusername.value == "";

  checkLS ? (remember.checked = true) : (remember.checked = false);
});

remember.onclick = () => {
  let usernameLogin = Lusername.value.trim();
  if (remember.checked) {
    let check = true;
    addLS(usernameLogin, check);
  } else {
    localStorage.removeItem("remember");
    localStorage.removeItem("username");
  }
};

function addLS(username, check) {
  localStorage.setItem("username", JSON.stringify({ username }));
  localStorage.setItem("remember", JSON.stringify({ check }));
}

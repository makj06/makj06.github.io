
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4HIHyEkaf1xONObyuG-t5cZZOOA-fgiQ",
    authDomain: "bpcookbook-4ac87.firebaseapp.com",
    projectId: "bpcookbook-4ac87",
    storageBucket: "bpcookbook-4ac87.appspot.com",
    messagingSenderId: "240490994695",
    appId: "1:240490994695:web:0cc2d958b8adcc25749ea2",
    measurementId: "G-4MR0C3KJ2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)




//Submit button
const submitRegister = document.getElementById('submitRegister');

//Register User
submitRegister.addEventListener("click", function (event) {
    event.preventDefault()

    //Inputs
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const passwordAgain = document.getElementById('passwordAgainInput').value;

    if (password === passwordAgain) {
        //Create User
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("You have been registered")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode ==="auth/email-already-in-use"){
                document.getElementById("errorBox").style.display = "flex";
                document.getElementById("error").innerText = "User is already registered"
            } else {
                document.getElementById("errorBox").style.display = "flex";
                document.getElementById("error").innerText = errorCode
            }

            if (errorCode === "auth/weak-password") {
                document.getElementById("errorBox").style.display = "flex";
                document.getElementById("error").innerText = "Password must have more than 6 characters"
            }

            if (errorCode === "auth/missing-password") {
                document.getElementById("errorBox").style.display = "flex";
                document.getElementById("error").innerText = "Please enter your password"
            }

            if (errorCode === "auth/invalid-email") {
                document.getElementById("errorBox").style.display = "flex";
                document.getElementById("error").innerText = "Please enter your email"
            }
            
            if (errorCode === "auth/missing-email") {
                document.getElementById("errorBox").style.display = "flex";
                document.getElementById("error").innerText = "Please enter your email"
            }
        });
    } else {
        //write errof for not same passwords
        document.getElementById("errorBox").style.display = "flex";
        document.getElementById("error").innerText = "Passwords must be same"
    }

    
})


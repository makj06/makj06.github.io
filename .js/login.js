
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const submitLogin = document.getElementById('submitLogin');

//Register User
submitLogin.addEventListener("click", function (event) {
    event.preventDefault()

    //Inputs
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const auth = getAuth();


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const UID = user.uid
            sessionStorage.setItem('userID',UID)
            window.location.href="myNotes.html"
            
        })
        .catch((error) => {
            document.getElementById("errorBox").style.display = "flex";
            document.getElementById("error").innerText = 'Email or password is incorrect'
        });

})

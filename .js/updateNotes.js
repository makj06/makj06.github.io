// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

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

// Get a reference to the firestore database
const db = getFirestore();


//Get docID from sessionStorage
const  id = sessionStorage.getItem("selectedNote")

//Get Document
const notesCollectionRef = doc(db, "notes", id);

const docSnap = await getDoc(notesCollectionRef);

console.log(docSnap.data())

//Get input id
const titleInput = document.getElementById("titleInput");
const textInput = document.getElementById("textInput");
const errorp = document.getElementById("errorParagraph");

//Add text to inputs
titleInput.value = docSnap.data().title;
textInput.value = docSnap.data().text;


//Getting update button
const updateBTN = document.getElementById("BTNUpdate");

updateBTN.addEventListener('click', function (event) {
    event.preventDefault()
    
    const userID = sessionStorage.getItem("userID").trim();
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const timestamp = Date.now();

    if (title === docSnap.data().title && text === docSnap.data().text) {
        //Data will remain same
        errorp.innerText="Data are same";
        errorp.classList.remove("none")
        errorp.classList.remove("success")
        errorp.classList.add("error")
        console.log('sameData')
    } else {
        //Data will change
        const data = {
            userID: userID,
            title: title,
            text: text,
            timestamp: timestamp
        };

        updateDoc(notesCollectionRef, data)
            .then(docRef => {
                setTimeout(300)
                errorp.innerText="Note is updated";
                errorp.classList.remove("none")
                errorp.classList.remove("error")
                errorp.classList.add("success")
                console.log("A New Document Field has been added to an existing document");
            })
            .catch(error => {
                console.log(error);
            })
    }
})

//Go back button
const backBTN = document.getElementById("goBTN");

backBTN.addEventListener( "click", function(){
    window.location.href="myNotes.html"
})


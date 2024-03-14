// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

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
const notesCollectionRef = collection(db, "notes");

// Get the submit button element
const submitButton = document.getElementById("BTNSubmit");

// Add a click event listener to the submit button
submitButton.addEventListener("click", function(event) {
    event.preventDefault()
  // Get the input values
  const userID = sessionStorage.getItem("userID").trim();
  const title = document.getElementById("titleInput").value.trim();
  const text = document.getElementById("textInput").value.trim();
  const timestamp = Date.now();

  const errorp = document.getElementById("errorParagraph");


 if(title.length===0 ||  text.length===0){
    console.log("err")
} else {
    //Creating data collection
    const noteData = {
        text: text,
        timestamp: timestamp,
        title: title,
        userID: userID
     };

     addDoc(notesCollectionRef, noteData)
     .then((docReference) => {
        console.log('Document Added'+ docReference.id);
        errorp.innerText="Document Added";
        errorp.classList.remove("none");
        errorp.classList.remove("error");
        errorp.classList.add("success");
     })
     .catch(error =>{
        console.log(error);
        errorp.innerText="Document Added";
        errorp.classList.remove("none");
        errorp.classList.remove("success");
        errorp.classList.add("error");
     })
}
});




/* 
// Define the function to add a document
async function addDocument(userID, title, topic, text, timestamp) {
  try {
    // Add the document to the firestore database
    const docRef = await addDoc(notesCollectionRef, {
      userID,
      title,
      topic,
      text,
      timestamp,
    });
    console.log("Document added with ID: ", docRef.id);
    alert("Success");
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed");
  }
}*/
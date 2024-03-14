// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs,deleteDoc, onSnapshot, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

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

//new list
const noteList = []
let docIDList = []

//Queries
const q = query(notesCollectionRef, where("userID", "==", "CW5kVUTO5uWW0IIYwuBlAK3IuNH3"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    noteList.push(doc.data())
    docIDList.push(doc.id)
});


//Saving data to sessionStorage
sessionStorage.setItem("docID", JSON.stringify(docIDList));

//Getting data from storage
docIDList = [];
docIDList = JSON.parse(sessionStorage.getItem("docID") || "[]")

//Declere
const postContainer = document.querySelector('.card-container')


//Creating notes
for (let i = 0; i < noteList.length; i++) {

    let ps= i
    const title = noteList[ps].title.toString();
    const text = noteList[ps].text.toString();

    const postElement = document.createElement('div');
    postElement.classList.add('card');
    postElement.innerHTML = '<div class="card-header"> <h3>'+ title+ '</h3><div> <button class ="deleteBTN" id='+ i+ '>delete</button><button  class ="updateBTN" id='+ i+ '>update</button></div></div><p>'+text+'</p>'
    
    //'<h3>'+ title + '</h3> <p>'+ topic +'</p> <p>'+ text+'</p> <div> <button class ="deleteBTN" id='+ i+ '>delete</button> <button  class ="updateBTN" id='+ i+ '>update</button> </div>'


    //'<div class="card-header"><h3>'+ title+ '</h3><div><div> <button class ="deleteBTN" id='+ i+ '>delete</button> <button  class ="updateBTN" id='+ i+ '>update</button> </div></div><p>'+text+'</p>'
    postContainer.appendChild(postElement)

    ps++
}



  const deleteButtons = document.querySelectorAll('.deleteBTN');

  // Iterate over the buttons and add a click event listener to each
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.id;
      console.log(buttonId)

      const delDocRef = doc(db, 'notes', docIDList[buttonId]);

      deleteDoc(delDocRef)
      .then(() => {
          console.log("Entire Document has been deleted successfully.")
          location.reload();
      })
      .catch(error => {
          console.log(error);
      })
     
    });
  });


  const updateButtons = document.querySelectorAll('.updateBTN');

  updateButtons.forEach(button => {
    button.addEventListener('click',function(){
        //Getting button ID
        const buttonId = this.id;
        //Putting docID to session storage
        sessionStorage.setItem('selectedNote',docIDList[buttonId])

        //Changing page
        window.location.href="updateNote.html"
    })
  })

//variables
const loginBTN = document.getElementById('BTNLogin');
const logOutBTN = document.getElementById('BTNLogOut');
const indexLoginBTN = document.getElementById('indexLoginBTN');

showLogin();

//Login button show
function showLogin() {

    //variables
    const userID = sessionStorage.getItem('userID');
    const myNotes = document.getElementById('myNotes');
    const newNote = document.getElementById('newNote');
    const about = document.getElementById('about');

    if (userID != null) {
        loginBTN.style.display = "none";
        about.style.display = "none";
        myNotes.style.display = "inline-block";
        newNote.style.display = "inline-block";
    } else {
        logOutBTN.style.display = "none";
        myNotes.style.display = "none";
        newNote.style.display = "none";
        loginBTN.style.display = "inline-block";
        about.style.display = "inline-block";
    }
};


//Logout
logOutBTN.addEventListener('click', function (event){
    event.preventDefault()
    sessionStorage.removeItem('userID')
    showLogin();
    window.location.href="index.html"
})


loginBTN.addEventListener('click', function (event){
    event.preventDefault()
    window.location.href="login.html"
})

indexLoginBTN.addEventListener('click', function (event){
    event.preventDefault()
    window.location.href="login.html"
})









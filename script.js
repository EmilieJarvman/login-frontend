

const localStorageKey = "loggedInUserId";
let isLoggedIn = false;
let failedLogin = false;
let currentUser = null;

function checkLogin() {
    isLoggedIn = JSON.parse(localStorage.getItem(localStorageKey));
    if (isLoggedIn) {
        // fetch("http://localhost:3000/users/getuser", {
            fetch("https://emibur-1.herokuapp.com/users/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: isLoggedIn})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                currentUser = data;
                headerSuccessElem.innerText = `Hej ${currentUser.username}! Nu är du inloggad.`;
                toggleCheckbox.checked = currentUser.subscribed;
                regInfoText.innerHTML = currentUser.subscribed ? "Du prenumererar på vårt nyhetsbrev." : "Du prenumererar inte på vårt nyhetsbrev.";
                regQuestionText.innerHTML = `Klicka om du vill${currentUser.subscribed ? " sluta":""} prenumerera.`;
            })
    }

    console.log({isLoggedIn});
}


// HEADER
let headerElem = document.createElement("header");
headerElem.id = "headerElem";
document.body.appendChild(headerElem);

const header = document.createElement("h1");
header.id = "header";
headerElem.appendChild(header); 

// ANIMATED BACKGROUND
let animElem = document.createElement("div");
animElem.className = "animElem"
document.body.appendChild(animElem);

// MENU
let menuElem = document.createElement("div");
menuElem.id = "menuElem";
headerElem.appendChild(menuElem);

// LOGOUT BUTTON
const logOutButton = document.createElement("button");
logOutButton.id = "logOutButton";
logOutButton.className ="button";
logOutButton.innerText = "Logga ut";
logOutButton.onclick = logOut;

function logOut() {
    localStorage.removeItem(localStorageKey);
    render();
}


const infoDivElem = document.createElement("div");
infoDivElem.className = "card";
infoDivElem.id = "infoDivElem";

const regInfoText = document.createElement("p");
regInfoText.className = "regInfo"
regInfoText.innerHTML = "Du prenumererar (inte) på vårt nyhetsbrev";

const regQuestionText = document.createElement("p");
regQuestionText.className = "regInfo"
regQuestionText.innerHTML = "Klicka i om du vill (sluta) prenumerera";

const toggleCheckbox = document.createElement("input");
toggleCheckbox.type = "checkbox";
toggleCheckbox.className = "checkbox";
toggleCheckbox.onclick = function() {
    // fetch("http://localhost:3000/users/subscriber", {
            fetch("https://emibur-1.herokuapp.com/users/subscriber", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: isLoggedIn, state: toggleCheckbox.checked })
            })
            .then(() => {
                render();
            }) 
    }


// LOGIN_MENU
const loginDivElem = document.createElement("div");
loginDivElem.className = "card";

const userNameElem = document.createElement("input");
userNameElem.className = "input";
userNameElem.type = "text";
userNameElem.placeholder = "Användarnamn";

const userPasswordElem = document.createElement("input");
userPasswordElem.className = "input";
userPasswordElem.type = "text";
userPasswordElem.placeholder = "Lösenord";

const logInButton = document.createElement("button");
logInButton.id = "logInButton";
logInButton.className = "button";
logInButton.innerText = "Logga in";
logInButton.onclick = inputLogin; 

// REGISTER_MENU
const registerDivElem = document.createElement("div");
registerDivElem.className = "card";


const regNameInput = document.createElement("input");
regNameInput.className = "input";
regNameInput.type = "text";
regNameInput.placeholder = "Önskat användarnamn";

const regPasswordInput = document.createElement("input");
regPasswordInput.className = "input";
regPasswordInput.type = "text";
regPasswordInput.placeholder = "Önskat lösenord";

const regEmail = document.createElement("input");
regEmail.className = "input";
regEmail.type = "text";
regEmail.placeholder = "Ange Epostadress";

const regNewsletterCheck = document.createElement("input");
regNewsletterCheck.className = "checkbox"
regNewsletterCheck.type = "checkbox";

const regLabel = document.createElement("label");
regLabel.innerText = "Prenumerera";
regLabel.id ="regLabel"

const regButton = document.createElement("button");
regButton.id = "regButton";
regButton.className = "button";
regButton.innerText = "Registrera dig";
regButton.onclick = function () {
    const username = regNameInput.value;
    const password = regPasswordInput.value;
    const email = regEmail.value;
    const subscribed = regNewsletterCheck.checked;
    const newUser = {
        username,
        password,
        email,
        subscribed,
    }
    console.log(newUser, JSON.stringify(newUser));
    // fetch("http://localhost:3000/users/adduser", {
    fetch("https://emibur-1.herokuapp.com/users/adduser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log({data})
        if(data) {
            localStorage.setItem(localStorageKey, JSON.stringify(data))
        }
        render();        
         
    })
       
}



// MAIN
let mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
document.body.appendChild(mainDiv); 

const headerLoginElem = document.createElement("h1");


const headerFailedElem = document.createElement("h1");
headerFailedElem.innerText = "Hoppsan! Nu blev det fel..";

const headerSuccessElem = document.createElement("h1");


// LOGIN
function inputLogin() {
    let inputName = userNameElem.value;
    let inputPassword = userPasswordElem.value;
    const credentials = {userName: inputName, password: inputPassword}
    console.log(`Your username is ${inputName} and your password is ${inputPassword} `);

    // fetch("http://localhost:3000/users/login", {
    fetch("https://emibur-1.herokuapp.com/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
        if(data) {
            localStorage.setItem(localStorageKey, JSON.stringify(data))
        } else {
            failedLogin = true;
        }
        console.log(data, failedLogin);

        userNameElem.value = "";
        userPasswordElem.value = ""; 
        render();
    })
}




// FOOTER
let footer = document.createElement("div");
footer.id = "footer";
document.body.appendChild(footer);

const footerText = document.createElement("p");
footerText.innerText = "Glöm inte att prenumerera på vårt fantastiska nyhetsbrev!";
footer.appendChild(footerText);


// RENDER
function render() {
    checkLogin();
    menuElem.innerText = "";
    mainDiv.innerText = "";
    header.innerText = "";
    if (isLoggedIn) {
        menuElem.appendChild(logOutButton);
        headerSuccessElem.innerText = `Hej! Nu är du inloggad.`; 
        mainDiv.appendChild(headerSuccessElem);

        mainDiv.appendChild(infoDivElem)
        infoDivElem.appendChild(regInfoText);
        infoDivElem.appendChild(regQuestionText);
        infoDivElem.appendChild(toggleCheckbox);

        
        
    } else {
        console.log(failedLogin);
        menuElem.appendChild(loginDivElem);
        loginDivElem.appendChild(userNameElem);
        loginDivElem.appendChild(userPasswordElem);
        loginDivElem.appendChild(logInButton); 

        menuElem.appendChild(registerDivElem);
        registerDivElem.appendChild(regNameInput);
        registerDivElem.appendChild(regPasswordInput);
        registerDivElem.appendChild(regEmail);
        registerDivElem.appendChild(regLabel);
        regLabel.appendChild(regNewsletterCheck);
        registerDivElem.appendChild(regButton);
     
        
        if (failedLogin) {
            console.log("Wrong! Try again");
            mainDiv.appendChild(headerFailedElem);
        }else {
            header.innerText = "Hej! Logga in eller registrera dig."
            mainDiv.appendChild(headerLoginElem);
            
            
        }
    }
}

// INITIAL RENDER
render();


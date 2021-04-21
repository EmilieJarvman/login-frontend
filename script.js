

const localStorageKey = "loggedInUserId";
let isLoggedIn = false;
let failedLogin = false;

function checkLogin() {
    isLoggedIn = JSON.parse(localStorage.getItem(localStorageKey));
    console.log({isLoggedIn});
}


// HEADER
let headerElem = document.createElement("header");
headerElem.id = "headerElem";
document.body.appendChild(headerElem);

// LOGO-IMG
const logoImage = document.createElement("img");
logoImage.src = "./ugly_logo.svg";
logoImage.alt = "ugly login logo";
headerElem.appendChild(logoImage);

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


// LOGIN_MENU
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
// regNewsletterCheck.label = "Prenumerera på nyhetsbrev"
// Hur skriva text till? 

const regButton = document.createElement("button");
regButton.id = "regButton";
regButton.className = "button";
regButton.innerText = "Registrera dig";
regButton.onclick = inputLogin; 


// MAIN
let mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
document.body.appendChild(mainDiv); 

const headerLoginElem = document.createElement("h1");
headerLoginElem.innerText = "Hej! Logga in på sidan!";

const headerFailedElem = document.createElement("h1");
headerFailedElem.innerText = "Hoppsan! Nu blev det fel..";

const headerSuccessElem = document.createElement("h1");


// LOGIN
function inputLogin() {
    let inputName = userNameElem.value;
    let inputPassword = userPasswordElem.value;
    const credentials = {userName: inputName, password: inputPassword}
    console.log(`Your username is ${inputName} and your password is ${inputPassword} `);

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
footerText.innerText = "FOOTER: This is some information you can read.";
footer.appendChild(footerText);


// RENDER
function render() {
    checkLogin();
    menuElem.innerText = "";
    mainDiv.innerText = "";
    if (isLoggedIn) {
        menuElem.appendChild(logOutButton);
        headerSuccessElem.innerText = `Hej! Nu är du inloggad.`;
        mainDiv.appendChild(headerSuccessElem);

        const regInfoText = document.createElement("p");
        regInfoText.innerHTML = "Du prenumererar (inte) på vårt nyhetsbrev";

        const regQuestionText = document.createElement("p");
        regQuestionText.innerHTML = "Klicka i om du vill (sluta) prenumerera";

        const toggleCheckbox = document.createElement("input");
        toggleCheckbox.type = "checkbox";
        toggleCheckbox.className = "checkbox";

        mainDiv.appendChild(regInfoText);
        mainDiv.appendChild(regQuestionText);
        mainDiv.appendChild(toggleCheckbox);

        // fetch("https://emibur-1.herokuapp.com/users/list")
        // .then(res => res.json())
        // .then(data => {
        
            // for(item in data) {
            //     const user = data[item];
            //     const userDiv = document.createElement("div");
            //     userDiv.innerText = `${user.username} ${user.password}, epost: ${user.email}, nr: ${user.id}`
            //     mainDiv.appendChild(userDiv)
            // }

            
            // const inputElem = document.createElement("input");
            // const buttonElem = document.createElement("button");
            // buttonElem.innerText = "Spara"
            
            // buttonElem.onclick = function() {
            //     let newUser = {
            //         username: inputElem.value,
            //         password: inputElem.value + "hemligt",
            //         email: inputElem.value + "@test.com",
            //         id: 0012345
            //     }
            //     console.log(newUser);
                
            //     fetch("https://emibur-1.herokuapp.com/users/add", {
            //         method: "post",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify(newUser)
            //     })
            //     .then(res => res.json())
            //     .then(data =>  {
            //         console.log(data)
            //         render()
        
            //     });
            // }

            // mainDiv.appendChild(inputElem);
            // mainDiv.appendChild(buttonElem);

            // inputElem.name = "username"

            

        // })
        
    } else {
        console.log(failedLogin);
        menuElem.appendChild(userNameElem);
        menuElem.appendChild(userPasswordElem);
        menuElem.appendChild(logInButton); 

        menuElem.appendChild(regNameInput);
        menuElem.appendChild(regPasswordInput);
        menuElem.appendChild(regEmail);
        menuElem.appendChild(regNewsletterCheck);
        menuElem.appendChild(regButton);
        
        
        if (failedLogin) {
            console.log("Wrong! Try again");
            mainDiv.appendChild(headerFailedElem);
        }else {
            mainDiv.appendChild(headerLoginElem);
        }
    }
}

// INITIAL RENDER
render();


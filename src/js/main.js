
var menuButton = document.querySelector('.menu-button');
var menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
    menuButton.classList.toggle('menu-button-active');
    menu.classList.toggle('header-active');
})

// todo: Проще всего добавлять эвенты прям на элемент DOM
 const passwordControl = document.querySelector('.password-control');
 if (passwordControl) {
    passwordControl.addEventListener('click', show_hide_password);
 }

// todo: правильнее назвать togglePasswordDisplay
// в js'e обычно не называют через '_'
function show_hide_password(event) {
    var input = document.getElementById('password-input');
    if (input.getAttribute('type') == 'password') {
        event.target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        event.target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
    return false;
}

var sec = 0;
var min = 30;

function refresh() {
    sec--;
    if (sec == -1) {
        sec = 59;
        min = min - 1;
    }
    if (sec <= 9) {
        sec = "0" + sec;
    }
    time = (min <= 9 ? "0" + min : min) + ":" + sec;
    inter = setTimeout("refresh()", 1000);
    if (min == '00' && sec == '00') {
        clearInterval(inter);
        alert('Таймер завершил свою работу!');
    }
}

const consentData = document.querySelector('.check-consent');
if (consentData)
    consentData.addEventListener('click', check);


function check() {
    var submit = document.getElementsByName('submit')[0];
    if (document.getElementById('politics').checked)
        submit.disabled = '';
    else
        submit.disabled = 'disabled';
}


import {
    AuthClient,
} from "@gtoru/js-client";
let baseUrl = "http://localhost:8080";
// let baseUrl = "https://" + window.location.host;

let flag = false;
sessionStorage.setItem("flag", "");

const regNewUser = document.querySelector('.reg_button');
if (regNewUser) {
    regNewUser.addEventListener('click', regUserAsync);
}

async function regUserAsync(e) {
    e.preventDefault();

    let client = new AuthClient(baseUrl);

    let personalInfo = {
        name: document.getElementById('name').value,
        birthday: new Date(document.getElementById('birthYear').value),
        address: document.getElementById('city').value,
        occupation: document.getElementById('field').value,
        employer: document.getElementById('organizationName').value
    };

    let user = {
        email: document.getElementById('mail').value,
        password: document.getElementById('password-input').value,
        personalInfo: personalInfo
    };
    await client.registerAsync(user);
    alert("Пользователь успешно зарегестрирован");
    document.location.href = "testing.html";
}

const authUser = document.querySelector('.popup-button');
if (authUser) {
    authUser.addEventListener('click', authUserAsync);
}

let email;

async function authUserAsync(e) {
    e.preventDefault();
    let client = new AuthClient(baseUrl);
    email = document.getElementById('login-email').value;
    let pass = document.getElementById('password-input').value;
    
    const response = await client.authenticateAsync(email, pass);
    
    if (response.responseCode >= 400) {
        alert("Что-то пошло не так. Повторите попытку.");
    }
    else {
        sessionStorage.setItem("flag", "1");
        sessionStorage.setItem("login", document.getElementById('login-email').value);
        alert("Пользователь успешно авторизован");
        alert(!!sessionStorage.getItem("login"));
        document.location.href = "testing.html";
        // enteringClick();
    }
}

// function enteringClick() {
    if (!!sessionStorage.getItem("flag")) {
        alert("666");
        document.getElementById("enteringBtnId").innerHTML = sessionStorage.getItem("login");
    }
// };

console.log("FUCK");
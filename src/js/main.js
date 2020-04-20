
var menuButton = document.querySelector('.menu-button');
var menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
    menuButton.classList.toggle('menu-button-active');
    menu.classList.toggle('header-active');
})

 const passwordControl = document.querySelector('.password-control');
 if (passwordControl) {
    passwordControl.addEventListener('click', show_hide_password);
 }

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
// let baseUrl = "http://localhost:8080";
let baseUrl = "https://" + window.location.host;

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
    localStorage.setItem("flag", "1");
    localStorage.setItem("login", document.getElementById('mail').value);
    localStorage.setItem("auth-hide","1");
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
        localStorage.setItem("flag", "1");
        localStorage.setItem("login", document.getElementById('login-email').value);
        alert("Пользователь успешно авторизован");
        localStorage.setItem("auth-hide", "1");
        if (email == "admin") {
            localStorage.setItem("flagAdmin", "1");
            document.location.href = "/admin.html";
        }
        else {
            document.location.href = "/testing.html";
        }
    }
}

// function enteringClick() {
    if (!!localStorage.getItem("flag")) {
        document.getElementById("enteringBtnId").innerHTML = localStorage.getItem("login");
    }
    let path1 = "http://" + document.location.host + "/index.html";
    let path2 = "https://" + document.location.host + "/index.html";
    if (!!localStorage.getItem("auth-hide") &&
            (document.location.href == path1 || document.location.href == path2)) {
        document.getElementById("authentication").style.visibility = "hidden";
    }
    // if (!!localStorage.getItem("flagAdmin")) {
    //     document.getElementById("test-examples").style.visibility = "hidden";
    //     document.getElementById("goto-test").style.visibility = "hidden";
    //     document.getElementById("get-information").style.visibility = "hidden";
    //     document.getElementById("download-app").style.visibility = "hidden";
    // }
// };

const outUser = document.querySelector('.getOut');
if (outUser) {
    outUser.addEventListener('click', outAuthUser);
}

function outAuthUser() {
    if (!!localStorage.getItem("flag")) {
        document.location.href = "index.html";
        localStorage.clear();
        document.getElementById("authentication").style.visibility = "visible";
    }
}



console.log("FUCK");







import {
    TaskClient,
    AuthToken
} from "@gtoru/js-client";

const addTask = document.querySelector('.add-task-button');
if (addTask) {
    addTask.addEventListener('click', addNewTask);
}

async function addNewTask() {

    function getAnswer() {
        let one = document.getElementById('checkAnswer1');
        if (one.checked) {
            return document.getElementById('answer1').value;
        }
        one = document.getElementById('checkAnswer2');
        if (one.checked) {
            return document.getElementById('answer2').value;
        }
        one = document.getElementById('checkAnswer3');
        if (one.checked) {
            return document.getElementById('answer3').value;
        }
        one = document.getElementById('checkAnswer4');
        if (one.checked) {
            return document.getElementById('answer4').value;
        }
    }

    let task;
    if (document.getElementById('choose-first').checked) {
        task = {
            answer: getAnswer(),
            question: document.getElementById('getTaskText').value,
            taskId: "",
            variants: [
                document.getElementById('answer1').value,
                document.getElementById('answer2').value,
                document.getElementById('answer3').value,
                document.getElementById('answer4').value
            ],
            weight: +document.getElementById('input-weight').value
        };
    } else if (document.getElementById('choose-second').checked) {
        task = {
            answer: document.getElementById('single-answer').value,
            question: document.getElementById('getTaskText').value,
            taskId: "",
            variants: [document.getElementById('single-answer').value],
            weight: +document.getElementById('input-weight').value
        }
    } else if (document.getElementById('choose-third').checked) {
        task = {
            answer: document.querySelectorAll(".four-answers"),
            question: document.getElementById('getTaskText').value,
            taskId: "",
            variants: document.querySelectorAll(".four-answers"),
            weight: +document.getElementById('input-weight').value
        }
    }

    let taskClient = new TaskClient(baseUrl);
    let client = new AuthClient(baseUrl);
    const authentication = await client.authenticateAsync("admin", "admin");
    let token = authentication.responseData;
    console.log(task);
    let taskCreation = await taskClient.createTaskAsync(task, token);

    if (taskCreation.responseCode == 200) {
        alert("Задание успешно добавлено");
    } else {
        alert("Произошла ошибка. Повторите попытку еще раз");
    }
}

const finishAdd = document.querySelector('.finish-task-button');
if (finishAdd) {
    finishAdd.addEventListener('click', function () {
        document.location.href = "index.html";
    });
}

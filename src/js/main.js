
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
let baseUrl = "http://localhost:8080";
// let baseUrl = "https://" + window.location.host;

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

if (!!localStorage.getItem("flag")) {
    document.getElementById("enteringBtnId").innerHTML = localStorage.getItem("login");
}

if (!!localStorage.getItem("auth-hide") &&
        (window.location.pathname == '/index.html')) {
    document.getElementById("authentication").style.visibility = "hidden";
}

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



//console.log("FUCK");


// task

import {
    TaskClient,
    TaskId
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

    if (localStorage.getItem("task") == null) {
        let taskArray = [taskCreation.responseData];
        localStorage.setItem("task", JSON.stringify(taskArray));
    } else {
        let taskArray = JSON.parse(localStorage.getItem("task"));
        taskArray[taskArray.length] = taskCreation.responseData;
        localStorage.setItem("task", JSON.stringify(taskArray));
    }
}




// quiz

import {
    QuizClient
} from "@gtoru/js-client";

const startQuiz = document.querySelector('.try_test_button');
if (startQuiz) {
    startQuiz.addEventListener('click', quizing);
}


async function quizing() {

    let client = new AuthClient(baseUrl);
    const authentication = await client.authenticateAsync("admin", "admin");
    let token = authentication.responseData;

    let quizCl = new QuizClient(baseUrl);
    let allQuizes = await quizCl.getAllQuizzesAsync(token);
<<<<<<< HEAD
    let quiz = await quizCl.getQuizAsync(allQuizes.responseData[0].quizId,token);
=======
    let quiz = await quizCl.getQuizAsync(allQuizes.responseData[5].quizId,token);
>>>>>>> master

    let tasks = quiz.responseData.tasks;

    localStorage.setItem("question", JSON.stringify(tasks));
    localStorage.setItem("question-number", 0);

    document.location.href = "question.html";
}

const addQuiz = document.querySelector('.add-quiz-button');
if (addQuiz) {
    addQuiz.addEventListener('click', createQuizTitle);
}

async function createQuizTitle() {
    localStorage.setItem("qTitle", document.getElementById('new-quiz-title').value);
    document.location.href = "addTask.html";
}

const addQuizFinish = document.querySelector('.finish-task-button');
if (addQuizFinish) {
    addQuizFinish.addEventListener('click', createQuiz);
}

async function createQuiz() {
    let client = new AuthClient(baseUrl);
    const authentication = await client.authenticateAsync("admin", "admin");
    let token = authentication.responseData;

    let quizClient = new QuizClient(baseUrl);
    const creatingQuiz = await quizClient.createQuizAsync(
        localStorage.getItem("qTitle"),
        JSON.parse(localStorage.getItem("task")),
        token
    );
    if (creatingQuiz.responseCode == 200) {
        alert("Тест добавлен!");
        document.location.href = "addTask.html";
    } else {
        alert("Что-то пошло не так.");
    }
    document.location.href = "index.html";
}


// answering

import {
    UserClient,
    ClientBase
} from "@gtoru/js-client";



let next = document.querySelector(".goRight");
if (next) {
    next.addEventListener('click', answerQuestion);
}

// next.forEach(element => {
//     element.addEventListener('click', answerQuestion);
// });

const answerQ = document.querySelector(".btn-outline-submit");
if (answerQ) {
    answerQ.addEventListener('click', () => {
        if (location.pathname == "/question_2var.html") {
            let yourAnswer = document.getElementById('single-quest').value;
            if (!!yourAnswer) {
                let createAns = {
                    taskNumber: (+localStorage.getItem("question-number")) - 1,
                    answer: yourAnswer
                };
                if (JSON.parse(localStorage.getItem("answerArray")) == null) {
                    let arr = [createAns];
                    localStorage.setItem("answerArray", JSON.stringify(arr));
                } else {
                    let arr = JSON.parse(localStorage.getItem("answerArray"));
                    arr[arr.length] = createAns;
                    localStorage.setItem("answerArray", JSON.stringify(arr));
                }
                answerQuestion();
            }
        }
        answerQuestion();
    })
}


async function answerQuestion() {
    let taskAr = JSON.parse(localStorage.getItem("question"));
    let ind = +localStorage.getItem("question-number");
    if (ind < 0) {
        return;
    }
    if (ind == taskAr.length) {

        let auCl = new AuthClient(baseUrl);
        const authentication = await auCl.authenticateAsync("admin", "admin");
        let token = authentication.responseData;

        let userid = (await auCl.getSessionInfoAsync(token)).responseData.userId;
        let zzz = new UserClient(baseUrl);
        


        document.location.href = "result.html";
        return;
    }
    if (taskAr[ind].variants.length == 4) {
        document.location.href = 'question.html';
    } else if (taskAr[ind].variants.length == 1) {
        document.location.href = 'question_2var.html';
    }
}

const prev = document.querySelector(".goLeft");
if (prev) {
    prev.addEventListener('click', goBack);
}

async function goBack() {
    let taskAr = JSON.parse(localStorage.getItem("question"));
    let ind = +localStorage.getItem("question-number");
    if (ind == 0) {
        return;
    }
    ind -= 2;
    localStorage.setItem("question-number", ind);
    if (taskAr[ind].variants.length == 4) {
        document.location.href = 'question.html';
    } else if (taskAr[ind].variants.length == 1) {
        document.location.href = 'question_2var.html';
    }
}

if (window.location.pathname == "/question.html") {   
    let taskAr = JSON.parse(localStorage.getItem("question"));
    let ind = +localStorage.getItem("question-number");
    document.getElementById('formulation').innerHTML = taskAr[ind].question;
    document.getElementById('answer1').innerHTML = taskAr[ind].variants[0];
    document.getElementById('answer2').innerHTML = taskAr[ind].variants[1];
    document.getElementById('answer3').innerHTML = taskAr[ind].variants[2];
    document.getElementById('answer4').innerHTML = taskAr[ind].variants[3];
    ind += 1;
    localStorage.setItem("question-number", ind);
    //console.log(typeof(document.getElementById('answer1').innerHTML));
}

if (window.location.pathname == "/question_2var.html") {
    let taskAr = JSON.parse(localStorage.getItem("question"));
    let ind = +localStorage.getItem("question-number");
    document.getElementById('formulation').innerHTML = taskAr[ind].question;
    ind += 1;
    localStorage.setItem("question-number", ind);
}

// send an answer

let ans_ = document.querySelectorAll(".btn-outline-answer");
if (ans_.length != 0) {
    ans_.forEach(element => {
        element.addEventListener('click', () => {
            let createAns = {
                taskNumber: (+localStorage.getItem("question-number")) - 1,
                answer: element.innerHTML
            };
            if (JSON.parse(localStorage.getItem("answerArray")) == null) {
                let arr = [createAns];
                localStorage.setItem("answerArray", JSON.stringify(arr));
            } else {
                let arr = JSON.parse(localStorage.getItem("answerArray"));
                arr[arr.length] = createAns;
                localStorage.setItem("answerArray", JSON.stringify(arr));
            }
            answerQuestion();
        })
    })
}
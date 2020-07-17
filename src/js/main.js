

$(document).ready(function () {
    $("#menu").on("click", "button", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });
});

const modalAuth = document.querySelector('.modal-auth'),
    getIn = document.querySelector('.get-in'),
    informationBtn = document.querySelector('.information-btn');

const closeModal = event => {
    const target = event.target;
    if (target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape') {
        modalAuth.classList.add('hide');
        document.removeEventListener('keydown', closeModal);
    }
    if (event.code === 'Enter') {
        document.addEventListener('keyup', authUserAsync);
    }
};

if (getIn) {
    getIn.addEventListener('click', () => {
        modalAuth.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    });
}

if (modalAuth) {
    modalAuth.addEventListener('click', closeModal);
}

let menuButton = document.querySelector('.menu-button');
let menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
    menuButton.classList.toggle('menu-button-active');
    menu.classList.toggle('header-active');
});

const passwordControl = document.querySelector('.password-control');
 if (passwordControl) {
    passwordControl.addEventListener('click', show_hide_password);
};

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
};

const consentData = document.querySelector('.check-consent');
if (consentData)
    consentData.addEventListener('click', check);


function check() {
    var submit = document.getElementsByName('submit')[0];
    if (document.getElementById('politics').checked)
        submit.disabled = '';
    else
        submit.disabled = 'disabled';
};

import {
    AuthClient,
} from "@gtoru/js-client";
let baseUrl = "http://localhost:8080";
// let baseUrl = "https://" + window.location.host;

const regNewUser = document.querySelector('.reg_button');
if (regNewUser) {
    regNewUser.addEventListener('click', regUserAsync);
};

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
    localStorage.setItem("setLogin", document.getElementById('mail').value);
    localStorage.setItem("setPassword", document.getElementById('password-input').value);
    await client.registerAsync(user);
    alert("Пользователь успешно зарегестрирован");
    localStorage.setItem("flag", "1");
    localStorage.setItem("login", document.getElementById('mail').value);
    localStorage.setItem("auth-hide","1");
    document.location.href = "testing.html";
};

const authUser = document.querySelector('.popup-button');
if (authUser) {
    authUser.addEventListener('click', authUserAsync);
};

let email;

async function authUserAsync(e) {
    e.preventDefault();
    let client = new AuthClient(baseUrl);
    email = document.getElementById('login-email').value;
    let pass = document.getElementById('password-input').value;
    if (email == "admin" && pass == "admin") {
        localStorage.setItem("admin-only","1");
    };
    modalAuth.classList.add('hide');

    localStorage.setItem("setLogin",email);
    localStorage.setItem("setPassword",pass);
    
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
    };
};

if (!!localStorage.getItem("admin-only")) {
    document.getElementById('admin-only').hidden = false;
};

let adminPage = document.getElementById('admin-only');
if (adminPage && !document.getElementById('admin-only').hidden) {
    adminPage.addEventListener('click', () => {
        location.href = "admin.html";
    })
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
        modalAuth.classList.add('hide');
        document.location.href = "index.html";
        localStorage.clear();
        document.getElementById("authentication").style.visibility = "visible";
    }
}

//console.log("FUCK");

// task
import {
    TaskClient,
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
    // const authentication = await client.authenticateAsync("admin","admin");
    const authentication = await client.authenticateAsync(localStorage.getItem("setLogin"), localStorage.getItem("setPassword"));
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
    // чтобы отделить пробный квиз от настоящего (временное рещение)
    localStorage.setItem("startRealQuiz","1");
    startQuiz.addEventListener('click', () => {
        location.href = "chooseQuiz.html";
    });
}

async function quizing() {

    

    let client = new AuthClient(baseUrl);

    if (localStorage.getItem("setLogin") == null || localStorage.getItem("setPassword") == null) {
        alert("Сначала вам нужно зарегистрироваться!");
        location.href = "index.html";
        return;
    }
    
    // const authentication = await client.authenticateAsync("admin", "admin");

    const authentication = await client.authenticateAsync(localStorage.getItem("setLogin"), localStorage.getItem("setPassword"));
    let token = authentication.responseData;


    // начинаем сессию
    let userid = (await client.getSessionInfoAsync(token)).responseData.userId;
    let getTasks = new UserClient(baseUrl);
    let quizid = localStorage.getItem(localStorage.getItem("current"));
    let start = await getTasks.startNewSessionAsync(userid, quizid, token);

    
    console.log(start);
    console.log((await client.getSessionInfoAsync(token)).responseData);




    //let quizCl = new QuizClient(baseUrl);
    
    //let quiz = await quizCl.getQuizAsync(localStorage.getItem(localStorage.getItem("current")), token);

    // alert(quiz);
    //console.log(quiz);
    //alert(quiz.responseData);


    //let tasks = quiz.responseData.tasks;

    //localStorage.setItem("question", JSON.stringify(tasks));


    


    //localStorage.setItem("question-number", 0);

    //document.location.href = "question.html";
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

    if (localStorage.getItem("setLogin") == null || localStorage.getItem("setPassword") == null) {
        alert("Сначала вам нужно зарегистрироваться!");
        location.href = "index.html";
        return;
    }
    let client = new AuthClient(baseUrl);
    // const authentication = await client.authenticateAsync("admin", "admin");

    const authentication = await client.authenticateAsync(localStorage.getItem("setLogin"), localStorage.getItem("setPassword"));
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
} from "@gtoru/js-client";

let next = document.querySelector(".goRight");
if (next) {
    next.addEventListener('click', answerQuestion);
}

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
                // answerQuestion();
            }
        } else {
            let createAns = {
                taskNumber: (+localStorage.getItem("question-number")) - 1,
                answer: ""
            };
            if (JSON.parse(localStorage.getItem("answerArray")) == null) {
                let arr = [createAns];
                localStorage.setItem("answerArray", JSON.stringify(arr));
            } else {
                let arr = JSON.parse(localStorage.getItem("answerArray"));
                arr[arr.length] = createAns;
                localStorage.setItem("answerArray", JSON.stringify(arr));
            }
            // answerQuestion();
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

    if (localStorage.getItem("setLogin") == null || localStorage.getItem("setPassword") == null) {
        alert("Сначала вам нужно зарегистрироваться!");
        location.href = "index.html";
        return;
    }
    let client = new AuthClient(baseUrl);
    // const authentication = await client.authenticateAsync("admin", "admin");

    const authentication = await client.authenticateAsync(localStorage.getItem("setLogin"), localStorage.getItem("setPassword"));
    let token = authentication.responseData;

        let userid = (await client.getSessionInfoAsync(token)).responseData.userId;
        let addAns = new UserClient(baseUrl);
        let quizid = localStorage.getItem(localStorage.getItem("current"));

        await addAns.startNewSessionAsync(userid, quizid, token);

        console.log(JSON.parse(localStorage.getItem("answerArray")));
        let addAnsResp = await addAns.addAnswerAsync(userid, JSON.parse(localStorage.getItem("answerArray")), token);
        if (addAnsResp.responseCode == 200) {
            alert("Результаты отправлены");
        } else {
            alert("К сожалению, что-то пошло не так");
            return;
        }
        
        await addAns.endSessionAsync(userid, token);

        let _res = await addAns.getResultsAsync(userid, token);
        let _resData = _res.responseData;
        let _getRes = _resData[_resData.length - 1].result;
        localStorage.setItem("quizResult", _getRes);

        localStorage.setItem("startRealQuiz","");
        document.location.href = "result.html";
        return;
    }
    if (taskAr[ind].variants.length == 4) {
        document.location.href = 'question.html';
    } else if (taskAr[ind].variants.length == 1) {
        document.location.href = 'question_2var.html';
    }
}

// getting results

if (location.pathname == "/result.html") {
    document.getElementById("points-number").innerHTML = localStorage.getItem("quizResult");
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

    if (localStorage.getItem("timer") == null) {
        localStorage.setItem("timer", 1800);
    } 
    window.addEventListener('load', timer);
    setInterval(timer, 1000);

    let taskAr = JSON.parse(localStorage.getItem("question"));
    let ind = +localStorage.getItem("question-number");
    document.getElementById('task-number').innerHTML = ind+1;
    document.getElementById('formulation').innerHTML = taskAr[ind].question;
    document.getElementById('answer1').innerHTML = taskAr[ind].variants[0];
    document.getElementById('answer2').innerHTML = taskAr[ind].variants[1];
    document.getElementById('answer3').innerHTML = taskAr[ind].variants[2];
    document.getElementById('answer4').innerHTML = taskAr[ind].variants[3];
    ind += 1;
    localStorage.setItem("question-number", ind);
}

if (window.location.pathname == "/question_2var.html") {

    if (localStorage.getItem("timer") == null) {
        localStorage.setItem("timer", 1800);
    }

    window.addEventListener('load', timer);
    setInterval(timer, 1000);

    let taskAr = JSON.parse(localStorage.getItem("question"));
    let ind = +localStorage.getItem("question-number");
    document.getElementById('task-number2').innerHTML = ind + 1;
    document.getElementById('formulation').innerHTML = taskAr[ind].question;
    ind += 1;
    localStorage.setItem("question-number", ind);
}

// send an answer
let ans_ = document.querySelectorAll("._btn-outline-answer_");
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
                let flag = false; let index;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].taskNumber == createAns.taskNumber) {
                        flag = true;
                        index = i;
                    }
                }
                if (flag) {
                    arr[index] = createAns;
                } else {
                    arr[arr.length] = createAns;
                }
                localStorage.setItem("answerArray", JSON.stringify(arr));
            }
            answerQuestion();
        })
    })
}

if (location.pathname == "/test_page.html") {
    if (localStorage.getItem("timer") == null) {
        localStorage.setItem("timer", 1800);
    }
    window.addEventListener('load', timer);
    setInterval(timer, 1000);
}

async function timer() {
    
    let time = +localStorage.getItem("timer");
    document.getElementById('timer').innerHTML = Math.floor(time / 60) + " : " + time % 60;
    localStorage.setItem("timer", time-1);
    if (time < 0) {
        location.href = "index.html";
        alert("К сожалению, время вышло.");
    }
    else if (time == 0) {
        alert("К сожалению, время вышло.");
        localStorage.setItem("question-number", JSON.parse(localStorage.getItem("question")).length);
        answerQuestion();
    }
}

let knopkaAr = document.querySelectorAll(".knopka");
knopkaAr.forEach(element => {
    if (!!localStorage.getItem("startRealQuiz")) {
        let knopkaTaskN = element.innerHTML;
        element.addEventListener('click', () => {
            let tasks = JSON.parse(localStorage.getItem("question"));
            localStorage.setItem("question-number", knopkaTaskN - 1);
            if (tasks[knopkaTaskN - 1].variants == 1) {
                location.href = "/question_2var.html";
            } else {
                location.href = "/question.html";
            }
            answerQuestion();
        })
    }
});

// выбор квиза

if (location.pathname == "/chooseQuiz.html") {
    insertQuizTitles();
}

async function insertQuizTitles() {

    if (localStorage.getItem("setLogin") == null || localStorage.getItem("setPassword") == null) {
        alert("Сначала вам нужно зарегистрироваться!");
        location.href = "index.html";
        return;
    }
    let client = new AuthClient(baseUrl);
    // const authentication = await client.authenticateAsync("admin", "admin");

    const authentication = await client.authenticateAsync(localStorage.getItem("setLogin"), localStorage.getItem("setPassword"));
    let token = authentication.responseData;


    let quizCl = new QuizClient(baseUrl);
    
    let getQuizes = await quizCl.getAllQuizzesAsync(token);
    let allQuizes = getQuizes.responseData;
    console.log(allQuizes);
    let xxx = document.getElementById('availableQuizzez-list');
    if (xxx) {
        allQuizes.forEach(element => {
            localStorage.setItem(element.quizName, element.quizId);
            xxx.insertAdjacentHTML('beforeend', '<div class="_quizing_">' + element.quizName + '</div><br>');
        });
    }
    let _yy = document.querySelectorAll("._quizing_");
    _yy.forEach(element => {
        element.style.cursor = "pointer";
        element.addEventListener('click', () => dop_quizing(element.innerHTML));
    });
}

async function dop_quizing(elem) {
    localStorage.setItem("current", elem);
    quizing();
}

// получение сертификата
let getSert = document.querySelector(".get-sertificate");
if (getSert) {
    getSert.addEventListener('click', getSertificate);
}

async function getSertificate() {
    if (document.getElementById('sert-option2').checked) {
        alert('К сожалению, в условиях коронавируса невозможно плучить очно сертификат. В ближайшее время он будет выслан вам по электронной почте');
    } else {
        alert('Сертификат в ближайшее время будет вам выслан!');
    }
    location.href = "index.html";
}

// количество пользователей

if (location.pathname == "/admin.html") {
    getUserCount();
}

async function getUserCount() {
    let client = new AuthClient(baseUrl);
    // const authentication = await client.authenticateAsync("admin", "admin");

    const authentication = await client.authenticateAsync(localStorage.getItem("setLogin"), localStorage.getItem("setPassword"));
    let token = authentication.responseData;
    let userClient = new UserClient(baseUrl);
    let usercount = await userClient.getUserCountAsync(token);
    document.getElementById("number-of-users").innerHTML = usercount.responseData;
}
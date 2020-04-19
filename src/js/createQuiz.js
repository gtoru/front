
import {
    TaskClient,
    Task,
} from "@gtoru/js-client";

const baseUrl = "http://localhost:8080";
const token = "b9d8b0ad904e1798554ac8bf2626057c795146d0";
let ans;
let one = document.getElementById("checkAnswer1");
if (one.checked) {
    ans = document.getElementById('answer1').value;
}
one = document.getElementById("checkAnswer2");
if (one.checked) {
    ans = document.getElementById('answer2').value;
}
one = document.getElementById("checkAnswer3");
if (one.checked) {
    ans = document.getElementById('answer3').value;
}
one = document.getElementById("checkAnswer4");
if (one.checked) {
    ans = document.getElementById('answer4').value;
}

alert(ans);

let task = {
    answer: ans,
    question: document.getElementById('getTaskText').value,
    taskId: "",
    variants: [
        document.getElementById('answer1').value,
        document.getElementById('answer2').value,
        document.getElementById('answer3').value,
        document.getElementById('answer4').value
    ]
};

const addTask = document.querySelector('.add-task-button');
if (addTask) {
    addTask.addEventListener('click', addNewTask);
}
async function addNewTask() {
    let taskClient = new TaskClient(baseUrl);
    let taskCreation = await taskClient.createTaskAsync(task, token);
    if (taskCreation.responseCode() == 200) {
        alert("Задание успешно добавлено");
    }
    else {
        alert ("Произошла ошибка. Повторите попытку еще раз");
    }
}

alert("123");
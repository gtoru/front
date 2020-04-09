// $(document).ready(function(){
//  $('.header').height($(window).height());
// })
var menuButton = document.querySelector('.menu-button');
var menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
    menuButton.classList.toggle('menu-button-active');
    menu.classList.toggle('header-active');
})

// todo: Проще всего добавлять эвенты прям на элемент DOM
 const passwordControl = document.querySelector('.password-control');
 passwordControl.addEventListener('click', show_hide_password);

// todo: правильнее назвать togglePasswordDisplay
// в js'e обычно не называют через '_'
function show_hide_password(event) {
    //console.log(target)
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

var sec = 00;
var min = 30;

function refresh() {
    sec--;
    if (sec == -01) {
        sec = 59;
        min = min - 1;
    } else {
        // todo: кажется эта строчка не нужна
        min = min;
    }
    if (sec <= 9) {
        sec = "0" + sec;
    }
    time = (min <= 9 ? "0" + min : min) + ":" + sec;
    // todo: getElementById это DOM API, эта функция всегда есть, если ты работаешь в браузере
    if (document.getElementById) {
        //todo: а откуда timer берется? не нашел
        timer.innerHTML = time;
    }
    // todo: setTimeout(refresh, 1000);
    inter = setTimeout("refresh()", 1000);
    if (min == '00' && sec == '00') {
        // todo: секунды у тебя уже '00', раз прошло условие
        // и лучше проверку делать до запуска очередного setTimeout
        sec = "00";
        clearInterval(inter);
        alert('Таймер завершил свою работу!');
    }
}

const consentData = document.querySelector('.check-consent');
consentData.addEventListener('click', check);


function check() {
    var submit = document.getElementsByName('submit')[0];
    if (document.getElementById('politics').checked)
        submit.disabled = '';
    else
        submit.disabled = 'disabled';
}

function getBaseUrl() {
    let base_url = window.location.href;
    console.log(base_url);
}
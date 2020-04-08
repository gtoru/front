
import { AuthClient } from "@gtoru/js-client";

let xhr = new XMLHttpRequest();

let client = new AuthClient();


registration.onclick = function() {
    // todo: не обязатльно так называть имена, let определяет область видимости внутри данной функции
    // поэтом конфликтов имен скорее всего не будет
    let _name = document.getElementById('name').value;
    let _birthYear = document.getElementById('birthYear').value;
    let _mail = document.getElementById('mail').value;
    let _password = document.getElementById('password-input').value;
    let _city = document.getElementById('city').value;
    let _organizationName = document.getElementById('organizationName').value;
    let _field = document.getElementById('field').value;

    const email = _mail;
    const password = _password;
    // todo: если это будет отправка на сервер, то можещь собрать все переменные
    // name, mail, password и т.д. и сунуть их в объект, например
    // const registrationInfo = {name, mail, password, ...} это создаст объект с этими полями (см. деструктуризация)


    document.location.href = "testing.html";
}
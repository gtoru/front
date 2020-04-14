
// const {
//     AuthClient
// } = require('gtoru/js-client')();

let _client = require('gtoru/js-client')();
// _client.email;

// import {
//     AuthClient
// } from "@gtoru/js-client";

let xhr = new XMLHttpRequest();

let client = new AuthClient();


registration.onclick = function() {
    let _name = document.getElementById('name').value;
    let _birthYear = document.getElementById('birthYear').value;
    let _mail = document.getElementById('mail').value;
    let _password = document.getElementById('password-input').value;
    let _city = document.getElementById('city').value;
    let _organizationName = document.getElementById('organizationName').value;
    let _field = document.getElementById('field').value;
    // const email = _mail;
    // const password = _password;
    document.location.href = "testing.html";
}
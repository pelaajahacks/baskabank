const USERNAME = "zwiebel";
const PASSWORD_HASH = btoa("zwiebel#42"); // simple client-side obfuscation

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
}

function setCookie(key, value) {
    document.cookie = `${key}=${value}; path=/`;
}

function validate(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (username !== USERNAME) {
        error.textContent = "Unknown user. Double-check the codename.";
        return false;
    }

    if (btoa(password) !== PASSWORD_HASH) {
        error.textContent = "That passphrase doesn't match. Try the onion combo.";
        return false;
    }

    error.textContent = "";
    setCookie("logged_in", true);
    setCookie("last_login", new Date().toISOString());
    window.location.replace("/baskabank/logged_in");
    return false;
}

function togglePassword() {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
}

function check_if_logged_in_already() {
    if (getCookie("logged_in")) {
        window.location.replace("/baskabank/logged_in");
    }
}

check_if_logged_in_already();

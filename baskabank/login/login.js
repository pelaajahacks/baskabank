function validate() {
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

    if(username=="aki") {
        document.cookie = "logged_in=true";
        window.location.replace("/baskabank/logged_in");   
        return false;

    }

    else {
        alert("bad, dosent even know password/username")
    }

}

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
  }

function check_if_logged_in_already() {
    if(getCookie("logged_in")) {
        window.location.replace("/baskabank/logged_in");   
    }
}

check_if_logged_in_already()
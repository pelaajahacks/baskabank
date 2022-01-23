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


function check_if_safe() {
    if (!getCookie("logged_in")) {
        window.location.replace("/login");   
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
    return res;
  }

if(!getCookie("money")) {
    var rahet = 43532;
}
else {
    var rahet = getCookie("money");
}

console.log(!getCookie("money"));

function checkISP() {
	let apiKey = '9313f7b66cab48f09c9b60d54fac469a';
    $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation-with-confidence?key=' + apiKey, function(data) {
        var a = data.network.organisation.toLowerCase();
        if (a.includes("espoo")) {
            document.location = "/baskabank/error";
            document.cookie = "logged_in=false"
        } else {
            console.log("Pro ISP");
        }
    });
}


function update_OnLoad() {
    checkISP()
    var raha_span = document.getElementById("rahet_span");
    raha_span.innerHTML = rahet;
    console.log(raha_span, rahet);
    document.cookie = "money=" + rahet;

    document.cookie = "cubase_lisens=" + cubase_lisens;
    document.cookie = "Chromebook=" + Chromebook;
    document.cookie = "Tuoli_kpls=" + Tuoli_kpls;
    document.cookie = "Pöytä_kpls=" + Pöytä_kpls;
    document.cookie = "Maski=" + Maski;

    var cubase_span = document.getElementById("cubase_span")
    var chrome_span = document.getElementById("chrome_span")
    var tuoli_span = document.getElementById("tuoli_span")
    var pöytä_span = document.getElementById("pöytä_span")
    var maski_span = document.getElementById("maski_span")

    cubase_span.innerHTML = cubase_lisens
    chrome_span.innerHTML = Chromebook
    tuoli_span.innerHTML = Tuoli_kpls
    pöytä_span.innerHTML = Pöytä_kpls
    maski_span.innerHTML = Maski
}

if(!getCookie("cubase_lisens")) {
    var cubase_lisens = 0;
    document.cookie = "cubase_lisens=0";
}
if(getCookie("cubase_lisens")) {
    var cubase_lisens = getCookie("cubase_lisens");
}

if(!getCookie("Tuoli_kpls")) {
    var Tuoli_kpls = 0;
    document.cookie = "Tuoli_kpls=0";
}
if(getCookie("Tuoli_kpls")) {
    var Tuoli_kpls = getCookie("Tuoli_kpls");
}

if(!getCookie("Pöytä_kpls")) {
    var Pöytä_kpls = 0;
    document.cookie = "Pöytä_kpls=0";
}
if(getCookie("Pöytä_kpls")) {
    var Pöytä_kpls = getCookie("Pöytä_kpls");
}

if(!getCookie("Chromebook")) {
    var Chromebook = 0;
    document.cookie = "Chromebook=0";
}
if(getCookie("Chromebook")) {
    var Chromebook = getCookie("Chromebook");
}

if(!getCookie("Maski")) {
    var Maski = 0
    document.cookie = "Maski=0";
}
if(getCookie("Maski")) {
    var Maski = getCookie("Maski");
}

function ripRahat(moneyAmount, item) {
    var raha_span = document.getElementById("rahet_span");
    if(item !== 5) {
        rahet -= moneyAmount;
    }
    
    raha_span.innerHTML = rahet;
    document.cookie = "money=" + rahet;

    if(item == 0) {
        cubase_lisens++
    }
    if(item == 1) {
        Chromebook++
    }
    if(item == 2) {
        Tuoli_kpls++
    }
    if(item == 3) {
        Pöytä_kpls++
    }
    if(item == 4) {
        Maski++
    }
    if(item == 5) {
        var x = Number(rahet) + Number(moneyAmount)
        rahet = x
        console.log(x)
    }

    document.cookie = "cubase_lisens=" + cubase_lisens;
    document.cookie = "Chromebook=" + Chromebook;
    document.cookie = "Tuoli_kpls=" + Tuoli_kpls;
    document.cookie = "Pöytä_kpls=" + Pöytä_kpls;
    document.cookie = "Maski=" + Maski;

    var cubase_span = document.getElementById("cubase_span")
    var chrome_span = document.getElementById("chrome_span")
    var tuoli_span = document.getElementById("tuoli_span")
    var pöytä_span = document.getElementById("pöytä_span")
    var maski_span = document.getElementById("maski_span")

    cubase_span.innerHTML = cubase_lisens
    chrome_span.innerHTML = Chromebook
    tuoli_span.innerHTML = Tuoli_kpls
    pöytä_span.innerHTML = Pöytä_kpls
    maski_span.innerHTML = Maski
}



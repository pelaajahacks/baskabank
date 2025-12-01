const purchaseOptions = [
    { key: "cubase_lisens", name: "Cubase Pro License", price: 500, emoji: "🎚️", description: "DAW upgrade for the studio." },
    { key: "Chromebook", name: "Chromebook", price: 72, emoji: "💻", description: "Extra device for quick browsing." },
    { key: "Tuoli_kpls", name: "Ergonomic chair", price: 30, emoji: "🪑", description: "Comfort for long sessions." },
    { key: "Pöytä_kpls", name: "Adjustable desk", price: 69, emoji: "🧰", description: "Room for all the gadgets." },
    { key: "Maski", name: "Mask pack (50)", price: 5, emoji: "😷", description: "Stay safe, stay productive." },
    { key: "studio_monitors", name: "Studio monitors", price: 350, emoji: "🔊", description: "Crisp reference sound." },
    { key: "ambient_led", name: "Ambient LED strips", price: 22, emoji: "🌈", description: "Mood lighting upgrade." },
    { key: "coffee_tokens", name: "Coffee tokens", price: 12, emoji: "☕", description: "Energy for the night shift." },
    { key: "green_plants", name: "Office plants", price: 18, emoji: "🌿", description: "Fresh air and good vibes." },
    { key: "hallitus_grant", name: "Ask government for cash", price: -1000, emoji: "💸", description: "Magically adds funds." }
];

const defaultBalance = 43532;
let rahet = 0;
const inventoryState = {};

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
}

function setCookie(key, value) {
    document.cookie = `${key}=${value}; path=/`;
}

function storageGet(key, fallback = 0) {
    const rawLocal = localStorage.getItem(key);
    const rawCookie = getCookie(key);
    const raw = rawLocal ?? rawCookie;
    if (raw === undefined || raw === null || raw === "") return fallback;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function storageSet(key, value) {
    localStorage.setItem(key, value);
    setCookie(key, value);
}

function check_if_safe() {
    if (!getCookie("logged_in")) {
        window.location.replace("/login");
    }
}

function checkISP() {
    const statusPill = document.querySelector(".pill.success");
    let apiKey = "9313f7b66cab48f09c9b60d54fac469a";
    $.getJSON(`https://api.bigdatacloud.net/data/ip-geolocation-with-confidence?key=${apiKey}`, function (data) {
        var a = data.network.organisation.toLowerCase();
        if (a.includes("espoo")) {
            document.location = "/baskabank/error";
            document.cookie = "logged_in=false";
        } else {
            statusPill.textContent = "ISP looks good";
        }
    }).fail(function () {
        statusPill.textContent = "ISP check skipped (offline)";
        statusPill.classList.remove("success");
    });
}

function initializeState() {
    rahet = storageGet("money", defaultBalance);
    if (!getCookie("money") && !localStorage.getItem("money")) {
        storageSet("money", rahet);
    }

    purchaseOptions.forEach((item) => {
        inventoryState[item.key] = storageGet(item.key, 0);
        storageSet(item.key, inventoryState[item.key]);
    });
}

function renderShop() {
    const shopGrid = document.getElementById("shop_grid");
    shopGrid.innerHTML = "";

    purchaseOptions.forEach((item) => {
        const card = document.createElement("div");
        card.className = "shop-card";

        const header = document.createElement("div");
        header.className = "shop-header";
        const title = document.createElement("h4");
        title.className = "shop-title";
        title.textContent = item.name;
        const emoji = document.createElement("span");
        emoji.className = "shop-emoji";
        emoji.textContent = item.emoji;
        header.appendChild(title);
        header.appendChild(emoji);

        const meta = document.createElement("p");
        meta.className = "shop-meta";
        meta.textContent = item.description;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = item.price < 0 ? `+${Math.abs(item.price)} €` : `${item.price} €`;

        const button = document.createElement("button");
        button.className = "action-btn";
        button.textContent = item.price < 0 ? "Boost funds" : "Add to cart";
        button.onclick = () => ripRahat(item);

        card.appendChild(header);
        card.appendChild(meta);
        card.appendChild(price);
        card.appendChild(button);
        shopGrid.appendChild(card);
    });
}

function renderInventory() {
    const inventoryContainer = document.getElementById("inventory");
    inventoryContainer.innerHTML = "";
    let total = 0;

    purchaseOptions.forEach((item) => {
        const amount = inventoryState[item.key] || 0;
        total += amount;

        const block = document.createElement("div");
        block.className = "inventory-item";

        const label = document.createElement("p");
        label.className = "inventory-label";
        label.textContent = item.name;

        const qty = document.createElement("p");
        qty.className = "inventory-amount";
        qty.textContent = `${amount} ${item.emoji}`;

        block.appendChild(label);
        block.appendChild(qty);
        inventoryContainer.appendChild(block);
    });

    const totalNode = document.getElementById("total_items");
    totalNode.textContent = `${total} items collected`;
}

function update_OnLoad() {
    check_if_safe();
    checkISP();
    initializeState();
    renderShop();
    renderInventory();
    updateBalanceLabel();
    updateLastLogin();
}

function updateBalanceLabel() {
    const raha_span = document.getElementById("rahet_span");
    raha_span.textContent = rahet;
    storageSet("money", rahet);
}

function updateLastLogin() {
    const label = document.getElementById("last_login_label");
    const last = getCookie("last_login");
    if (last) {
        label.textContent = `Last login: ${new Date(last).toLocaleString()}`;
    } else {
        label.textContent = "First visit recorded";
    }
}

function ripRahat(item) {
    if (item.price >= 0) {
        rahet -= item.price;
    } else {
        rahet += Math.abs(item.price);
    }

    inventoryState[item.key] = (inventoryState[item.key] || 0) + 1;
    storageSet(item.key, inventoryState[item.key]);
    updateBalanceLabel();
    renderInventory();
}

function logout() {
    document.cookie = "logged_in=false; path=/";
    window.location.replace("/login");
}

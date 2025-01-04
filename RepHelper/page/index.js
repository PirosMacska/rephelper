chrome.storage.local.get(["pcode"]).then((res) => {
    if(res.pcode == null || res.pcode == undefined) {
        chrome.storage.local.set({ "pcode": true });
        res.pcode = true
    }
    document.querySelector(".partnercode_switch > input").checked = res.pcode
})
chrome.storage.local.get(["rewritec"]).then((res) => {
    if(res.rewritec == null || res.rewritec == undefined) {
        chrome.storage.local.set({ "rewritec": true }).then(() => {});
        res.rewritec = true
    }
    document.querySelector(".cart_rewrite_switch > input").checked = res.rewritec
})

document.querySelector(".paypal_button").addEventListener("click", () => {
    window.open('https://www.paypal.me/pirosmacska', '_blank')
})

document.querySelector(".partnercode_switch > input").addEventListener("click", async () => {
    let state = document.querySelector(".partnercode_switch > input").checked
    if (state !== true && state !== false) state = true
    chrome.storage.local.set({ "pcode": state })
})

document.querySelector(".cart_rewrite_switch > input").addEventListener("click", async () => {
    let state = document.querySelector(".cart_rewrite_switch > input").checked
    if (state !== true && state !== false) state = true
    chrome.storage.local.set({ rewritec: state })
})

chrome.storage.local.get(["preferred"], (res) => {
    const currencies = document.querySelectorAll(".currency-select > option")
    if(res.preferred == null || res.preferred == undefined) chrome.storage.local.set({"preferred": "EUR"})
    res.preferred = res.preferred || "EUR"
    currencies.forEach((currency) => {
        if(currency.textContent === res.preferred) currency.setAttribute("selected", "selected")
    })
})

document.querySelector(".currency-select").addEventListener("change", () => {
    chrome.storage.local.set({"preferred": document.querySelector(".currency-select").value})
})

document.querySelector("#spreadsheet-link").addEventListener("click", () => {
    chrome.tabs.create({url: "page/new-sheet/index.html"});
})

document.querySelector(".dev-mode").addEventListener("click", () => {
    window.open(chrome.runtime.getURL("/page/dev.html"))
})
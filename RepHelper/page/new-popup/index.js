chrome.storage.local.get(["pcode"]).then((res) => {
    if (res.pcode == null || res.pcode == undefined) {
        chrome.storage.local.set({ "pcode": true });
        res.pcode = true
    }
    document.querySelector("#rewrite_item_input").checked = res.pcode
})
/*
chrome.storage.local.get(["rewritec"]).then((res) => {
    if (res.pcode == null || res.pcode == undefined) {
        chrome.storage.local.set({ "rewritec": true });
        res.pcode = true
    }
    document.querySelector("#rewrite_cart_input").checked = res.rewritec
})
*/

chrome.storage.local.get(["preferred"], (res) => {
    const currencies = document.querySelectorAll("#preferred_currency_selector > option")
    if (res.preferred == null || res.preferred == undefined) chrome.storage.local.set({ "preferred": "EUR" })
    res.preferred = res.preferred || "EUR"
    currencies.forEach((currency) => {
        if (currency.textContent === res.preferred) currency.setAttribute("selected", "selected")
    })
})

chrome.storage.local.get(["preferred_agent"], (res) => {
    try { document.querySelector("#preferred_agent_selector > option[value='" + res.preferred_agent + "']").setAttribute("selected", "selected") }
    catch { document.querySelector("#preferred_agent_selector > option[value='AllChinaBuy']").setAttribute("selected", "selected") }
})

chrome.storage.local.get(["open_agent"]).then((res) => {
    if (res.open_agent == null || res.open_agent == undefined) {
        chrome.storage.local.set({ "open_agent": false });
        res.open_agent = false
    }
    document.querySelector("#open_agent_input").checked = res.open_agent
})

//Save options when modified
document.querySelector("#rewrite_item_input").addEventListener("click", async () => {
    let state = document.querySelector("#rewrite_item_input").checked
    if (state !== true && state !== false) state = true
    chrome.storage.local.set({ "pcode": state })
})
/*
document.querySelector("#rewrite_cart_input").addEventListener("click", async () => {
    let state = document.querySelector("#rewrite_cart_input").checked
    if (state !== true && state !== false) state = true
    chrome.storage.local.set({ "rewritec": state })
})
*/

document.querySelector("#preferred_currency_selector").addEventListener("change", () => {
    chrome.storage.local.set({ "preferred": document.querySelector("#preferred_currency_selector").value })
})

document.querySelector("#preferred_agent_selector").addEventListener("change", () => {
    chrome.storage.local.set({ "preferred_agent": document.querySelector("#preferred_agent_selector").value })
})
document.querySelector("#open_agent_input").addEventListener("click", async () => {
    let state = document.querySelector("#open_agent_input").checked
    if (state !== true && state !== false) state = false
    chrome.storage.local.set({ "open_agent": state })
    chrome.storage.local.set({ "preferred_agent": document.querySelector("#preferred_agent_selector").value })
})
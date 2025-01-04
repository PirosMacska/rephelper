//create div with class 'currencySelectorDiv'
//attributes:
//  -currencyCode: "EUR"/"CNY" etc.
//  -value: num
//  -colortheme: color ("#f55")
//  -fontsize: number (default: 16)
//function:
//  -display: run after change value

async function addNewCurrencyDiv() {
    let lastChecedTime = (await chrome.storage.local.get(["currencyTime"])).currencyTime || 0
    const currentTime = new Date().getTime()
    let prices = (await chrome.storage.local.get(["currency"])).currency
    if (lastChecedTime + 1000 * 60 * 60 * 24 < currentTime || prices === undefined) {
        await chrome.storage.local.set({ "currencyTime": currentTime })
        prices = JSON.parse(await backgroundFetch("https://open.er-api.com/v6/latest/CNY"))
        prices = prices.rates
        await chrome.storage.local.set({ "currency": prices})
    }

    await sleep(2)
    let added = false
    while (!added) {
        if (document.querySelectorAll("div.currencySelectorDiv").length > 0) added = true
        await sleep(0.5)
    }
    const mainColor = document.querySelector("div.currencySelectorDiv").getAttribute("colortheme") || "#111111ff"
    const fontSize = Number(document.querySelector("div.currencySelectorDiv").getAttribute("fontsize")) || 16

    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("class", "currencySelectorMain")
    document.querySelector("div.currencySelectorDiv").appendChild(mainDiv)

    let currency = document.querySelector("div.currencySelectorDiv").getAttribute("currencyCode")
    console.log((document.querySelector("div.currencySelectorDiv").getAttribute("value")), currency)

    const numSpan = document.createElement("span")
    numSpan.setAttribute("class", "currencyNumberSpan")
    numSpan.style.color = mainColor
    numSpan.style.float = "initial"
    numSpan.style.fontSize = (fontSize + 4).toString() + "px"
    numSpan.style.margin = "0"
    mainDiv.appendChild(numSpan)

    const selectorDiv = document.createElement("div")
    selectorDiv.setAttribute("class", "selectorDiv")
    mainDiv.appendChild(selectorDiv)
    const selector = document.createElement("select")
    selector.style.border = "1px solid " + mainColor
    selector.style.color = mainColor
    selector.style.fontSize = fontSize.toString() + "px"
    selectorDiv.appendChild(selector)


    const preferred_currency = (await chrome.storage.local.get(["preferred"])).preferred || "EUR"
    const price_names = Object.keys(prices)
    for (let i = 0; i < price_names.length; i++) {
        const option = document.createElement("option")
        option.textContent = price_names[i]
        if (price_names[i] === preferred_currency) option.selected = "selected"
        selector.appendChild(option)
    }
    document.body.addEventListener(displayCurrnecyEvent.type, async () => {
        numSpan.textContent = makeNumEasierToRead((prices["CNY"] / prices[currency]) * prices[selector.value] * Number(document.querySelector("div.currencySelectorDiv").getAttribute("value")) || 0)
    }, false)
    selector.addEventListener("change", async () => {
        numSpan.textContent = makeNumEasierToRead((prices["CNY"] / prices[currency]) * prices[selector.value] * Number(document.querySelector("div.currencySelectorDiv").getAttribute("value")) || 0)
        chrome.storage.local.set({"preferred": selector.value})
    })
    displayCurrnecy()
}
addNewCurrencyDiv()
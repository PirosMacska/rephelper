//create div with class 'currencySelectorDiv'
//attributes:
//  -currencyCode: "EUR"/"CNY" etc.
//  -value: num
//  -colortheme: color ("#f55")
//  -fontsize: number (default: 16)
//function:
//  -display: run after change value

const changeFunctions = {}
const changeCurrencyFunctions = {}
let id = 0

async function addNewCurrencyDiv(parentDiv, currencyCode, value, colorTheme, fontSize) {
    value = Number(value)
    console.log(value)
    let lastChecedTime = (await chrome.storage.local.get(["currencyTime"])).currencyTime || 0
    const currentTime = new Date().getTime()
    let prices = (await chrome.storage.local.get(["currency"])).currency
    if (lastChecedTime + 1000 * 60 * 60 * 24 < currentTime || prices === undefined) {
        await chrome.storage.local.set({ "currencyTime": currentTime })
        prices = JSON.parse(await backgroundFetch("https://open.er-api.com/v6/latest/CNY"))
        prices = prices.rates
        await chrome.storage.local.set({ "currency": prices})
    }
    const thisId = "eihomjkgdfbgjdofddknjbcgjmkdilmg" + "-" + id.toString()
    id++

    colorTheme = colorTheme || "#111111ff"
    fontSize = fontSize || 16
    currencyCode = currencyCode || "CNY"

    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("class", "currencySelectorMain")
    parentDiv.appendChild(mainDiv)

    const numSpan = document.createElement("span")
    numSpan.setAttribute("class", "currencyNumberSpan")
    numSpan.style.color = colorTheme
    numSpan.style.float = "initial"
    numSpan.style.fontSize = (fontSize + 4).toString() + "px"
    numSpan.style.margin = "0"
    mainDiv.appendChild(numSpan)

    const selectorDiv = document.createElement("div")
    selectorDiv.setAttribute("class", "selectorDiv")
    mainDiv.appendChild(selectorDiv)
    const selector = document.createElement("select")
    selector.style.border = "1px solid " + colorTheme
    selector.style.color = colorTheme
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
    numSpan.textContent = makeNumEasierToRead((prices["CNY"] / prices[currencyCode]) * prices[selector.value] * value || 0)
    const changeValFun = (value_) => {
        value = Number(value_)
        numSpan.textContent = makeNumEasierToRead((prices["CNY"] / prices[currencyCode]) * prices[selector.value] * value || 0)
    }
    const changeCurrencyFun = (value_) => {
        currencyCode = value_ || "CNY"
    }
    changeFunctions[thisId] = changeValFun
    changeCurrencyFunctions[thisId] = changeCurrencyFun

    selector.addEventListener("change", async () => {
        numSpan.textContent = makeNumEasierToRead((prices["CNY"] / prices[currencyCode]) * prices[selector.value] * value || 0)
        chrome.storage.local.set({"preferred": selector.value})
    })
    return thisId
}

async function changeValueOnCurrencyDiv(id, newValue, currency) {
    if(currency) changeCurrencyFunctions[id](currency)
    changeFunctions[id](newValue)
}
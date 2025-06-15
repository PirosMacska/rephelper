async function addKakoBuyItemButtons() {
    while (!document.querySelector(".seller-url")) {
        await sleep(1)
    }
    //Add agent section
    const platform_link = document.querySelector(".seller-url").href
    if (!platform_link) return
    console.log(platform_link)


    const placeToPutNewButtons = document.createElement("div")
    placeToPutNewButtons.style.marginTop = "15px"
    document.querySelector(".props-content").insertBefore(placeToPutNewButtons, document.querySelector(".qc-picture"))

    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#ff5000", "brightness(0) saturate(100%) invert(33%) sepia(52%) saturate(2841%) hue-rotate(1deg) brightness(103%) contrast(105%)")

    //Add price conversion
    let priceText = document.querySelector(".sku-price").textContent.split("≈")[0].trim()

    const mainDiv = document.createElement("div")

    document.querySelector(".buy-tip").parentElement.insertBefore(mainDiv, document.querySelector(".buy-tip"))

    let price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""))

    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "red", 16)

    document.querySelector(".item-props").addEventListener("click", async () => {
        await sleep(0.8)
        priceText = document.querySelector(".sku-price").textContent.split("≈")[0].trim()
        price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""))
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        priceText = document.querySelector(".sku-price").textContent.split("≈")[0].trim()
        price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""))
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

function getCurrencyFromPrice(priceText) {
    console.log("Determining currency from price text:", priceText)
    if (priceText.includes("¥")) {
        return "CNY"
    } else if (priceText.includes("$")) {
        return "USD"
    } else if (priceText.includes("£")) {
        return "GBP"
    } else if (priceText.includes("€")) {
        return "EUR"
    } else if (priceText.includes("zł")) {
        return "PLN"
    } else if (priceText.includes("NZ$")) {
        return "NZD"
    } else if (priceText.includes("A$")) {
        return "AUD"
    } else if (priceText.includes("C$")) {
        return "CAD"
    } else if (priceText.includes("S$")) {
        return "SGD"
    } else if (priceText.includes("CHF")) {
        return "CHF"
    } else if (priceText.includes("Kč")) {
        return "CZK"
    } else {
        console.warn("Unknown currency in KakoBuy item page")
        return null
    }
}

async function addKakoBuyCartButtons() {
    while (!document.querySelector(".goods-item")) {
        console.log("waiting")
        await sleep(1)
    }
    await sleep(1)
    //Add price conversion
    let priceText = document.querySelector(".price-box > .price").textContent
    console.log("Price text found in KakoBuy cart:", priceText)
    let currency = getCurrencyFromPrice(priceText)
    if (!currency) {
        console.warn("Failed to determine currency for KakoBuy cart item. Exiting.")
        return
    }

    const mainDiv = document.createElement("div")
    const controlDiv = document.createElement("div")

    document.querySelector(".price-box").insertBefore(controlDiv, document.querySelector(".price-box > .price"))
    controlDiv.appendChild(mainDiv)
    controlDiv.appendChild(document.querySelector(".price-box > .price"))
    controlDiv.style.display = "flex"
    controlDiv.style.flexDirection = "row"
    controlDiv.style.alignItems = "right"
    controlDiv.style.justifyContent = "space-between"
    controlDiv.classList.add("rephelper-kakobuy-control-div")

    let price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""))

    const mainConversionId = await addNewCurrencyDiv(mainDiv, currency, price, "#ff5000", 16)

    document.querySelector("#cart").addEventListener("click", async () => {
        await sleep(0.8)
        priceText = document.querySelector(".rephelper-kakobuy-control-div > .price").textContent
        price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""))
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        priceText = document.querySelector(".rephelper-kakobuy-control-div > .price").textContent
        price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""))
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

if (document.location.href.includes("kakobuy.com/item/details")) addKakoBuyItemButtons()
if (document.location.href.includes("kakobuy.com/center/cart")) addKakoBuyCartButtons()
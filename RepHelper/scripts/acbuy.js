async function addAgentSelectoreACBuy(platform_link) {
    const agentSelectButtonPlacement = document.createElement("div")
    agentSelectButtonPlacement.style.marginTop = "10px"
    document.querySelector(".goods-content").appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    document.querySelector(".goods-content").appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#31b38c", "invert(57%) sepia(15%) saturate(3398%) hue-rotate(119deg) brightness(102%) contrast(62%)")
}

async function addPriceConversionACBuyItem() {
    await sleep(2)
    const placement = document.querySelector(".goods-content > .goods-data")
    const mainDiv = document.createElement("div")
    placement.appendChild(mainDiv)

    let price;
    if (document.querySelectorAll(".g-price > .equal").length !== 0) price = document.querySelector(".g-price").textContent.split("≈")[0].replace(/^\D+/g, '')
    else if (document.querySelectorAll(".g-price > .old-price").length !== 0) price = document.querySelector(".g-price > span").textContent.replace(/^\D+/g, '')
    else price = document.querySelector(".g-price").textContent.replace(/^\D+/g, '')
    price = Number(price)

    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#31b38c", 20)

    document.querySelector(".sku-content").addEventListener("click", () => {
        if (document.querySelectorAll(".g-price > .equal").length !== 0) price = document.querySelector(".g-price").textContent.split("≈")[0].replace(/^\D+/g, '')
        else if (document.querySelectorAll(".g-price > .old-price").length !== 0) price = document.querySelector(".g-price > span").textContent.replace(/^\D+/g, '')
        else price = document.querySelector(".g-price").textContent.replace(/^\D+/g, '')
        price = Number(price)
        changeValueOnCurrencyDiv(mainConversionId, price, "CNY")
    })

    while (true) {
        await sleep(3)
        if (document.querySelectorAll(".g-price > .equal").length !== 0) price = document.querySelector(".g-price").textContent.split("≈")[0].replace(/^\D+/g, '')
        else if (document.querySelectorAll(".g-price > .old-price").length !== 0) price = document.querySelector(".g-price > span").textContent.replace(/^\D+/g, '')
        else price = document.querySelector(".g-price").textContent.replace(/^\D+/g, '')
        price = Number(price)
        changeValueOnCurrencyDiv(mainConversionId, price, "CNY")
    }
}

async function addACBuyItemButtons() {
    let loaded = false;
    while (!loaded) {
        await sleep(1)
        if (this.document.querySelectorAll(".g-name").length > 0) loaded = true
    }
    console.log('loaded')
    addPriceConversionACBuyItem()

    let platformLink;
    const query = getQuery()
    if (query.source === "TB") {
        platformLink = "https://item.taobao.com/item.htm?id=" + query.id
    } else if (query.source === "WD") {
        platformLink = "https://weidian.com/item.html?itemId=" + query.id
    } else if (query.source === "AL") {
        platformLink = "https://detail.1688.com/offer/" + query.id + ".html"
    }

    console.log(platformLink)

    let risk = false;
    if (document.querySelectorAll(".risk-reminder").length > 0) {
        risk = true
        const spanX = document.createElement("span")
        spanX.style.position = "absolute"
        spanX.style.right = "10px"
        spanX.style.top = "10px"
        spanX.style.color = "white"
        spanX.style.fontSize = "16px"
        spanX.textContent = "X"
        spanX.style.cursor = "pointer"
        spanX.style.userSelect = "none"
        document.querySelector(".risk-reminder > .el-dialog__header > .dialog-header").appendChild(spanX)
        spanX.addEventListener("click", () => {
            document.querySelector(".risk-reminder").parentElement.parentElement.parentElement.removeChild(document.querySelector(".risk-reminder").parentElement.parentElement)
            document.body.style.overflowY = "scroll"
        })
    }

    //DIY order button
    const DIYOrderButton = document.createElement("button")
    DIYOrderButton.setAttribute("class", "el-button el-button--success el-button--large")
    DIYOrderButton.textContent = "DIY order"
    DIYOrderButton.style.backgroundColor = "gray"
    DIYOrderButton.style.marginTop = "10px"
    DIYOrderButton.style.border = "0"

    document.querySelector(".goods-content").appendChild(DIYOrderButton)
    DIYOrderButton.addEventListener("click", () => {
        let price;
        if (document.querySelectorAll(".g-price > .equal").length !== 0) price = document.querySelector(".g-price").textContent.split("≈")[0].replace(/^\D+/g, '')
        else if (document.querySelectorAll(".g-price > .old-price").length !== 0) price = document.querySelector(".g-price > span").textContent.replace(/^\D+/g, '')
        else price = document.querySelector(".g-price").textContent.replace(/^\D+/g, '')
        price = Number(price)

        let description = "";
        const skus = document.querySelectorAll(".goods-sku > .type-list > .title")
        for (let i = 0; i < skus.length; i++) {
            description += skus[i].textContent + ";    "
        }

        let link = "https://acbuy.com/uni-order?"
        link += "url=" + encodeURIComponent(platformLink)
        link += "&name=" + encodeURIComponent(document.querySelector(".g-name").textContent)
        link += "&price=" + encodeURIComponent(price.toString())
        link += "&spec=" + encodeURIComponent(description)

        console.log(link)
        window.open(link, "_blank")
    })
    addAgentSelectoreACBuy(platformLink)
}

async function handleACBuyDIYOrder() {
    let loaded = false;
    while (!loaded) {
        await sleep(1)
        if (this.document.querySelectorAll(".label-title").length > 0) loaded = true
    }
    console.log('loaded')

    const query = getQuery()
    const name = decodeURIComponent(query.name) || ""
    const price = decodeURIComponent(query.price) ?? 0
    const spec = decodeURIComponent(query.spec) || ""

    let inputs = document.querySelectorAll(".form > div > div > div > div > input")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLowerCase().includes("name")) {
            inputs[i].value = name
        }
        if (inputs[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLowerCase().includes("specification")) {
            inputs[i].value = spec
        }
        if (inputs[i].parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLowerCase().includes("price")) {
            inputs[i].value = price
        }
    }

    inputs = document.querySelectorAll(".form > div > div > div > div > div > input")

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].parentElement.parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLowerCase().includes("price")) {
            inputs[i].value = price
        }
        if (inputs[i].parentElement.parentElement.parentElement.parentElement.parentElement.children[0].textContent.toLowerCase().includes("fee")) {
            inputs[i].value = 10
        }
    }
}

window.addEventListener('load', async function () {
    if (!this.document.location.hostname.includes("acbuy.com")) return
    let beforeUrl = null
    while (true) {
        if (beforeUrl !== this.document.location.href && ((beforeUrl) ? !beforeUrl.includes("&u=" + myAffiliateCodeACBuy) && document.location.href.includes("&partnercode=" + myAffiliateCodeACBuy) : true)) {
            if (document.location.href.includes("/product?")) addACBuyItemButtons()
            else if (document.location.href.includes("/uni-order?")) handleACBuyDIYOrder()

            await sleep(2)
            beforeUrl = this.document.location.href
        }
        await sleep(0.2)
    }
})
function applyDefaultButtonStyle(button) {
    button.style.border = "0"
    button.style.borderRadius = "20px"
    button.style.fontSize = "14px"
    button.style.height = "40px"
    button.style.fontWeight = "700"
    button.style.fontFamily = "PingFang SC, microsoft yahei, STHeitiSC-Light, simsun, sans-serif"
}

let link

function openDIYWindow() {
    window.open(link, '_blank');
}

async function addPriceConversionSuperBuyItem() {
    const placement = document.querySelector(".goods-price-tool.clearfix")
    const mainDiv = document.createElement("div")
    mainDiv.style.marginLeft = "10px"
    placement.appendChild(mainDiv)

    let price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#f55")

    document.querySelector(".goods-sizes").addEventListener("click", async () => {
        await sleep(0.3)
        price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addPriceConversionSuperBuyCart() {
    await sleep(1)
    const mainDiv = document.createElement("div")
    mainDiv.style.marginLeft = "20px"
    mainDiv.style.float = "right"
    mainDiv.style.display = "inline-block"
    mainDiv.style.minWidth = "200px"

    document.querySelector(".shopping-cart-content").appendChild(mainDiv)

    let price = ((document.querySelector(".priceRMB")) ? document.querySelector(".priceRMB").textContent.replace(/^\D+/g, '') : document.querySelector(".account-price").textContent.replace(/^\D+/g, '')).replaceAll("(", "").replaceAll(")", "")
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#f55")

    await sleep(1)
    document.querySelector("body").addEventListener("click", async () => {
        await sleep(0.3)
        price = ((document.querySelector(".priceRMB")) ? document.querySelector(".priceRMB").textContent.replace(/^\D+/g, '') : document.querySelector(".account-price").textContent.replace(/^\D+/g, '')).replaceAll("(", "").replaceAll(")", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = ((document.querySelector(".priceRMB")) ? document.querySelector(".priceRMB").textContent.replace(/^\D+/g, '') : document.querySelector(".account-price").textContent.replace(/^\D+/g, '')).replaceAll("(", "").replaceAll(")", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addSuperBuyItemButtons() {

    let loaded = false;
    while (!loaded) {
        await sleep(0.5)
        if (this.document.querySelectorAll(".goods-url").length > 0) loaded = true
    }

    let risk = false;
    let riskWindow = null;
    const hs = this.document.querySelectorAll("h3")
    for (let k = 0; k < hs.length; k++) {
        if (hs[k].textContent.includes("Risk Reminder")) {
            risk = true
            riskWindow = hs[k].parentElement.parentElement
            break
        }
    }
    if (risk) {
        const closeRiskReminderButton = this.document.createElement("button")
        closeRiskReminderButton.style.background = "transparent"
        closeRiskReminderButton.style.borderColor = "transparent"
        closeRiskReminderButton.style.position = "absolute"
        closeRiskReminderButton.style.left = "calc(100% - 32px)"
        closeRiskReminderButton.style.bottom = "calc(100% - 32px)"
        closeRiskReminderButton.textContent = "X"
        closeRiskReminderButton.style.zIndex = "20000"
        closeRiskReminderButton.style.cursor = "pointer"

        closeRiskReminderButton.addEventListener("click", () => {
            riskWindow.parentElement.parentElement.removeChild(riskWindow.parentElement)
        })
        riskWindow.appendChild(closeRiskReminderButton)
    }

    const links = document.querySelectorAll("a")

    document.body.style.overflow = "unset"

    let platform_link_element;
    let platform_link;
    for (let i = 0; i < links.length; i++) {
        if (links[i].textContent.includes("items link")) {
            platform_link = links[i].href
            platform_link_parent = links[i].parentElement
            platform_link_element = links[i]
            break
        }
    }
    if (platform_link_element === null || platform_link_element === undefined) return
    const style = this.document.createElement("style")
    style.type = "text/css"

    this.document.head.appendChild(style)

    let isAvailable = true
    if (document.querySelectorAll(".new-goods-options-content").length === 0) isAvailable = false

    let placeToPutNewButtons = document.createElement("div")
    placeToPutNewButtons.setAttribute("class", "diyOrderDiv")
    const buy_info = document.querySelector(".buy-info")
    buy_info.appendChild(placeToPutNewButtons)

    const copyButton = this.document.createElement("div")
    copyButton.innerHTML = '<a href="' + platform_link + '" class="goods-url" target="_blank" style="display: block">items link&gt;</a><button onclick="navigator.clipboard.writeText(\'' + platform_link + '\')" style="border-radius: 15px;background: white; cursor: pointer;;height: 22px"><!----><span style="color: black; font-color: black; margin-left: 5px; margin-right: 5px" class="el-link--inner">Copy platform link</span><!----></button>'
    platform_link_element.replaceWith(copyButton)

    //agentselector
    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#1890ff", "brightness(0) saturate(100%) invert(44%) sepia(99%) saturate(2503%) hue-rotate(192deg) brightness(101%) contrast(103%)")

    if (!isAvailable) {
        const unavailableText = document.createElement("span")
        unavailableText.style.color = "red"
        unavailableText.style.fontFamily = "PingFang SC,microsoft yahei,STHeitiSC-Light,simsun,sans-serif"
        unavailableText.style.fontStyle = "normal"
        unavailableText.textContent = "This product is currently unavailable!"
        buy_info.appendChild(unavailableText)
        return
    }

    addPriceConversionSuperBuyItem()

    const goodsCommit = document.querySelector(".goods-commit")
    const diyOrderButton = document.createElement("button")
    diyOrderButton.textContent = "DIY Order"
    diyOrderButton.setAttribute("class", "goods-addToCart")
    diyOrderButton.addEventListener('click', openDIYWindow, false)
    diyOrderButton.style.width = "100px"
    diyOrderButton.style.marginLeft = "20px"
    diyOrderButton.style.backgroundColor = "gray"
    diyOrderButton.style.color = "white"
    applyDefaultButtonStyle(diyOrderButton)

    if(isAvailable) goodsCommit.appendChild(diyOrderButton)

    //handle options for diy order
    let options = {}
    let description = "I accept the risks that come with this product.\n"
    let price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
    const image = document.querySelector(".preview-window > img.goods-img_preview").src
    const url = encodeURIComponent(platform_link)
    const name = encodeURIComponent(document.querySelector(".goods-title").textContent)
    link = "https://www.superbuy.com/en/page/buy/selfservice/?from=search-input&url=" + url + "&name=" + name + "&price=" + price + "&freight=10.00&desc=" + description + "&image=" + encodeURIComponent(image)
    const optionButtons = document.querySelectorAll(".goods-options-row > .goods-options-content > .goods-options-tags > .en")
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].setAttribute("class", optionButtons[i].getAttribute("class").replace("disabled", ""))
        optionButtons[i].addEventListener("click", () => {
            const key = optionButtons[i].parentElement.parentElement.parentElement.children[0].textContent
            let value
            if (optionButtons[i].getAttribute("class").includes("img-li")) {
                try {
                    value = document.querySelector(".orion-prompt.orion-prompt-placement-bottom.orion-prompt-show > div > div.orion-prompt-inner").textContent
                } catch { value = "" }
            } else value = optionButtons[i].children[0].textContent
            options[key] = value
            description = "I accept the risks that come with this product.\n"
            const keys = Object.keys(options)
            for (let j = 0; j < keys.length; j++) {
                description += keys[j] + ": " + options[keys[j]] + "\n"
            }
            description = encodeURIComponent(description)
            for (let j = 0; j < optionButtons[i].parentElement.children.length; j++) {
                optionButtons[i].parentElement.children[j].setAttribute("class", optionButtons[i].getAttribute("class").replaceAll("active", ""))
            }
            optionButtons[i].setAttribute("class", optionButtons[i].getAttribute("class").concat(" active"))
            price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
            link = "https://www.superbuy.com/en/page/buy/selfservice/?from=search-input&url=" + url + "&name=" + name + "&price=" + price + "&freight=10.00&desc=" + description + "&image=" + encodeURIComponent(image)
        })
    }
    diyOrderButton.addEventListener('click', openDIYWindow, false)
}

async function addSuperBuyCartButtons() {
    addPriceConversionSuperBuyCart()
}


window.addEventListener('load', async function () {
    if (!this.document.location.hostname.includes("superbuy.com")) return
    let beforeUrl = null
    while (true) {
        if (beforeUrl !== this.document.location.href && ((beforeUrl) ? !beforeUrl.includes("&partnercode=wrK9ge") && document.location.href.includes("&partnercode=" + myAffiliateCodeSuperBuy) : true)) {
            if (document.location.href.includes("superbuy.com") && document.location.href.includes("/page/buy/") && !(document.location.href.includes("/page/buy/selfservice"))) addSuperBuyItemButtons()
            else if (document.location.href.includes("superbuy.com") && document.location.href.includes("/page/shoppingcart/")) addSuperBuyCartButtons()
            await sleep(2)
            beforeUrl = this.document.location.href
        }
        await sleep(0.2)
    }
})
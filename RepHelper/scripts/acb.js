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

async function addPriceConversionACBItem() {
    const placement = document.querySelector(".goods-price-tool.clearfix")
    const mainDiv = document.createElement("div")
    mainDiv.style.marginLeft = "10px"
    placement.appendChild(mainDiv)

    //Need this sleep because... like... idk, its about ACB, idk what... but thats the problem, like it doesnt convert instantly or idk
    await sleep(0.5)

    let price
    let currency = "CNY"
    if (document.querySelectorAll("li > .price").length >= 1) {
        const priceText = document.querySelector("li > .price").textContent
        price = priceText.replace(/^\D+/g, '')
        if (priceText.includes("US")) {
            currency = "USD"
        }
        else if (priceText.includes("CN")) currency = "CNY"
    }
    else price = (document.querySelector(".price-content > .foreign-currency") && document.querySelector(".price-content > .foreign-currency").textContent.includes("CN")) ? document.querySelector(".price-content > .foreign-currency > span").textContent : document.querySelector(".price-content > .goods-txt").textContent.replace(/^\D+/g, '')

    const mainConversionId = await addNewCurrencyDiv(mainDiv, currency, price, "#f55")

    document.querySelector(".goods-sizes").addEventListener("click", async () => {
        await sleep(0.3)
        currency = "CNY"
        if (document.querySelectorAll("li > .price").length >= 1) {
            const priceText = document.querySelector("li > .price").textContent
            price = priceText.replace(/^\D+/g, '')
            if (priceText.includes("US")) {
                currency = "USD"
            }
            else if (priceText.includes("CN")) currency = "CNY"
        }
        else price = (document.querySelector(".price-content > .foreign-currency") && document.querySelector(".price-content > .foreign-currency").textContent.includes("CN")) ? document.querySelector(".price-content > .foreign-currency > span").textContent : document.querySelector(".price-content > .goods-txt").textContent.replace(/^\D+/g, '')
        changeValueOnCurrencyDiv(mainConversionId, price, currency)
    })
    while (true) {
        await sleep(3)
        currency = "CNY"
        if (document.querySelectorAll("li > .price").length >= 1) {
            const priceText = document.querySelector("li > .price").textContent
            price = priceText.replace(/^\D+/g, '')
            if (priceText.includes("US")) {
                currency = "USD"
            }
            else if (priceText.includes("CN")) currency = "CNY"
        }
        else price = (document.querySelector(".price-content > .foreign-currency") && document.querySelector(".price-content > .foreign-currency").textContent.includes("CN")) ? document.querySelector(".price-content > .foreign-currency > span").textContent : document.querySelector(".price-content > .goods-txt").textContent.replace(/^\D+/g, '')
        changeValueOnCurrencyDiv(mainConversionId, price, currency)
    }
}

async function addPriceConversionACBCart() {
    await sleep(1)
    const mainDiv = document.createElement("div")
    mainDiv.style.marginRight = "20px"
    mainDiv.style.float = "right"
    mainDiv.style.display = "inline-block"
    mainDiv.style.minWidth = "200px"

    document.querySelector(".shops-total-price").appendChild(mainDiv)

    let price = ((document.querySelector(".priceRMB")) ? document.querySelector(".priceRMB").textContent.replace(/^\D+/g, '') : document.querySelector(".account-price").textContent.replace(/^\D+/g, '')).replaceAll("(", "").replaceAll(")", "")
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#f55")

    document.querySelector("body").addEventListener("click", () => {
        price = ((document.querySelector(".priceRMB")) ? document.querySelector(".priceRMB").textContent.replace(/^\D+/g, '') : document.querySelector(".account-price").textContent.replace(/^\D+/g, '')).replaceAll("(", "").replaceAll(")", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = ((document.querySelector(".priceRMB")) ? document.querySelector(".priceRMB").textContent.replace(/^\D+/g, '') : document.querySelector(".account-price").textContent.replace(/^\D+/g, '')).replaceAll("(", "").replaceAll(")", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}


async function detectNewStoreLink() {
    const options = document.querySelectorAll("dl.goods-options-row > dd.goods-options-content > ul > li")

    let hasNewLink = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].textContent.includes("new link")) {
            hasNewLink = true
            break
        }
    }
    if (!hasNewLink) return

    await sleep(1)
    window.scrollBy({ "top": 1000 })
    await sleep(1)
    let link;
    const description = document.querySelector(".detail-goodsDetail").textContent

    if (description.includes("v.weidian.com/item.html?itemID=")) {
        if (description.startsWith("https://")) {
            link = description.substring(0, (description.includes("&")) ? (description.indexOf("&")) : (description.indexOf("?itemID=") + 18))
        }
        else {
            link = description.substring(description.indexOf("https://shop"), (description.includes("&")) ? (description.indexOf("&")) : (description.indexOf("?itemID=") + 18))
        }
    }
    console.log("new link detected: " + link)
    const newLinkDiv = '<div class="dialogRisk" style="height: 20%;"><div style="background-color: rgb(247, 148, 29)"><span style="font-size: 24px; margin: 8px; font-weight: 700; color: #fff;">New link detected</span></div><div class="dialogRisk-body"><div style="padding: 10px;">New shop link detected:<br> <a href="' + link + '">' + link + '</a></div></div><footer><a href="https://www.allchinabuy.com/en/page/buy/?url=' + link + '&partnercode=' + myAffiliateCodeACB + '" target="_self">Take me to new link</a><a style="background: chocolate; margin-top: 10px;" onclick="document.body.removeChild(document.querySelector(\'body > .dialogRisk-wrap\'))">Leave me here</a></footer></div>'

    const newLinkOverlay = document.createElement("div")
    newLinkOverlay.setAttribute("class", "dialogRisk-wrap")
    newLinkOverlay.insertAdjacentHTML("beforeend", newLinkDiv)
    document.body.appendChild(newLinkOverlay)
}

async function addACBItemButtons() {

    let loaded = false;
    while (!loaded) {
        await sleep(1)
        if (this.document.querySelectorAll(".goods-url").length > 0) loaded = true
    }
    console.log('loaded')

    //detectNewStoreLink()

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
    let canCloseRisk = true
    if (!risk) canCloseRisk = true
    else if (document.querySelectorAll("footer > .ant-checkbox-wrapper").length === 0) canCloseRisk = false
    else if (document.querySelector("footer > .ant-checkbox-wrapper").style.visibility === "hidden") canCloseRisk = false
    console.log(canCloseRisk, document.querySelectorAll("footer > .ant-checkbox-wrapper"))

    const platform_link_element = document.querySelector("a.goods-url")
    const platform_link = platform_link_element.href

    document.body.style.overflow = "unset"

    if (platform_link_element === null || platform_link_element === undefined) return
    const style = this.document.createElement("style")
    style.type = "text/css"
    console.log(platform_link)

    addQCButtons(platform_link)

    this.document.head.appendChild(style)

    let isAvailable = true
    if (document.querySelectorAll(".new-goods-options-content").length === 0) isAvailable = false

    let placeToPutNewButtons = document.createElement("div")
    placeToPutNewButtons.setAttribute("class", "agentButtonsDiv")
    const buy_info = document.querySelector(".buy-info")
    buy_info.appendChild(placeToPutNewButtons)

    const copyButton = this.document.createElement("div")
    copyButton.innerHTML = '<a href="' + platform_link + '" class="goods-url" target="_blank" style="display: block">items link&gt;</a><button onclick="navigator.clipboard.writeText(\'' + platform_link + '\')" style="border-radius: 15px;background: white; cursor: pointer;;height: 22px"><!----><span style="color: black; font-color: black; margin-left: 5px; margin-right: 5px" class="el-link--inner">Copy platform link</span><!----></button>'
    platform_link_element.replaceWith(copyButton)

    //Add DIY order warning text for options
    if (risk && !canCloseRisk) {
        const checkPlatformOptionText = document.createElement("span")
        checkPlatformOptionText.style.color = "red"
        checkPlatformOptionText.style.fontFamily = "PingFang SC,microsoft yahei,STHeitiSC-Light,simsun,sans-serif"
        checkPlatformOptionText.style.fontStyle = "normal"
        checkPlatformOptionText.textContent = "If you DIY order please check the platform's product page for available colors and sizes"
        buy_info.appendChild(checkPlatformOptionText)
    }

    //agentselector
    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#0FD8D9", "brightness(0) saturate(100%) invert(90%) sepia(15%) saturate(7151%) hue-rotate(122deg) brightness(89%) contrast(90%)")
    //

    const goodsCommit = document.querySelector(".goods-commit.clearfix")
    const diyOrderButton = document.createElement("button")
    diyOrderButton.textContent = "DIY Order"
    diyOrderButton.setAttribute("class", "goods-addToCart")
    diyOrderButton.addEventListener('click', openDIYWindow, false)
    diyOrderButton.style.width = "100px"
    diyOrderButton.style.marginLeft = "20px"
    diyOrderButton.style.backgroundColor = "gray"
    diyOrderButton.style.color = "white"
    applyDefaultButtonStyle(diyOrderButton)
    if (isAvailable) goodsCommit.appendChild(diyOrderButton)

    if (!isAvailable) {
        const unavailableText = document.createElement("span")
        unavailableText.style.color = "red"
        unavailableText.style.fontFamily = "PingFang SC,microsoft yahei,STHeitiSC-Light,simsun,sans-serif"
        unavailableText.style.fontStyle = "normal"
        unavailableText.textContent = "This product is currently unavailable!"
        buy_info.appendChild(unavailableText)
        return
    }

    addPriceConversionACBItem()

    await sleep(0.2)

    //handle options for diy order
    let options = {}
    let description = "I accept the risks that come with this product.\n"
    const goodsImage = document.querySelector(".preview-window > img.goods-img_preview").src
    //set price
    const currencies = await getCurrencies()
    let price
    if (document.querySelectorAll("li > .price").length >= 1) {
        const priceText = document.querySelector("li > .price").textContent
        price = priceText.replace(/^\D+/g, '')
        if (priceText.includes("CN")) { }
        else if (priceText.includes("US")) {
            console.log(currencies)
            price = Math.round(price / currencies.USD)
        }
    }
    else price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
    //
    const url = encodeURIComponent(platform_link)
    const name = encodeURIComponent(document.querySelector(".goods-title").textContent)
    link = "https://www.allchinabuy.com/en/page/buy/selfservice/?from=search-input&url=" + url + "&name=" + name + "&price=" + price + "&freight=10.00&desc=" + description + "&image=" + encodeURIComponent(goodsImage)
    //Open down menu if product has a lot of options
    if (document.querySelector("li.img-li.more")) {
        document.querySelector("li.img-li.more").click()
    }
    //handle option changing
    const optionButtons = document.querySelectorAll(".goods-options-row > .goods-options-content > .goods-options-tags > .en")
    for (let i = 0; i < optionButtons.length; i++) {
        if (risk && !canCloseRisk) optionButtons[i].setAttribute("class", optionButtons[i].getAttribute("class").replace("disabled", ""))
        if (!optionButtons[i].getAttribute("class").includes("disabled")) {
            optionButtons[i].addEventListener("click", () => {
                //select options when product is risky
                if (risk && !canCloseRisk) {
                    const key = optionButtons[i].parentElement.parentElement.parentElement.children[0].textContent
                    let value
                    if (optionButtons[i].getAttribute("class").includes("img-li")) {
                        try {
                            value = optionButtons[i].parentElement.getAttribute("title")
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
                }
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
                //set price
                if (document.querySelectorAll("li > .price").length > 1) {
                    const priceText = document.querySelector("li > .price").textContent
                    price = priceText.replace(/^\D+/g, '')
                    if (priceText.includes("CN")) { }
                    else if (priceText.includes("US")) {
                        price = Math.round(price / currencies.USD)
                    }
                }
                else price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
                //
                link = "https://www.allchinabuy.com/en/page/buy/selfservice/?from=search-input&url=" + url + "&name=" + name + "&price=" + price + "&freight=10.00&desc=" + description + "&image=" + encodeURIComponent(goodsImage)
            })
        }
    }
    document.querySelector(".goods-sizes").addEventListener("click", async () => {
        await sleep(0.3)
        if (document.querySelectorAll("li > .price").length > 1) {
            const priceText = document.querySelector("li > .price").textContent
            price = priceText.replace(/^\D+/g, '')
            if (priceText.includes("CN")) { }
            else if (priceText.includes("US")) {
                const currencies = await getCurrencies()
                price = Math.round(price / currencies.USD)
            }
        }
        else price = (document.querySelector(".foreign-currency") && document.querySelector(".foreign-currency").textContent.includes("CN")) ? document.querySelector(".foreign-currency > span").textContent : document.querySelector(".goods-txt").textContent.replace(/^\D+/g, '')
        link = "https://www.allchinabuy.com/en/page/buy/selfservice/?from=search-input&url=" + url + "&name=" + name + "&price=" + price + "&freight=10.00&desc=" + description + "&image=" + encodeURIComponent(goodsImage)
    })

    //HashCash with sha256
    const randomID = Math.random().toString(36).substring(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);
    const hashed = randomID + platform_link + "acbuy" + timestamp.toString();
    let hash;
    let nonce = 0;
    while (true) {
        nonce++;
        hash = await sha256(hashed + nonce.toString());
        if( hash.startsWith("0000")) break;
    }
    console.log("Hash: " + hash + ", Nonce: " + nonce, "ID: " + randomID, "Hashed: " + hashed + nonce.toString());

    const qcPics = document.querySelectorAll(".rc-preview-image > .rc-image > .rc-image-img")
    const qcLinks = []
    for (let i = 0; i < qcPics.length; i++) {
        qcLinks.push(qcPics[i].getAttribute("src"))
    }
    if (qcLinks.length > 0) {
        await backgroundFetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/add-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link: platform_link,
                agent: "acbuy",
                images: qcLinks,
                hashing: {
                    id: randomID,
                    hash: hash,
                    nonce: nonce,
                    timestamp: timestamp,
                }
            }),
            mode: "no-cors",
            credentials: "include"
        })
    }
}

async function addACBCartButtons() {
    addPriceConversionACBCart()
}

async function addQCButtons(platform_link) {
    const item = await getItem(platform_link)
    if (item === null || item.images === null || item.images === undefined) return
    const div = document.createElement("div")
    document.querySelector(".products-quality-control > .quality-control-content > .content-right").insertBefore(div, document.querySelector(".content-right > .quality-control-list"))
    if(document.querySelector(".products-quality-control > .quality-control-content > .content-right > p")) div.appendChild(document.querySelector(".products-quality-control > .quality-control-content > .content-right > p"))
    else {
        document.querySelector(".quality-control-content > div.content-right").style.alignItems = "end"
    }
    const hyperlink = document.createElement("a")
    div.appendChild(hyperlink)
    hyperlink.textContent = "View more\n(" + item.images.length + ")"
    hyperlink.href = getProductImagesLink(platform_link)
    hyperlink.target = "_blank"
}

async function addDIYOrderDetailsACB() {
    const query = getQuery()
    console.log(query)
    while (document.querySelectorAll('.goodsImg > input[type="file"]').length <= 0) await sleep(1)
    if (query.image) {
        //add image
        const designFile = await createFile(decodeURIComponent(query.image));
        const input = document.querySelector('.goodsImg > input[type="file"]');
        const dt = new DataTransfer();
        dt.items.add(designFile);
        input.files = dt.files;
        const event = new Event("change", {
            bubbles: !0,
        });
        input.dispatchEvent(event);
    }
}


window.addEventListener('load', async function () {
    if (!this.document.location.hostname.includes("allchinabuy.com")) return
    let beforeUrl = null
    while (true) {
        if (beforeUrl !== this.document.location.href && ((beforeUrl) ? !beforeUrl.includes("&partnercode=wrK9ge") && document.location.href.includes("&partnercode=" + myAffiliateCodeACB) : true)) {
            if (document.location.href.includes("/page/buy") && !(document.location.href.includes("/page/buy/selfservice"))) addACBItemButtons()
            else if (document.location.href.includes("/page/shoppingcart/")) addACBCartButtons()
            else if (document.location.href.includes("/page/buy/selfservice")) addDIYOrderDetailsACB()
            await sleep(2)
            beforeUrl = this.document.location.href
        }
        await sleep(0.2)
    }
})
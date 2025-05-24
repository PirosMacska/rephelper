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

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
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

    const hyperlink = document.createElement("a")
    document.querySelector(".qc-label").appendChild(hyperlink)
    hyperlink.textContent = "View more"
    hyperlink.style.color = "#31b38c"
    hyperlink.style.display = "block"
    hyperlink.style.cursor = "pointer"
    hyperlink.style.pointerEvents = "all"
    hyperlink.href = getProductImagesLink(platformLink)
    hyperlink.target = "_blank"

    try {
        let ans = await sha256("testmessage");
        if (ans !== "4209d1b6e775efbc9cddb255a84fe1252d7a61283d3e02a2766f3d16ed49b9b2") throw new Error("Test failed");
        console.log("Test passed");
    } catch (e) {
        errorMessage("Error", "Test failed. Please update your browser or try on a different device or browser.");
        console.error(e);
        return;
    }

    const qcIMGs = document.querySelectorAll(".qc-img > ul > li > img")

    //HashCash with sha256
    const randomID = Math.random().toString(36).substring(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);
    const hashed = randomID + platformLink + "acbuy" + timestamp.toString();
    let hash;
    let nonce = 0;
    while (true) {
        nonce++;
        hash = await sha256(hashed + nonce.toString());
        if( hash.startsWith("0000")) break;
    }
    console.log("Hash: " + hash + ", Nonce: " + nonce, "ID: " + randomID, "Hashed: " + hashed + nonce.toString());

    const qcLinks = []
    for (let i = 0; i < qcIMGs.length; i++) {
        qcLinks.push(qcIMGs[i].src.split("?")[0])
    }
    if (qcLinks.length > 0) {
        await backgroundFetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/add-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link: platformLink,
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

async function main () {
    if (!this.document.location.hostname.includes("acbuy.com")) return
    let beforeUrl = null
    while (true) {
        const query = getQuery()
        let beforeQuery
        try {
            beforeQuery = getQueryFromLink(beforeUrl)
        } catch {
            beforeQuery = {}
        }
        if ((beforeQuery.id !== query.id) || (beforeQuery.source !== query.source)) {
            if (document.location.href.includes("/product?")) addACBuyItemButtons()
            else if (document.location.href.includes("/uni-order?")) handleACBuyDIYOrder()

            await sleep(4)
            beforeUrl = this.document.location.href
        }
        await sleep(1)
    }
}
main();
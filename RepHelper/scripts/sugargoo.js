async function addPriceConversionSugargooItem() {
    const placement = document.querySelector(".price-wrap")
    const mainDiv = document.createElement("div")
    mainDiv.style.marginLeft = "30px"
    placement.appendChild(mainDiv)

    let price = document.querySelector(".price > span:nth-of-type(1)").textContent.replace("￥", "")
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#ff7103", 24)

    document.querySelector(".choose-sku__wrap").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector(".price > span:nth-of-type(1)").textContent.replace("￥", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = document.querySelector(".price > span:nth-of-type(1)").textContent.replace("￥", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addSugargooButtons() {
    let loaded = false;
    while (!loaded) {
        await sleep(0.5)
        if (this.document.querySelectorAll(".original-link").length > 0) loaded = true
    }
    addPriceConversionSugargooItem()
    const platform_link = document.querySelector(".original-link").href

    const placeToPutNewButtons = document.createElement("div")

    const copyButton = document.createElement("span")
    copyButton.innerHTML = '<span style="margin-top: 10px; margin-left: 10px" class="d-inline-block btn-tips" data-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Please select category"><button style="background: transparent; border-color: #D69847; color: #D69847;height: 30px; padding-top: 3px;" id="ACB" type="button" class="buy-now btn btn-primary btn-buy-lg js-ajax-order-submit" onclick="navigator.clipboard.writeText(\'' + platform_link + '\')" >Copy Link</button></span>'
    document.querySelector(".goods-name").appendChild(copyButton)

    document.querySelector(".choose-sku__wrap").appendChild(placeToPutNewButtons)
    placeToPutNewButtons.style.marginTop = "10px"
    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#ff7103", "brightness(0) saturate(100%) invert(71%) sepia(71%) saturate(6217%) hue-rotate(358deg) brightness(104%) contrast(100%)")

    if(document.querySelector(".photos-cont")) {
        const qcImages = document.querySelectorAll(".photos-cont > .ant-image > .ant-image-img")
        const qcLinks = []
        for(let i = 0; i < qcImages.length; i++) {
            qcLinks.push(qcImages[i].src)
        }
        await backgroundFetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/add-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link: platform_link,
                agent: "sugargoo",
                images: qcLinks
            }),
            mode: "no-cors",
            credentials: "include"
        })
    }
}

window.addEventListener('load', async function () {
    let beforeUrl = null
    while (true) {
        if (beforeUrl !== this.document.location.href) {
            if (document.location.href.startsWith("https://www.sugargoo.com/#/home/productDetail")) addSugargooButtons()
            beforeUrl = this.document.location.href
            await sleep(0.5)
        }
        await sleep(1)
    }
})
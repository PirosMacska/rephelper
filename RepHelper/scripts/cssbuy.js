async function addPriceConversionCSSBuyItem() {
    const placement = document.querySelector("#prightdiv > .price")
    const mainDiv = document.createElement("div")
    mainDiv.style.marginBottom = "10px"
    placement.appendChild(mainDiv)

    await sleep(1)
    let price = document.querySelector("#prightdiv > .price > span").textContent.split("≈")[0].replace(/^\D+/g, "")
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#6CBC2A", 32)

    document.querySelector("#sku_box").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector("#prightdiv > .price > span").textContent.split("≈")[0].replace(/^\D+/g, "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while(true) {
        await sleep(3)
        price = document.querySelector("#prightdiv > .price > span").textContent.split("≈")[0].replace(/^\D+/g, "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addCSSBuyItemButtons() {
    while (!document.querySelector("#prightdiv > .price")) {
        await sleep(1)
    }
    addPriceConversionCSSBuyItem()

    //agentselector
    const platform_link = "https://item.taobao.com/item.htm?id=" + window.location.href.split("item-")[1].replace(".html", "")
    const placeToPutNewButtons = document.querySelector("#prightdiv")

    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#6CBC2A", "brightness(0) saturate(100%) invert(61%) sepia(51%) saturate(615%) hue-rotate(50deg) brightness(96%) contrast(90%)")
}
async function main() {
    let beforeUrl = null
    while (true) {
        if(document.readyState === "complete") {
            if (beforeUrl !== this.window.location.href) {
                if (this.window.location.href.startsWith("https://cssbuy.com/item-")) addCSSBuyItemButtons()
                beforeUrl = this.window.location.href
                await sleep(5)
            }
        }
        await sleep(1)
    }   
}
main()
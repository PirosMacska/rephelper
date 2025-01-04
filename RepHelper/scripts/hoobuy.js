async function addPriceConversionHooBuyItem() {
    const placement = document.querySelector(".price-wrapper")
    const mainDiv = document.createElement("div")
    mainDiv.style.marginLeft = "5px"
    placement.appendChild(mainDiv)
    
    let price = document.querySelector(".price-num").textContent.split(" ≈")[0].split("CNY ¥ ")[1]
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#f0700c", 30)
    
    document.querySelector(".goods-detail-wrapper.goods-detail-layout").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector(".price-num").textContent.split(" ≈")[0].split("CNY ¥ ")[1]
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while(true) {
        await sleep(3)
        price = document.querySelector(".price-num").textContent.split(" ≈")[0].split("CNY ¥ ")[1]
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addHooBuyItemButtons() {
    let loaded = false;
    while (!loaded) {
        await sleep(0.5)
        if (this.document.querySelectorAll(".product-link").length > 0 && this.document.querySelector(".product-link").href !== "") loaded = true
    }
    await sleep(0.2)
    addPriceConversionHooBuyItem()

    document.body.style.overflow = "unset"

    let risk = false;
    let riskWindow = null;
    const risks = this.document.querySelectorAll(".risk-warning-wrapper")
    if(risks.length > 0) {
        risk = true
        riskWindow = risks[0]
    }
    if (risk) {
        const closeRiskReminderButton = this.document.createElement("button")
        closeRiskReminderButton.style.background = "transparent"
        closeRiskReminderButton.style.borderColor = "transparent"
        closeRiskReminderButton.style.position = "absolute"
        closeRiskReminderButton.style.left = "calc(100% - 32px)"
        closeRiskReminderButton.style.bottom = "calc(100% - 32px)"
        closeRiskReminderButton.style.cursor = "pointer"
        closeRiskReminderButton.textContent = "X"

        closeRiskReminderButton.addEventListener("click", () => {
            this.document.querySelector("body").removeChild(this.document.querySelector("body > .el-overlay"))
        })
        riskWindow.appendChild(closeRiskReminderButton)
    }

    const platform_link = this.document.querySelector(".product-link").href
    const name_element = document.querySelector(".product-name")

    const copyButton = document.createElement("span")
    copyButton.innerHTML = '<button data-v-d831b8cc="" aria-disabled="false" type="button" class="el-button hoo-primary" style="background-color: white; margin-left: 10px; height: 26px" onclick="navigator.clipboard.writeText(\'' + platform_link + '\')"><!--v-if--><span class="" style="color: #f0700c;">Copy platform link</span></button>'
    name_element.appendChild(copyButton)

    const placement = document.querySelector(".goods-detail-wrapper.goods-detail-layout")
    
    //agent selector
    const agentSelectButtonPlacement = document.createElement("div")
    agentSelectButtonPlacement.style.marginTop = "20px"
    placement.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placement.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#f0700c", "brightness(0) saturate(100%) invert(43%) sepia(98%) saturate(1648%) hue-rotate(360deg) brightness(100%) contrast(91%)")
}

window.addEventListener('load', async function () {
    if (!this.document.location.hostname.includes("hoobuy.com")) return
    let beforeUrl = null
    while (true) {
        if (beforeUrl !== this.document.location.href) {
            if (document.location.href.startsWith("https://hoobuy.com/product/")) addHooBuyItemButtons()
            beforeUrl = this.document.location.href
            await sleep(2.5)
        }
        await sleep(1)
    }
})
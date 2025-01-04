async function addPriceConversionPandabuyItem() {
    const placement = document.querySelector(".price-goods-discount-layout")
    const mainDiv = document.createElement("div")
    placement.appendChild(mainDiv)
    
    let price = document.querySelector(".price-goods-discount-layout > span").innerText.replace(/[^0-9.]/g, "")
    const mainConversionId = await addNewCurrencyDiv(mainDiv, document.querySelector(".price-goods-discount-layout > span > .price-linethrow.margin-left-10").textContent.replaceAll(" ", ""), price, "#1f7a36", 24)

    document.querySelector(".overview-right").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector(".price-goods-discount-layout > span").innerText.replace(/[^0-9.]/g, "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = document.querySelector(".price-goods-discount-layout > span").innerText.replace(/[^0-9.]/g, "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addPandaBuyButtons() {
    let loaded = false;
    while (!loaded) {
        await sleep(0.5)
        if (this.document.querySelectorAll(".overview-right").length > 0) loaded = true
    }
    document.body.style.overflow = "unset"
    addPriceConversionPandabuyItem()

    let risk = false;
    let riskWindow = null;
    const paragraphs = this.document.querySelectorAll("p")
    for (let k = 0; k < paragraphs.length; k++) {
        if (paragraphs[k].textContent.includes("Risk Reminder")) {
            risk = true
            riskWindow = paragraphs[k].parentElement.parentElement
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

        closeRiskReminderButton.addEventListener("click", () => {
            riskWindow.parentElement.parentElement.parentElement.parentElement.removeChild(riskWindow.parentElement.parentElement.parentElement)
            this.document.querySelector("body > div.v-modal").parentElement.removeChild(this.document.querySelector("body > div.v-modal"))
        })
        riskWindow.appendChild(closeRiskReminderButton)
    }

    const platform_link_element = document.querySelector(".goods-source-a")
    if (platform_link_element === null) return
    const platform_link = platform_link_element.href
    const agentSlectorPlacement = document.querySelector(".overview-right")
    const goodSource = this.document.querySelector("div.goods-source")

    const copyButton = this.document.createElement("span")

    copyButton.innerHTML = '<span data-v-222d92ec="" data-v-7f719106="" class="open-tips_container"><span data-v-222d92ec="" class="el-tooltip opentool-tips" aria-describedby="el-tooltip-3458" tabindex="0"><div data-v-7f719106=""><button data-v-7f719106=""class="enter-store el-link el-link--default" onclick="navigator.clipboard.writeText(\'' + platform_link + '\')" style="border-radius: 15px;background: white;height: 22px"><!----><span style="color: black; font-color: black; margin-left: 5px; margin-right: 5px" class="el-link--inner">Copy platform link</span><!----></a></div></span></span>'
    goodSource.appendChild(copyButton)

    //agentselector
    const agentSelectButtonPlacement = document.createElement("div")
    agentSelectButtonPlacement.style.width = (window.innerWidth - Math.round(document.querySelector(".overview-left").getBoundingClientRect().width) - 20).toString() + "px"
    agentSlectorPlacement.appendChild(agentSelectButtonPlacement)
    window.addEventListener("resize", () => {
        agentSelectButtonPlacement.style.width = (window.innerWidth - Math.round(document.querySelector(".overview-left").getBoundingClientRect().width) - 20).toString() + "px"
    })

    const agentSelector = document.createElement("div")
    agentSlectorPlacement.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#1f7a36", "brightness(0) saturate(100%) invert(38%) sepia(18%) saturate(1681%) hue-rotate(83deg) brightness(94%) contrast(92%)")
}

window.addEventListener('load', async function () {
    if (!this.document.location.hostname.includes("pandabuy.com")) return
    let beforeUrl = null
    let stillTest = true
    while (stillTest) {
        if (beforeUrl !== this.document.location.href) {
            if (document.location.href.startsWith("https://www.pandabuy.com/product") || document.location.href.startsWith("https://pandabuy.com/product")) {
                addPandaBuyButtons()
                stillTest = false
            }
            beforeUrl = this.document.location.href
            await sleep(2)
        }
        await sleep(0.3)
    }
})
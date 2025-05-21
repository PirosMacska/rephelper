const diyOrderButtonText = '<span class="d-inline-block btn-tips" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Please select category"><button id="DIYOrder" type="button" class="btn btn-primary btn-buy-lg btn-lg" data-product_id="422" data-product_sku="product" style="background-color: dimgray;border: 0;color: white;">DIY Order</button></span>'

async function addPriceConversionJoyaGooItem() {
    const placement = document.querySelector(".product-price-info")
    const mainDiv = document.createElement("div")
    placement.appendChild(mainDiv)

    let price

    price = document.querySelector(".product-price-cny").textContent.replace("CNY", "").replaceAll(" ", "")

    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#ea4c36", 20)

    document.querySelector(".product-attr").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector(".product-price-cny").textContent.replace("CNY", "").replaceAll(" ", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = document.querySelector(".product-price-cny").textContent.replace("CNY", "").replaceAll(" ", "")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addJoyaGooButtons() {
    let loaded = false;
    while (!loaded) {
        await sleep(0.5)
        if (this.document.querySelectorAll(".product-link").length > 0) loaded = true
    }

    const name = document.querySelector("div.product-title-info > span:nth-of-type(1)").textContent

    addPriceConversionJoyaGooItem()
    let platform_link = ""
    const query = getQuery()
    switch (query["platform"]) {
        case "ALI_1688":
            platform_link = "https://detail.1688.com/offer/" + query["id"] + ".html"
            break
        case "WEIDIAN":
            platform_link = "https://weidian.com/item.html?itemID=" + query["id"]
            break
        case "TAOBAO":
            platform_link = "https://item.taobao.com/item.htm?id=" + query["id"]
            break
    }

    const placeToPutNewButtons = document.createElement("div")
    placeToPutNewButtons.innerHTML = '<div class="d-flex align-items-center gap-2 w-100 w-md-auto p-2 p-md-0"></div>'

    const copyButton = document.createElement("span")
    copyButton.innerHTML = '<span style="margin-top: 10px; margin-left: 10px" class="d-inline-block btn-tips" data-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Please select category"><button style="background: transparent; border-color: #D69847; color: #D69847;height: 30px; padding-top: 3px;" id="ACB" type="button" class="buy-now btn btn-primary btn-buy-lg js-ajax-order-submit" onclick="navigator.clipboard.writeText(\'' + platform_link + '\')" >Copy Link</button></span>'
    document.querySelector(".product-title-info").appendChild(copyButton)

    document.querySelector(".product-purchase-btn-group").parentElement.insertBefore(placeToPutNewButtons, document.querySelector(".product-purchase-btn-group").nextSibling)
    placeToPutNewButtons.style.marginTop = "10px"
    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#FF5555", "brightness(0) saturate(100%) invert(58%) sepia(55%) saturate(6167%) hue-rotate(330deg) brightness(105%) contrast(100%)")

    //DIY Order
    /*const actionsContainer = document.querySelector("div.actions > div");
    actionsContainer.insertAdjacentHTML("beforeend", diyOrderButtonText)

    const price = document.querySelector(".cny").textContent
    const image = document.querySelector(".viewport > img.view-img").src

    const DIYOrderButton = document.querySelector("#DIYOrder")
    DIYOrderButton.addEventListener("click", () => {
        let specifications = ""

        const skuItemList = document.querySelectorAll(".sku-item > div.prop-name")
        for (let i = 0; i < skuItemList.length; i++) {
            specifications += skuItemList[i].textContent + "\n"
        }

        window.open("https://joyabuy.com/uniorder-order/?" + "price=" + encodeURIComponent(price) + "&url=" + encodeURIComponent(platform_link) + "&title=" + encodeURIComponent(name) + "&spec=" + encodeURIComponent(specifications) + "&image=" + image, "_blank")
    })*/
}

async function addJoyaGooDIYOrderDetails() {
    const query = getQuery()
    while (document.querySelectorAll(".page-content").length === 0) await sleep(1)
    const link_input = document.querySelector("input[name='product_link']")
    link_input.value = (query.url) ? decodeURIComponent(query.url) : ""

    const name_input = document.querySelector("input[name='product_name']")
    name_input.value = (query.title) ? decodeURIComponent(query.title) : ""

    const specifications_input = document.querySelector("textarea[name='specifications']")
    specifications_input.value = (query.spec) ? decodeURIComponent(query.spec) : ""

    const price_input = document.querySelector("input[name='unit_price_cny']")
    price_input.value = (query.price) ? decodeURIComponent(query.price) : "0"

    const domestic_fee_input = document.querySelector("input[name='user_fee_cny']")
    domestic_fee_input.value = (query.fee) ? decodeURIComponent(query.fee) : "10"

    if (query.image) {
        console.log(decodeURIComponent(query.image))
        await uploadImage(document.querySelector("input.layui-upload-file[type='file']"), decodeURIComponent(query.image))
    }
}

(async function main() {
    let beforeUrl = null
    while (true) {
        console.log(beforeUrl, document.location.href, beforeUrl !== this.document.location.href)
        if (beforeUrl !== this.document.location.href) {
            if (document.location.href.startsWith("https://joyagoo.com/product")) addJoyaGooButtons()
            if (document.location.href.startsWith("https://joyagoo.com/diy-order")) addJoyaGooDIYOrderDetails()
            await sleep(2)
            beforeUrl = this.document.location.href
        }
        await sleep(0.2)
    }
})();
const diyOrderButtonText = '<span class="d-inline-block btn-tips" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Please select category"><button id="DIYOrder" type="button" class="btn btn-outline-primary btn-buy-lg btn-lg" data-product_id="422" data-product_sku="product" style="background-color: dimgray;color: white;border: 3px solid dimgray;">DIY Order</button></span>'

async function addPriceConversionMuleBuyItem() {
    const placement = document.querySelector(".price")
    const mainDiv = document.createElement("div")
    placement.appendChild(mainDiv)

    let price = document.querySelector(".cny").textContent
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "CNY", price, "#ea4c36", 20)

    mainDiv.setAttribute("value", document.querySelector(".cny").textContent)
    document.querySelector("#js-skus").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector(".cny").textContent
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = document.querySelector(".cny").textContent
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addPriceConversionMuleBuyCart() {
    const placement = document.querySelector(".d-flex.justify-content-end.mt-3")
    const before = document.querySelector(".me-3")
    const mainDiv = document.createElement("div")
    mainDiv.style.marginRight = "20px"
    mainDiv.style.position = "relative"
    mainDiv.style.bottom = "8px"
    placement.insertBefore(mainDiv, before)

    let price = document.querySelector(".order-total").getAttribute("data-total_usd")
    const mainConversionId = await addNewCurrencyDiv(mainDiv, "USD", price, "#ea4c36", 22)

    mainDiv.setAttribute("value", document.querySelector(".order-total").getAttribute("data-total_usd"))
    document.querySelector(".woocommerce-cart-form__contents").addEventListener("click", async () => {
        await sleep(0.3)
        price = document.querySelector(".order-total").getAttribute("data-total_usd")
        changeValueOnCurrencyDiv(mainConversionId, price)
    })
    while (true) {
        await sleep(3)
        price = document.querySelector(".order-total").getAttribute("data-total_usd")
        changeValueOnCurrencyDiv(mainConversionId, price)
    }
}

async function addMuleBuyItemButtons() {
    let loaded = false;
    while (!loaded) {
        await sleep(0.5)
        if (this.document.querySelectorAll(".product-link.d-inline-flex.mx-2").length > 0) loaded = true
    }
    addPriceConversionMuleBuyItem()

    const name = document.querySelector(".goods-title > .title").textContent

    let platform_link = ""
    const query = getQuery()
    if (query["shop_type"] === "ali_1688") {
        platform_link = "https://detail.1688.com/offer/" + query["id"] + ".html"
    } else if (query["shop_type"] === "taobao") {
        platform_link = "https://item.taobao.com/item.htm?id=" + query["id"]
    } else if (query["shop_type"] === "tmall") {
        platform_link = "https://detail.tmall.com/item.htm?id=" + query["id"]
    } else if (query["shop_type"] === "weidian") {
        platform_link = "https://weidian.com/item.html?itemID=" + query["id"]
    }

    const placeToPutNewButtons = document.createElement("div")
    placeToPutNewButtons.innerHTML = '<div class="d-flex align-items-center gap-2 w-100 w-md-auto p-2 p-md-0"></div>'

    const copyButton = document.createElement("span")
    copyButton.innerHTML = '<span style="margin-top: 10px; margin-left: 10px" class="d-inline-block btn-tips" data-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Please select category"><button style="background: transparent; border-color: #D69847; color: #D69847;height: 30px; padding-top: 3px;" id="ACB" type="button" class="buy-now btn btn-primary btn-buy-lg js-ajax-order-submit" onclick="navigator.clipboard.writeText(\'' + platform_link + '\')" >Copy Link</button></span>'
    document.querySelector(".title").appendChild(copyButton)

    document.querySelector("#goods_form").parentElement.insertBefore(placeToPutNewButtons, document.querySelector("#goods_form").nextSibling)
    placeToPutNewButtons.style.marginTop = "10px"
    const agentSelectButtonPlacement = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelectButtonPlacement)

    const agentSelector = document.createElement("div")
    placeToPutNewButtons.appendChild(agentSelector)

    addNewAgentDiv(agentSelectButtonPlacement, agentSelector, platform_link, "#FF5555", "brightness(0) saturate(100%) invert(58%) sepia(55%) saturate(6167%) hue-rotate(330deg) brightness(105%) contrast(100%)")

    //DIY Order
    const actionsContainer = document.querySelector("div.actions > div");
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

        window.open("https://mulebuy.com/uniorder-order/?" + "price=" + encodeURIComponent(price) + "&url=" + encodeURIComponent(platform_link) + "&title=" + encodeURIComponent(name) + "&spec=" + encodeURIComponent(specifications) + "&image=" + image, "_blank")
    })
}

async function addMuleBuyCartButtons() {
    addPriceConversionMuleBuyCart()
}

async function addMuleBuyDIYOrderDetails() {
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

if (document.location.href.startsWith("https://mulebuy.com/product/?")) addMuleBuyItemButtons()
if (document.location.href.startsWith("https://mulebuy.com/my-account/cart/")) addMuleBuyCartButtons()
if (document.location.href.startsWith("https://mulebuy.com/uniorder-order/")) addMuleBuyDIYOrderDetails()
const product_element = '<div class="product-div new-element"><div class="item-description"><div class="product-image-div"><img src="" alt="product_image" class="product-img" width="320px"></div><div class="item-title-div"><span class="item-title">(Lorem ipsum odor amet, consectetuer adipiscing elit. Aliquetaliquam fringilla leo imperdiet interdum quis arcu porta nascetur mattis.)</span></div><div class="item-info"><a href="" target="_blank" class="item-link">taobao</a><span class="item-price">21.123.212 - 123.123.213 CNY</span><span class="item-sales">1210 sales</span></div></div><button href="https://google.com/" class="item-view" target="_blank">View Item</button><div class="main-price"></div><div class="low-price"></div><div class="high-price"></div></div>'
let loading = false

async function openProductPage(platform_link) {
    switch (agent_selector.value) {
        case "CNFans":
            window.open(await getCNFansLink(platform_link), "_blank")
            break
        case "AllChinaBuy":
            window.open(getACBLink(platform_link), "_blank")
            break
        case "MuleBuy":
            window.open(await getMuleBuyLink(platform_link), "_blank")
            break
        case "PandaBuy":
            window.open(getPandaBuyLink(platform_link), "_blank")
            break
        case "Sugargoo":
            window.open(getSugargooLink(platform_link), "_blank")
            break
        case "SuperBuy":
            window.open(getSuperBuyLink(platform_link), "_blank")
            break
        case "JoyaBuy":
            window.open(await getJoyaBuyLink(platform_link), "_blank")
            break
        case "HooBuy":
            window.open(await getHooBuyLink(platform_link), "_blank")
            break
        case "CSSBuy":
            window.open(getCSSBuyLink(platform_link), "_blank")
            break
        case "ACBuy":
            window.open(getACBuyLink(platform_link), "_blank")
            break
    }
}

function formatNumber(str) {
    let easyToRead = str.toString().split(".")[0].split(/(?=(?:...)*$)/)
    easyToRead = easyToRead.join(" ")
    easyToRead += (str.toString().split(".")[1]) ? "." + str.toString().split(".")[1].substring(0, 2) : ""
    return easyToRead
}

function getPriceText(item, currency) {
    return (item.lowPrice !== null && item.lowPrice !== undefined && item.lowPrice !== "" &&
        item.highPrice !== null && item.highPrice !== undefined && item.highPrice !== "" &&
        item.highPrice !== item.lowPrice) ? formatNumber(item.lowPrice).toString() + " - " + formatNumber(item.highPrice).toString() + " " + (currency || "CNY") : formatNumber(item.price).toString() + " " + (currency || "CNY")
}

const product_container = document.querySelector("#product-container")

const currency_selector = document.querySelector("select[name='currencies']")
const agent_selector = document.querySelector("select[name='agents']")

function addProduct(item) {
    if (!item) return
    product_container.insertAdjacentHTML("beforeend", product_element)
    document.querySelector(".new-element > .item-description > .item-title-div > .item-title").textContent = (item.fixedName !== null && item.fixedName !== "" && item.fixedName !== undefined) ? item.fixedName : item.name
    document.querySelector(".new-element > .item-description > .product-image-div > img.product-img").src = item.images[item.images.length - 1] || item.picUrl

    let high_price = item.highPrice
    let low_price = item.lowPrice
    let main_price = (item.price || item.priceSugargoo)

    document.querySelector(".new-element > .main-price").textContent = main_price
    document.querySelector(".new-element > .low-price").textContent = low_price
    document.querySelector(".new-element > .high-price").textContent = high_price

    main_price = Math.round(main_price * prices[currency_selector.value] * 100) / 100
    high_price = Math.round(high_price * prices[currency_selector.value] * 100) / 100
    low_price = Math.round(low_price * prices[currency_selector.value] * 100) / 100

    document.querySelector(".new-element > .item-description > .item-info > .item-price").textContent = getPriceText({ lowPrice: low_price, highPrice: high_price, price: main_price }, currency_selector.value)
    document.querySelector(".new-element > .item-description > .item-info > .item-sales").textContent = (item.sales + (item.salesSugargoo ?? 0)).toString() + " sales"
    document.querySelector(".new-element > .item-description > .item-info > .item-link").href = item.link
    let platform = ""
    if (item.link.includes("weidian.com")) platform = "weidian"
    else if (item.link.includes("taobao.com")) platform = "taobao"
    else if (item.link.includes("tmall.com")) platform = "tmall"
    else if (item.link.includes("1688.com")) platform = "1688"
    else if (item.link.includes("yangkeduo.com")) platform = "yangkeduo"
    document.querySelector(".new-element > .item-description > .item-info > .item-link").textContent = platform

    document.querySelector(".new-element > .item-description").addEventListener("click", () => {
        if (document.querySelector("a.item-link:hover")) return
        inspectItem(item)
    })

    document.querySelector(".new-element > button").addEventListener("click", () => {
        openProductPage(item.link)
    })
    document.querySelector(".new-element").setAttribute("class", "product-div" + ((item.highlight) ? " high-lighted-product" : ""))
}

currency_selector.addEventListener("change", () => {
    const all = document.querySelectorAll(".item-price")
    all.forEach(element => {
        let high_price
        let low_price
        let main_price
        const product_div_children = element.parentElement.parentElement.parentElement.children
        for (let i = 0; i < product_div_children.length; i++) {
            switch (product_div_children[i].getAttribute("class")) {
                case "main-price":
                    main_price = Number(product_div_children[i].textContent);
                    break;
                case "low-price":
                    low_price = Number(product_div_children[i].textContent);
                    break;
                case "high-price":
                    high_price = Number(product_div_children[i].textContent);
                    break;
            }
        }
        main_price = Math.round(main_price * prices[currency_selector.value] * 100) / 100
        high_price = Math.round(high_price * prices[currency_selector.value] * 100) / 100
        low_price = Math.round(low_price * prices[currency_selector.value] * 100) / 100
        element.textContent = getPriceText({ lowPrice: low_price, highPrice: high_price, price: main_price }, currency_selector.value)
    });
})

let sort = "sales"
let by = "DESC"
let search = ""
let page = 1
let hasMorePages = true
let loadingNextPage = false
let options = {}

function reset() {
    page = 1
    hasMorePages = true
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.removeEventListener("scroll", addDataIfBottom)
    while (document.querySelector("#product-container").firstElementChild) {
        document.querySelector("#product-container").removeChild(document.querySelector("#product-container").firstElementChild)
    }
}

async function fetchDatabase() {
    const settings = []
    const optionKeys = Object.keys(options)
    for (let i = 0; i < optionKeys.length; i++) {
        if (options[optionKeys[i]] === true) settings.push(optionKeys[i])
    }
    const settingsText = settings.join(",")
    const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get_sheet?limit=30&sort=" + sort + "&by=" + by + "&page=" + page.toString() + (((search !== null && search !== "") ? "&search=" + search : "") + "&options=" + settingsText), {
        "headers": {
        },
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    });
    const json = await res.json()
    if (json.result === "Success") return json.data
    return []
}

async function addDataIfBottom() {
    if (window.scrollY + window.innerHeight + 400 > document.body.clientHeight && loadingNextPage === false && hasMorePages === true) {
        loadingNextPage = true
        document.querySelector("#loading-spinner").style.display = "block"
        data = await fetchDatabase()
        page++
        for (let i = 0; i < data.length; i++) {
            if (data[i] == null) break
            addProduct(data[i])
        }
        loadingNextPage = false
        document.querySelector("#loading-spinner").style.display = "none"
        if (data[data.length - 1] == null) hasMorePages = false
    }
}

document.querySelector("select[name='sorting']").addEventListener("change", async () => {
    reset()
    sort = (document.querySelector("select[name='sorting']").value.includes("price")) ? "price" : "sales"
    by = (document.querySelector("select[name='sorting']").value.includes("DESC")) ? "DESC" : "ASC"
    await addDataIfBottom()
    document.addEventListener("scroll", addDataIfBottom)
})
document.querySelector("#text-search").addEventListener("keypress", async (e) => {
    if (e.which === 13) {
        reset()
        search = document.querySelector("#text-search").value
        await addDataIfBottom()
        document.addEventListener("scroll", addDataIfBottom)
    }
})

let prices

async function currencies() {
    prices = (await (await fetch("https://open.er-api.com/v6/latest/CNY")).json()).rates
    const codes = Object.keys(prices)
    for (let i = 0; i < codes.length; i++) {
        const option = document.createElement("option")
        option.textContent = codes[i]
        currency_selector.appendChild(option)
    }
    const currencies = document.querySelectorAll("#currency-selector > option")
    currencies.forEach((currency) => {
        if (currency.textContent === "EUR") currency.setAttribute("selected", "selected")
    })
}
document.querySelector("#agent-selector > option[value='AllChinaBuy']").setAttribute("selected", "selected")

async function main() {
    await currencies()
    reset()
    await addDataIfBottom()
    document.addEventListener("scroll", addDataIfBottom)
}
main()

async function sleep(seconds) {
    await new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    })
}

var canvas = document.querySelector("#resize-canvas");
var ctx = canvas.getContext("2d");

async function resizeImage(img) {
    return new Promise((resolve) => {
        img.onload = () => {
            // set size proportional to image
            canvas.width = 512
            canvas.height = canvas.width * (img.height / img.width);

            // step 1 - resize to 512px
            var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

            oc.width = 512;
            oc.height = 512;
            octx.drawImage(img, 0, 0, oc.width, oc.height);

            // step 2
            octx.drawImage(oc, 0, 0, 512, 512);

            // step 3, resize to final size
            ctx.drawImage(oc, 0, 0, 512, 512,
                0, 0, canvas.width, canvas.height);
            resolve(oc.toDataURL("image/png"))
        }
    })
}

async function searchImageFileInput() {
    if (loading) return
    loading = true
    const image = new Image()
    const objectURL = window.URL.createObjectURL(document.querySelector("#upload-image-input").files[0])
    image.src = objectURL
    let resizedB64
    const resizedDataURL = await resizeImage(image)
    resizedB64 = resizedDataURL.replace("data:image/png;base64,", "")

    const split = resizedB64.split(",")
    const base64 = split[split.length - 1]
    window.URL.revokeObjectURL(objectURL)
    loading = false
    return fetchBase64Image(base64)
}

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

async function getItems(array) {
    const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get-items", {
        method: "POST",
        body: JSON.stringify({
            links: array
        })
    })

    return (await res.json()).data
}

document.querySelector("#upload-image-btn").addEventListener("click", () => {
    document.querySelector("#upload-image-input").click()
})
async function addProductsFromImageSearchResponse(itemsByChance) {
    reset()
    if (itemsByChance.length === 0) {
        document.querySelector("#loading-spinner").style.display = "none"
        return
    }
    const itemLinks = []
    for (let i = 0; i < itemsByChance.length; i++) {
        if (!itemLinks.includes(itemsByChance[i].metadata.link)) itemLinks.push(itemsByChance[i].metadata.link)
    }
    const items = await getItems(itemLinks)
    document.querySelector("#loading-spinner").style.display = "none"
    for (let i = 0; i < items.length; i++) {
        addProduct(items[i])
    }
}
document.querySelector("#upload-image-input").addEventListener("change", async () => {
    try {
        reset()
        document.querySelector("#loading-spinner").style.display = "block"
        const itemsByChance = await searchImageFileInput()
        await addProductsFromImageSearchResponse(itemsByChance)
    } catch {
        reset()
    }
})

async function fetchBase64Image(base64) {
    try {
        const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/image-search", {
            method: "POST",
            body: JSON.stringify({
                "base64EncodedIMG": base64
            })
        })
        if (res.status !== 200) return []
        const json = await res.json()
        return json.data
    } catch {
        return []
    }
}

async function searchWithDataURL(dataURL) {
    const img = new Image()
    img.src = event.target.result
    let base64
    if (event.target.result.length > 200000) {
        const resizedDataURL = await resizeImage(img, 0.25)
        base64 = resizedDataURL.replace("data:image/png;base64,", "")
    }
    else base64 = event.target.result.replace("data:image/png;base64,", "")
    const itemsByChance = await fetchBase64Image(base64)
    return itemsByChance
}
document.onpaste = async function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (var index in items) {
        var item = items[index];
        if (item.kind === 'file') {
            var blob = item.getAsFile();
            var reader = new FileReader();
            reader.onload = async function (event) {
                if (loading) return
                loading = true
                const itemsByChance = await searchWithDataURL(event.target.result)
                await addProductsFromImageSearchResponse(itemsByChance)
                loading = false
            };

            reset()
            document.querySelector("#loading-spinner").style.display = "block"
            reader.readAsDataURL(blob)
        }
    }
};

function blockInputs() {
    document.querySelector("#input-blocker").style.display = "block"
    document.querySelector("body").style.overflowY = "hidden"
}

function allowInputs() {
    document.querySelector("#input-blocker").style.display = "none"
    document.querySelector("body").style.overflowY = "scroll"
}

const product_inspect = document.querySelector("#product-inspect")

document.querySelector("#product-inspect-x").addEventListener("click", () => {
    removeInspector()
})

function removeInspector() {
    while (document.querySelector("#product-inspect-images").firstElementChild) {
        document.querySelector("#product-inspect-images").removeChild(document.querySelector("#product-inspect-images").firstElementChild)
    }
    allowInputs()
    product_inspect.style.display = "none"
    document.querySelector("#product-inspect-x").style.display = "none"
}

async function inspectItem(item) {
    blockInputs()
    product_inspect.style.display = "block"
    document.querySelector("#product-inspect-x").style.display = "block"

    const first_image = document.createElement("img")
    first_image.src = item.picUrl
    first_image.setAttribute("alt", "")
    first_image.setAttribute("class", "inspect-image")
    document.querySelector("#product-inspect-images").appendChild(first_image)

    item.images.forEach(image => {
        const new_image = document.createElement("img")
        new_image.src = image
        new_image.setAttribute("alt", "")
        new_image.setAttribute("class", "inspect-image")
        document.querySelector("#product-inspect-images").appendChild(new_image)
    });
}

function getQueryFromLink(link) {
    if (!link.includes("?")) return {}
    const search = link.split("?")[1]
    const splitted = search.split("&")
    let query = {}
    for (let i = 0; i < splitted.length; i++) {
        const s = splitted[i].split("=")
        query[s[0]] = s[1]
    }
    return query
}

function random_uuid4() {
    let array = new Uint8Array(16)
    for (let i = 0; i < array.length; i++) {
        array[i] = Math.round(Math.random() * 255)
    }

    array[8] &= 0b00111111
    array[8] |= 0b10000000

    array[6] &= 0b00001111
    array[6] |= 0b01000000

    const pattern = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    let idx = 0

    return pattern.replace(
        /XX/g,
        () => array[idx++].toString(16).padStart(2, "0"),
    )
}

//https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-hash-from-a-string-in-javascript-node-js
const MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

async function getHooBuyLink(platform_link) {
    const query = getQueryFromLink(platform_link)

    let channel = -1
    let id = -1
    if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        channel = 1
        id = query["id"]
    } else if (platform_link.includes("weidian.com")) {
        channel = 2
        id = query["itemID"]
    } else if (platform_link.includes("1688.com")) {
        channel = 0
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (channel === -1 || id === -1 || channel === undefined || id === undefined) return await getHooBuyLinkAPI(platform_link)
    return "https://hoobuy.com/product/" + channel + "/" + id
}

async function getHooBuyLinkAPI(platform_link) {
    let nonce = random_uuid4()
    const sign = MD5(nonce + "980683EF-46C6-47D5-80C1-7B2CB6B2D0BF")

    let res = await fetch("https://api.hoobuy.com/hoobuy_order/pub/get/goods/id/by/url", {
        "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "x-channel-id": "",
            "x-client-id": "",
            "x-fbclid": "",
            "x-nonce": nonce,
            "x-platform": "web",
            "x-signature": sign,
            "x-token": "",
            "x-version": "hoobuy-production-web-1.0",
        },
        "body": "{\"url\":\"" + platform_link + "\"}",
        "method": "POST"
    });
    res = await res.json()
    return "https://hoobuy.com/product/" + res.data.channel + "/" + res.data.offerId
}

function getACBLink(platform_link) {
    return 'https://www.allchinabuy.com/en/page/buy/?nTag=Home-search&from=search-input&_search=url&position=&url=' + encodeURIComponent(platform_link) + "&partnercode=" + myAffiliateCodeACB
}
function getSuperBuyLink(platform_link) {
    return 'https://www.superbuy.com/en/page/buy/?nTag=Home-search&from=search-input&_search=url&position=&url=' + encodeURIComponent(platform_link) + "&partnercode=" + myAffiliateCodeSuperBuy
}
function getPandaBuyLink(platform_link) {
    return 'https://www.pandabuy.com/product?url=' + encodeURIComponent(platform_link)
}

async function getCNFansLink(platform_link) {
    const query = getQueryFromLink(platform_link)

    let platform = -1
    let id = -1
    if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        platform = "taobao"
        id = query["id"]
    } else if (platform_link.includes("weidian.com")) {
        platform = "weidian"
        id = query["itemID"]
    } else if (platform_link.includes("detail.1688.com")) {
        platform = "ali_1688"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (platform === -1 || id === -1 || platform === undefined || id === undefined) return await getCNFansLinkAPI(platform_link)
    return "https://cnfans.com/product/?shop_type=" + platform + "&id=" + id
}

function getACBuyLink(platform_link) {
    const query = getQueryFromLink(platform_link)

    let source = ""
    let id = 0
    console.log(platform_link, query)
    if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        source = "TB"
        id = query["id"]
    } else if (platform_link.includes("weidian.com")) {
        source = "WD"
        id = query["itemId"]
    } else if (platform_link.includes("1688.com")) {
        source = "AL"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    return "https://acbuy.com/product?id=" + id + "&source=" + source
}

async function getMuleBuyLink(platform_link) {
    const query = getQueryFromLink(platform_link)

    let platform = -1
    let id = -1
    if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        platform = "taobao"
        id = query["id"]
    } else if (platform_link.includes("weidian.com")) {
        platform = "weidian"
        id = query["itemID"]
    } else if (platform_link.includes("1688.com")) {
        platform = "ali_1688"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (platform === -1 || id === -1 || platform === undefined || id === undefined) return await getMuleBuyLinkAPI(platform_link)
    return "https://mulebuy.com/product/?shop_type=" + platform + "&id=" + id
}

async function getMuleBuyLinkAPI(platform_link) {
    const res = await (await fetch("https://mulebuy.com/search-info/search?Url=" + encodeURIComponent(platform_link))).json()
    const link = "https://mulebuy.com/product/?shop_type=" + res.data.result.platForm + "&id=" + res.data.result.productId
    return link
}

async function getJoyaBuyLink(platform_link) {
    const query = getQueryFromLink(platform_link)

    let platform = -1
    let id = -1
    if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        platform = "taobao"
        id = query["id"]
    } else if (platform_link.includes("weidian.com")) {
        platform = "weidian"
        id = query["itemID"]
    } else if (platform_link.includes("1688.com")) {
        platform = "ali_1688"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (platform === -1 || id === -1 || platform === undefined || id === undefined) return await getJoyaBuyLinkAPI(platform_link)
    return "https://joyabuy.com/product/?shop_type=" + platform + "&id=" + id
}

async function getJoyaBuyLinkAPI(platform_link) {
    const res = await (await fetch("https://joyabuy.com/search-info/search?Url=" + encodeURIComponent(platform_link))).json()
    const link = "https://joyabuy.com/product/?shop_type=" + res.data.result.platForm + "&id=" + res.data.result.productId
    return link
}

async function getCNFansLinkAPI(platform_link) {
    const res = await (await fetch("https://cnfans.com/search-info/search?Url=" + encodeURIComponent(platform_link))).json()
    const link = "https://cnfans.com/product/?shop_type=" + res.data.result.platForm + "&id=" + res.data.result.productId
    return link
}

function getSugargooLink(platform_link) {
    const link = "https://www.sugargoo.com/#/home/productDetail?productLink=" + encodeURIComponent(platform_link).replaceAll("%2F", "%252F").replaceAll("%3A", "%253A").replaceAll("%3F", "%253F").replaceAll("%3D", "%253D").replaceAll("%26", "%2526") + "&memberId=" + myAffiliateCodeSugargoo
    return link
}

async function getCSSBuyLink(platform_link) {
    if (platform_link.includes("weidian") || platform_link.includes("1688.com")) return null
    const link = "https://cssbuy.com/item-" + (getQueryFromLink(decodeURIComponent(platform_link)).id) + ".html"
    return link
}

const settingsButton = document.querySelector("#settings-button")
const settingsPopup = document.querySelector("#settings-popup")

settingsButton.addEventListener("click", () => {
    if (settingsPopup.style.display !== "block") settingsPopup.style.display = "block"
    else settingsPopup.style.display = "none"
})

const settingsWindow = document.querySelector("#settings-window")
async function addSetting(text) {
    const div = document.createElement("div")
    const optionCheckbox = document.createElement("input")
    optionCheckbox.type = "checkbox"
    optionCheckbox.setAttribute("class", "setting-checkbox")

    const optionText = document.createElement("span")
    optionText.textContent = text

    div.appendChild(optionCheckbox)
    div.appendChild(optionText)

    settingsWindow.insertBefore(div, applySettingsButton)

    options[text] = false
    optionCheckbox.addEventListener("click", () => {
        options[text] = optionCheckbox.checked
    })
}

const applySettingsButton = document.querySelector("#apply-settings-button")
applySettingsButton.addEventListener("click", async () => {
    reset()
    search = document.querySelector("#text-search").value
    await addDataIfBottom()
    document.addEventListener("scroll", addDataIfBottom)
})

async function addSettings() {
    const categories = await (await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get-categories")).json()
    for (let i = 0; i < categories.length; i++) {
        addSetting(categories[i])
    }
}
addSettings()

const myAffiliateCodeACB = "wrK9ge"
const myAffiliateCodeCNFans = "287179"
const myAffiliateCodeMuleBuy = "200024594"
const myAffiliateCodeSugargoo = "1309026317230709277"
const myAffiliateCodeSuperBuy = "wyf43X"
const myAffiliateCodeACB = "wrK9ge"
const myAffiliateCodeCNFans = "287179"
const myAffiliateCodeMuleBuy = "200024594"
const myAffiliateCodeJoyaGoo = "300110510"
const myAffiliateCodeSugargoo = "1309026317230709277"
const myAffiliateCodeSuperBuy = "wyf43X"
const myAffiliateCodeHoobuy = "6ED2LpOR"
const myAffiliateCodeACBuy = "UC6GKS"
const absolutePath = chrome.runtime.getURL("/")

const displayCurrnecyEvent = new Event("display")
function displayCurrnecy() {
    document.body.dispatchEvent(displayCurrnecyEvent)
}

function makeNumEasierToRead(str) {
    let easyToRead = str.toString().split(".")[0].split(/(?=(?:...)*$)/)
    easyToRead = easyToRead.join(" ")
    easyToRead += (str.toString().split(".")[1]) ? "." + str.toString().split(".")[1].substring(0, 2) : ""
    return easyToRead
}

async function sleep(seconds) {
    await new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    })
}

function quickSort(arr, func) {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr[0];
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < arr.length; i++) {
        if (func(arr[i], pivot)) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    return [...(quickSort(leftArr, func)), pivot, ...(quickSort(rightArr, func))];
};

function getQuery() {
    const splitted = document.location.search.slice(1, document.location.search.length).split("&")
    let query = {}
    for (let i = 0; i < splitted.length; i++) {
        const s = splitted[i].split("=")
        query[s[0]] = s[1]
    }
    return query
}

function viewProductImages(platform_link) {
    const inspectorLink = chrome.runtime.getURL("/page/product-view/index.html") + "?link=" + encodeURIComponent(platform_link)
    window.open(inspectorLink)
}

function getProductImagesLink(platform_link) {
    return chrome.runtime.getURL("/page/product-view/index.html") + "?link=" + encodeURIComponent(platform_link)
}

async function getItem(platform_link) {
    const res = await backgroundFetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get-item?link=" + encodeURIComponent(platform_link), {
        method: "GET"
    })

    try {
        const json = JSON.parse(res).data
        return json
    } catch {
        return null
    }
}

function setQuery(query) {
    const keys = Object.keys(query)
    let string = "?"
    for (let i = 0; i < keys.length; i++) {
        string += query[keys[i]] + (i === keys.length - 1) ? "" : "&"
    }
    return query
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
        id = query["itemID"] || query["itemId"]
    } else if (platform_link.includes("1688.com")) {
        channel = 0
        id = platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (channel === -1 || id === -1) return await getHooBuyLinkAPI(platform_link)
    return "https://hoobuy.com/product/" + channel + "/" + id
}

async function getHooBuyLinkAPI(platform_link) {
    let nonce = random_uuid4()
    const sign = MD5(nonce + "980683EF-46C6-47D5-80C1-7B2CB6B2D0BF")

    let res = await backgroundFetch("https://api.hoobuy.com/hoobuy_order/pub/get/goods/id/by/url", {
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
    res = JSON.parse(res)
    if (!res.data.channel || !res.data.offerId) return null
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
        id = query["itemId"]
    } else if (platform_link.includes("detail.1688.com")) {
        platform = "ali_1688"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (platform === -1 || id === -1 || platform === undefined || id === undefined) return await getCNFansLinkAPI(platform_link)
    return "https://cnfans.com/product/?shop_type=" + platform + "&id=" + id
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
        id = query["itemId"]
    } else if (platform_link.includes("1688.com")) {
        platform = "ali_1688"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (platform === -1 || id === -1 || platform === undefined || id === undefined) return await getMuleBuyLinkAPI(platform_link)
    return "https://mulebuy.com/product/?shop_type=" + platform + "&id=" + id
}

async function getMuleBuyLinkAPI(platform_link) {
    const res = JSON.parse(await chrome.runtime.sendMessage(
        {
            name: "fetchUrl",
            url: "https://mulebuy.com/search-info/search?Url=" + encodeURIComponent(platform_link),
        }))
    if (!res.data.result.platForm || !res.data.result.productId) return null
    const link = "https://mulebuy.com/product/?shop_type=" + res.data.result.platForm + "&id=" + res.data.result.productId
    return link
}

async function getJoyaGooLink(platform_link) {
    const query = getQueryFromLink(platform_link)

    let platform = -1
    let id = -1
    if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        platform = "TAOBAO"
        id = query["id"]
    } else if (platform_link.includes("weidian.com")) {
        platform = "WEIDIAN"
        id = query["itemId"]
    } else if (platform_link.includes("1688.com")) {
        platform = "ALI_1688"
        id = query["itemId"] || platform_link.split("/offer/")[1].split(".html")[0]
    }

    if (platform === -1 || id === -1 || platform === undefined || id === undefined) return await getJoyaGooLinkAPI(platform_link)
    return "https://joyagoo.com/product?platform=" + platform + "&id=" + id
}

async function getJoyaGooLinkAPI(platform_link) {
    const res = JSON.parse(await chrome.runtime.sendMessage(
        {
            name: "fetchUrl",
            url: "https://joyagoo.com/search-info/search?input=" + encodeURIComponent(platform_link),
        }))
    if (!res.data.result.platform || !res.data.result.productID) return null
    const link = "https://joyagoo.com/product?platform=" + res.data.result.platform + "&id=" + res.data.result.productID
    return link
}

async function getCNFansLinkAPI(platform_link) {
    const res = JSON.parse(await chrome.runtime.sendMessage(
        {
            name: "fetchUrl",
            url: "https://cnfans.com/search-info/search?Url=" + encodeURIComponent(platform_link),
        }))
    if (!res.data.result.platForm || !res.data.result.productId) return null
    const link = "https://cnfans.com/product/?shop_type=" + res.data.result.platForm + "&id=" + res.data.result.productId
    return link
}

function getSugargooLink(platform_link) {
    const link = "https://www.sugargoo.com/#/home/productDetail?productLink=" + encodeURIComponent(platform_link).replaceAll("%2F", "%252F").replaceAll("%3A", "%253A").replaceAll("%3F", "%253F").replaceAll("%3D", "%253D").replaceAll("%26", "%2526") + "&memberId=" + myAffiliateCodeSugargoo
    return link
}

async function getCSSBuyLink(platform_link) {
    let placeholder = ""
    let ID = ""
    const query = getQueryFromLink(platform_link)
    if (platform_link.includes("weidian.com")) {
        placeholder = "micro-"
        ID = query.itemId || query.itemID
    }
    else if (platform_link.includes("1688.com")) {
        placeholder = "1688-"
        ID = platform_link.split("/offer/")[1].split(".html")[0]
    }
    else if (platform_link.includes("tmall.com") || platform_link.includes("taobao.com")) {
        placeholder = ""
        ID = query.id
    }
    else return null
    const link = "https://cssbuy.com/item-" + placeholder + ID + ".html"
    return link
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

async function backgroundFetch(url_, options_) {
    const res = await chrome.runtime.sendMessage(
        {
            name: "fetchUrl",
            url: url_,
            options: options_,
        })
    return res
}

async function createFile(url) {
    let response = await fetch(url);
    const data = await response.blob()
    let metadata = {
        type: "image/png",
    };
    return new File([data], (url.endsWith(".jpg")) ? "random-image.jpg" : "random-image.png", metadata);
}

async function uploadImage(input, image) {
    const designFile = await createFile(decodeURIComponent(image));
    const dt = new DataTransfer();
    dt.items.add(designFile);
    input.files = dt.files;
    const event = new Event("change", {
        bubbles: !0,
    });
    input.dispatchEvent(event);
}

function backgroundLog(text) {
    chrome.runtime.sendMessage({ name: "consoleLog", log: text })
}

async function getUserAboutInfoACB(PHP_SESSID) {
    let res = JSON.parse(await backgroundFetch("https://front.allchinabuy.com/user/info/about-info", {
        "headers": {
            "cookie": "PHPSESSID=" + PHP_SESSID + ";"
        },
        credentials: "include"
    }))
    return res.data
}

async function getUserAboutInfoSuperBuy(PHP_SESSID) {
    let res = JSON.parse(await backgroundFetch("https://front.superbuy.com/user/info/about-info", {
        "headers": {
            "cookie": "PHPSESSID=" + PHP_SESSID + ";"
        },
        credentials: "include"
    }))
    return res.data
}

async function getCookie(url_, name_) {
    return await chrome.runtime.sendMessage({ name: "getCookie", url: url_, cookie_name: name_ })
}

async function setCookie(url_, name_, value_, secure_, expirationDate_) {
    chrome.runtime.sendMessage({ name: "setCookie", url: url_, cookie_name: name_, value: value_, secure: secure_ || false, expirationDate: expirationDate_ || (new Date().getFullYear() + 1).toString() })
}

async function getCurrencies() {
    return await chrome.runtime.sendMessage({ name: "getCurrencies" })
}

async function isOpenAgentEnabled() {
    const res = await chrome.storage.local.get(["open_agent"])
    if (res.open_agent == null || res.open_agent == undefined) {
        chrome.storage.local.set({ "open_agent": false });
        res.open_agent = false
    }
    return res.open_agent
}

async function getPreferredAgent() {
    res = await chrome.storage.local.get(["preferred_agent"])
    return res.preferred_agent
}

async function openLinkOnPreferredAgent(platform_link) {
    let agent_link;
    switch (await getPreferredAgent()) {
        case "CNFans":
            agent_link = await getCNFansLink(platform_link)
            break
        case "AllChinaBuy":
            agent_link = getACBLink(platform_link)
            break
        case "MuleBuy":
            agent_link = await getMuleBuyLink(platform_link)
            break
        case "PandaBuy":
            agent_link = getPandaBuyLink(platform_link)
            break
        case "Sugargoo":
            agent_link = getSugargooLink(platform_link)
            break
        case "SuperBuy":
            agent_link = getSuperBuyLink(platform_link)
            break
        case "JoyaGoo":
            agent_link = await getJoyaGooLink(platform_link)
            break
        case "HooBuy":
            agent_link = await getHooBuyLink(platform_link)
            break
        case "CSSBuy":
            agent_link = getCSSBuyLink(platform_link)
            break
        case "ACBuy":
            agent_link = getACBuyLink(platform_link)
            break
    }
    if (!agent_link) return
    else window.open(agent_link, "_self")
}
async function doesUseProductAffiliate() {
    const bool = ((await chrome.storage.local.get(["pcode"])).pcode == false) ? false : true
    return bool
}

async function doesUseRewriteCart() {
    const bool = ((await chrome.storage.local.get(["rewritec"])).rewritec == false) ? false : true
    backgroundLog(bool)
    return bool
}

async function setLastCheckedCartTimeACB(time) {
    await chrome.storage.local.set({"lastCheckedACB": time})
}
async function getLastCheckedCartTimeACB() {
    return (await chrome.storage.local.get(["lastCheckedACB"])).lastCheckedACB || 0
}

async function setLastCheckedCartTimeSuperBuy(time) {
    await chrome.storage.local.set({"lastCheckedSPB": time})
}
async function getLastCheckedCartTimeSuperBuy() {
    return (await chrome.storage.local.get(["lastCheckedSPB"])).lastCheckedSPB || 0
}

///////AllChinaBuy///////
async function addEntireCartACB(shopItems, sessId, userId) {
    const body = {
        "shopItems": shopItems,
        "type": 1,
        "userId": userId
    }
    const res = await backgroundFetch("https://front.allchinabuy.com/cart/add-cart", {
        "headers": {
            "cookie": "PHPSESSID=" + sessId + ";",
            "Content-Type": "application/json; charset=UTF-8"
        },
        "body": JSON.stringify(body),
        "method": "POST",
        credentials: "include"
    })
}

async function removeMultipleItemsFromCartACB(items, sessId) {
    const res = JSON.parse(await backgroundFetch("https://front.allchinabuy.com/cart/cart-del", {
        "headers": {
            "cookie": "PHPSESSID=" + sessId + ";",
            "Content-Type": "application/json; charset=UTF-8"
        },
        "body": '{"goodsCodes":"' + items.join(",") + '","rebateGoodList":[]}',
        "method": "POST"
    }))
    if(res.msg === "Success") return true
    else return false
}

async function getUserIdACB(PHP_SESSID) {
    let res = JSON.parse(await backgroundFetch("https://front.allchinabuy.com/user/info/about-info", {
        "headers": {
            "cookie": "PHPSESSID=" + PHP_SESSID + ";",
            "Accept-Language": "en-US"
        },
        credentials: "include"
    }))
    if(res.msg !== "Success" && res.msg !== "获取用户信息成功") {
        backgroundLog("Error: " + res.msg)
        return false 
    }
    return res.data.user_id
}

async function getCartACB(PHP_SESSID) {
    let res = JSON.parse(await backgroundFetch("https://front.allchinabuy.com/cart/list-cart", {
        "headers": {
            "cookie": "PHPSESSID=" + PHP_SESSID + ";"
        },
        "body": null,
        "method": "GET",
        credentials: "include"
    }))
    return res
}

///////SUPERBUY/////////
async function addEntireCartSuperBuy(shopItems, sessId, userId) {
    const body = {
        "shopItems": shopItems,
        "type": 1,
        "userId": userId
    }
    await backgroundFetch("https://front.superbuy.com/cart/add-cart", {
        "headers": {
            "cookie": "PHPSESSID=" + sessId + ";",
            "Content-Type": "application/json; charset=UTF-8"
        },
        "body": JSON.stringify(body),
        "method": "POST",
        credentials: "include"
    })
}

async function removeMultipleItemsFromCartSuperBuy(items, sessId) {
    const res = JSON.parse(await backgroundFetch("https://front.superbuy.com/cart/cart-del", {
        "headers": {
            "cookie": "PHPSESSID=" + sessId + ";",
            "Content-Type": "application/json; charset=UTF-8"
        },
        "body": '{"goodsCodes":"' + items.join(",") + '","rebateGoodList":[]}',
        "method": "POST"
    }))
    if(res.msg === "Success") return true
    else return false
}

async function getUserIdSuperBuy(PHP_SESSID) {
    let res = JSON.parse(await backgroundFetch("https://front.superbuy.com/user/info/about-info", {
        "headers": {
            "cookie": "PHPSESSID=" + PHP_SESSID + ";",
            "Accept-Language": "en-US"
        },
        credentials: "include"
    }))
    if(res.msg !== "Success" && res.msg !== "获取用户信息成功") {
        backgroundLog("Error: " + res.msg)
        return false 
    }
    return res.data.user_id
}

async function getCartSuperBuy(PHP_SESSID) {
    let res = JSON.parse(await backgroundFetch("https://front.superbuy.com/cart/list-cart", {
        "headers": {
            "cookie": "PHPSESSID=" + PHP_SESSID + ";"
        },
        "body": null,
        "method": "GET",
        credentials: "include"
    }))
    return res
}
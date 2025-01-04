async function rewriteTrackNoInCartACB(sessId) {
    const cart = await getCartACB(sessId)
    const userId = await getUserIdACB(sessId)
    if(userId === false) return false
    backgroundLog("cart contents: \n" + JSON.stringify(cart))
    const goodsCodes = []
    let allItemUseAffiliate = true
    const shopItems = cart.data.shopItems
    for (let i = 0; i < shopItems.length; i++) {
        const shop = shopItems[i]
        for (let j = 0; j < shop.goodsItems.length; j++) {
            const item = shop.goodsItems[j]
            if(item.trackNo !== myAffiliateCodeACB) allItemUseAffiliate = false
            item.trackNo = myAffiliateCodeACB
            goodsCodes.push(item.goodsCode)
        }
    }
    if(!allItemUseAffiliate) {
        if(await removeMultipleItemsFromCartACB(goodsCodes, sessId)) await addEntireCartACB(shopItems, sessId, userId)
    }
    return true
}

async function addPartnerCodeACB() {
    if (await doesUseProductAffiliate() === false || !window.location.href.includes("page/buy/") || window.location.href.includes("page/buy/selfservice")) { }
    else if (!window.location.search.includes("&partnercode=") && !window.location.search.includes("&trackNo=") ) window.history.replaceState({}, document.title, window.location.href + "&partnercode=" + myAffiliateCodeACB);
    else {
        const currentSearch = window.location.search.slice(1, window.location.search.length)
        let newQueryString = "?";
        const queryStrings = currentSearch.split("&")
        for (let i = 0; i < queryStrings.length; i++) {
            if (queryStrings[i].split("=")[0] === "partnercode" || queryStrings[i].split("=")[0] === "trackNo") newQueryString += "partnercode=" + myAffiliateCodeACB
            else newQueryString += queryStrings[i]
            if (queryStrings.length - 1 > i) newQueryString += "&"
        }
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname + newQueryString);
    }
}

async function main() {
    if(await doesUseProductAffiliate()) addPartnerCodeACB()
        
    //MAJOR FLAW DO NOT REIMPLEMENT// (idk why its still here just commented out)
    /*backgroundLog("Use rewrite cart?...")
    if (!await doesUseRewriteCart()) {
        backgroundLog("No")
        return
    }
    backgroundLog("Yes")
    return
    const currentTime = new Date().getTime()
    const lastTimeChecked = await getLastCheckedCartTimeACB()
    backgroundLog("Checking cart time... " + lastTimeChecked)
    if (currentTime < lastTimeChecked + 1800000) {
        backgroundLog(((1800000 - (currentTime - lastTimeChecked)) / 1000).toString() + " seconds till cart check")
        return
    }
    const sessId = await getCookie("https://www.allchinabuy.com", "PHPSESSID")
    backgroundLog("Managing cart affiliates")
    if (sessId !== null) {
        if(await rewriteTrackNoInCartACB(sessId)) setLastCheckedCartTimeACB(currentTime)
    } else backgroundLog("No session id!")*/
}

main()
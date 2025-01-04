async function addPartnerCodeACBuy() {
    if (await doesUseProductAffiliate() === false || !window.location.href.includes("/product?") ) return
    
    if (!window.location.search.includes("&u=")) window.history.replaceState({}, document.title, window.location.href + "&u=" + myAffiliateCodeACBuy);
    else {
        const currentSearch = window.location.search.slice(1, window.location.search.length)
        let newQueryString = "?";
        const queryStrings = currentSearch.split("&")
        for (let i = 0; i < queryStrings.length; i++) {
            if (queryStrings[i].split("=")[0] === "u") newQueryString += "u=" + myAffiliateCodeACBuy
            else newQueryString += queryStrings[i]
            if (queryStrings.length - 1 > i) newQueryString += "&"
        }
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname + newQueryString);
    }
}

async function main() {
    if(await doesUseProductAffiliate()) addPartnerCodeACBuy()
}

main()
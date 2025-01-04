async function addPartnerCodeMuleBuy() {
    if (await doesUseProductAffiliate() === false || !window.location.href.includes("/product")) { }
    else {
        if (!window.location.search.includes("&ref=")) window.history.replaceState({}, document.title, window.location.href + "&ref=" + myAffiliateCodeMuleBuy);
        else {
            const currentSearch = window.location.search.slice(1, window.location.search.length)
            let newQueryString = "?";
            const queryStrings = currentSearch.split("&")
            for (let i = 0; i < queryStrings.length; i++) {
                if (queryStrings[i].split("=")[0] === "ref") newQueryString += "ref=" + myAffiliateCodeMuleBuy
                else newQueryString += queryStrings[i]
                if (queryStrings.length - 1 > i) newQueryString += "&"
            }
            window.history.replaceState({}, document.title, window.location.origin + window.location.pathname + newQueryString);
        }

        let loaded = false;
        while (!loaded) {
            await sleep(0.5)
            if (this.document.querySelectorAll(".product-link.d-inline-flex.mx-2").length > 0) loaded = true
        }
        const refferal_token = await getCookie("https://mulebuy.com", "yith_wcaf_referral_token")
        const cookie = (refferal_token == null) ? "" : refferal_token.toString()
        if (cookie !== myAffiliateCodeMuleBuy) {
            await setCookie("https://mulebuy.com", "yith_wcaf_referral_token", myAffiliateCodeMuleBuy)
        }
    }
}

addPartnerCodeMuleBuy()
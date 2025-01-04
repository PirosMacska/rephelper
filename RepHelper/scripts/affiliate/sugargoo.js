async function addPartnerCodeSugargoo() {
    if (!window.location.href.includes("/home/productDetail")) { }
    else if (!window.location.href.includes("&memberId=")) {
        window.open(window.location.href + "&memberId=" + myAffiliateCodeSugargoo + "&pcode=t", "_self");
        location.reload()
    }
    else {
        if(window.location.href.includes("pcode=t")) return
        const currentSearch = window.location.href.split("?")[1]
        let newQueryString = "?";
        newQueryString += "pcode=t&"
        const queryStrings = currentSearch.split("&")
        for (let i = 0; i < queryStrings.length; i++) {
            if (queryStrings[i].split("=")[0] === "memberId") newQueryString += "memberId=" + myAffiliateCodeSugargoo
            else newQueryString += queryStrings[i]
            if (queryStrings.length - 1 > i) newQueryString += "&"
        }
        window.open(window.location.href.substring(0, window.location.href.indexOf("?")) + newQueryString, "_self");
        location.reload()
    }
}
async function main() {
    if(await doesUseProductAffiliate()) addPartnerCodeSugargoo()
}
main()
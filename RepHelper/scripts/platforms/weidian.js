async function main() {
    if (!this.document.location.href.includes("weidian.com/item.html") || !(this.document.location.href.includes("itemId") || this.document.location.href.includes("itemID"))) return
    if (!(await isOpenAgentEnabled())) return
    const platform_link = "https://weidian.com/item.html?itemId=" + getQuery().itemId

    openLinkOnPreferredAgent(platform_link)
}
main()
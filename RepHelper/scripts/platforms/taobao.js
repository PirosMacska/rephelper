async function main() {
    if (!this.document.location.href.includes("item.taobao.com/item.htm") || !this.document.location.href.includes("id")) return
    if (!(await isOpenAgentEnabled())) return
    const platform_link = "https://item.taobao.com/item.htm?id=" + getQuery().id

    openLinkOnPreferredAgent(platform_link)
}
main()
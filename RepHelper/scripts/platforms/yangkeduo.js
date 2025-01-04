async function main() {
    if (!this.document.location.hostname.includes("yangkeduo.com") || !this.document.location.href.includes("goods_id")) return
    if (!(await isOpenAgentEnabled())) return

    openLinkOnPreferredAgent(document.location.href)
}
main()
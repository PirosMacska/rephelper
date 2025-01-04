async function main() {
    if (!this.document.location.href.includes("detail.1688.com/offer/")) return
    if (!(await isOpenAgentEnabled())) return

    openLinkOnPreferredAgent(document.location.href)
}
main()
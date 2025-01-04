chrome.storage.local.get(["preferred_agent"], (res) => {
    try { document.querySelector("#agent-selector > option[value='" + res.preferred_agent + "']").setAttribute("selected", "selected") }
    catch { document.querySelector("#agent-selector > option[value='AllChinaBuy']").setAttribute("selected", "selected") }
})

async function sleep(seconds) {
    await new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    })
}

const currency_selector = document.querySelector("select[name='currencies']")
chrome.storage.local.get(["preferred"], async (res) => {
    let currencies = document.querySelectorAll("#currency-selector > option")
    if (res.preferred == null || res.preferred == undefined) chrome.storage.local.set({ "preferred": "EUR" })
    res.preferred = res.preferred || "EUR"
    let tries = 0
    while (currencies.length < 2 && tries < 3) {
        currencies = document.querySelectorAll("#currency-selector > option")
        tries++
        await sleep(0.5)
    }
    currency_selector.value = res.preferred
    currencies.forEach((currency) => {
        if (currency.textContent === res.preferred) currency.setAttribute("selected", "selected")
    })
})
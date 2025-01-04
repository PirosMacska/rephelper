const extensionId = chrome.runtime.id

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (extensionId !== sender.id) {
            sendResponse("No permission")
            return false
        }
        if (request.name === "fetchUrl") {
            let optionString = ""
            try { optionString = JSON.stringify(request.options) } catch { }
            fetch(request.url, request.options)
                .then(response => response.text())
                .then(res => {
                    console.log("(" + sender.id + "), " + sender.tab.url + " >> fetched url: " + request.url + " \n with options: \n" + optionString)
                    sendResponse(res)
                })
                .catch(error => sendResponse({}))
            return true;  // Will respond asynchronously.
        }
        else if (request.name === "consoleLog") {
            console.log("(" + sender.id + "), " + sender.tab.url + " >> " + request.log)
            return false
        }
        else if (request.name === "setCookie") {
            chrome.cookies.set({ url: request.url, cookie_name: request.name, path: request.path || "", value: request.value, secure: request.secure, expirationDate: request.expirationDate })
            return false
        }
        else if (request.name === "getCookie") {
            console.log("(" + sender.id + "), " + sender.tab.url + " >> requested cookie: " + request.url + " name: " + request.cookie_name)
            chrome.cookies.get({ url: request.url, name: request.cookie_name })
                .then((cookie) => {
                    console.log("(" + sender.id + "), " + sender.tab.url + " >> cookie received: " + request.url + " name: " + request.cookie_name + " value:" + JSON.stringify(cookie))
                    if (cookie == null || cookie == undefined) return sendResponse(null)
                    sendResponse(cookie.value.toString())
                })
            return true
        }
        else if (request.name === "getCurrencies") {
            chrome.storage.local.get(["currency"])
            .then(res => {
                sendResponse(res.currency)
            })
            return true
        }
        else sendResponse("Invalid command name")
    }
);
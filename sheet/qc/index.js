const search_input = document.querySelector("input[type='text']#search")
const pictures = document.querySelector("#picture-container")

async function fetchLink(link) {
    const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get-item?link=" + encodeURIComponent(link))
    const json = await res.json()
    return json.data
}

function replaceQuery(url, key, value) {
    const query = getQueryFromLink(url)
    query[encodeURIComponent(key)] = encodeURIComponent(value)
    let queryString = "?"
    const queryKeys = Object.keys(query)
    for(let i = 0; i < queryKeys.length; i++) {
        queryString += queryKeys[i]  + "=" + query[queryKeys[i]] + ((queryKeys.length - 1 === i) ? "" : "&" )
    }
    return url.split("?")[0] + queryString
}

async function loadImagesFromLink(link) {
    document.querySelector("#loading-spinner").style.display = "block"
    window.history.pushState("", "", replaceQuery(document.location.search, "link", link))
    const item = await fetchLink(link)
    while (pictures.firstElementChild) {
        pictures.removeChild(pictures.firstElementChild)
    }
    if (item === null) {
        const span = document.createElement("span")
        span.textContent = "Sorry no images found :("
        span.setAttribute("class", `no-images-txt`)
        pictures.appendChild(span)
        document.querySelector("#loading-spinner").style.display = "none"
        return
    }
    for (let i = 0; i < item.images.length; i++) {
        const img = document.createElement("img")
        img.src = item.images[i]
        img.setAttribute("class", `item-img item-img-${i}`)
        pictures.appendChild(img)
    }
    document.querySelector("#loading-spinner").style.display = "none"
}

search_input.addEventListener("keypress", async (e) => {
    if (e.which === 13) {
        loadImagesFromLink(search_input.value)
    }
})

function getQueryFromLink(link) {
    if (!link.includes("?")) return {}
    const search = link.split("?")[1]
    const splitted = search.split("&")
    let query = {}
    for (let i = 0; i < splitted.length; i++) {
        const s = splitted[i].split("=")
        query[s[0]] = s[1]
    }
    return query
}

function getQuery() {
    return getQueryFromLink(document.location.href)
}

(async () => {
    console.log("now")
    const query = getQuery()
    console.log(query)
    if (query.link) {
        loadImagesFromLink(query.link)
    }
})();
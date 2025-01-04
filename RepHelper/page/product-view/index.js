const product_inspect = document.getElementById("product_inspect")

async function inspectItem(item) {
    product_inspect.style.display = "block"
    document.body.style.overflowY = "hidden"

    const first_image = document.createElement("img")
    first_image.src = item.picUrl
    first_image.setAttribute("alt", "")
    document.querySelector("#product_inspect_images").appendChild(first_image)

    item.images.forEach(image => {
        const new_image = document.createElement("img")
        new_image.loading = "lazy"
        new_image.src = image
        new_image.setAttribute("alt", "")
        document.querySelector("#product_inspect_images").appendChild(new_image)
    });
}

async function getItem(link) {
    const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get-item?link=" + encodeURIComponent(link), {
        method: "GET"
    })
    return await res.json()
}

function getQuery() {
    const splitted = document.location.search.slice(1, document.location.search.length).split("&")
    let query = {}
    for (let i = 0; i < splitted.length; i++) {
        const s = splitted[i].split("=")
        query[s[0]] = s[1]
    }
    return query
}

async function main() {
    const link = getQuery()["link"] || ""
    inspectItem((await getItem(link)).data)
}
main()
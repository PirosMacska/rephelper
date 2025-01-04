const search_input = document.querySelector("input[type='text']#search")
const pictures = document.querySelector("#picture-container")

async function fetchLink(link) {
    const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/get-item?link=" + encodeURIComponent(link))
    const json = await res.json()
    return json.data
}



search_input.addEventListener("keypress", async (e) => {
    console.log(e.which)
    if(e.which === 13) {
        const item = await fetchLink(search_input.value)
        while (pictures.firstElementChild) {
            pictures.removeChild(pictures.firstElementChild)
        }
        if(item === null) {
            return
        }
        for(let i = 0; i < item.images.length; i++) {
            const img = document.createElement("img")
            img.src = item.images[i]
            img.setAttribute("class", "item-img")
            pictures.appendChild(img)
        }
    }
})
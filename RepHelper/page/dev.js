document.querySelector("#key-save-button").addEventListener("click", async () => {
    await chrome.storage.local.set({ "dev_key": document.querySelector("#key-input").value })
})

document.querySelector("#send-fixed-name").addEventListener("click", async () => {
    const key = (await chrome.storage.local.get(["dev_key"])).dev_key
    const name = document.querySelector("#fix-name").value
    const link = document.querySelector("#fix-link").value

    await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/fix-name", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            link: link,
            name: name,
            key: key
        }),
        method: "POST",
        credentials: "omit"
    })
})

const table = document.querySelector("#mainTable")

function addObject(item) {
    const tr = document.createElement("tr")

    const pictureTd = document.createElement("td")
    const picture = document.createElement("img")
    picture.src = item.picUrl
    picture.alt = "item_picture"
    picture.height = "100"
    picture.width = "100"
    picture.fetchPriority = "high"
    pictureTd.appendChild(picture)
    tr.appendChild(pictureTd)

    const nameTd = document.createElement("td")
    nameTd.setAttribute("class", "nameTableCell")
    nameTd.appendChild(document.createTextNode(item.name))
    nameTd.appendChild(document.createElement("br"))
    tr.appendChild(nameTd)

    const fixedNameTd = document.createElement("td")
    fixedNameTd.setAttribute("class", "nameTableCell")
    fixedNameTd.appendChild(document.createTextNode(item.fixedName))
    fixedNameTd.appendChild(document.createElement("br"))
    tr.appendChild(fixedNameTd)

    const priceTd = document.createElement("td")
    priceTd.setAttribute("class", "tableCell")
    priceTd.appendChild(document.createTextNode(item.price + " CNY"))
    tr.appendChild(priceTd)

    const linkTd = document.createElement("td")
    const linkA = document.createElement("a")
    linkTd.setAttribute("class", "tableCell")
    linkA.href = item.link
    linkA.textContent = "LINK"
    linkA.target = "_blank"
    linkTd.appendChild(linkA)
    tr.appendChild(linkTd)

    const qcTd = document.createElement("td")
    const qcPic = document.createElement("img")
    qcPic.alt = "item_picture"
    qcPic.height = "100"
    qcPic.width = "100"
    qcTd.appendChild(qcPic)
    tr.appendChild(qcTd)

    const acceptTd = document.createElement("td")
    const acceptButton = document.createElement("button")
    acceptButton.setAttribute("class", "acceptButton")
    acceptButton.textContent = "Accept"
    acceptTd.appendChild(acceptButton)
    tr.appendChild(acceptTd)

    const declineTd = document.createElement("td")
    const declineButton = document.createElement("button")
    declineButton.setAttribute("class", "declineButton")
    declineButton.textContent = "Decline"
    declineTd.appendChild(declineButton)
    tr.appendChild(declineTd)

    declineButton.addEventListener("click", async () => {
        await removeSuggestedName(item["_id"])
        getSuggestedNames()
    })

    acceptButton.addEventListener("click", async () => {
        const key = (await chrome.storage.local.get(["dev_key"])).dev_key
        await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/fix-name", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link: item.link,
                name: item.fixedName,
                key: key
            }),
            method: "POST",
            credentials: "omit"
        })
        await removeSuggestedName(item["_id"])
        getSuggestedNames()
    })

    table.appendChild(tr)
    changePictures(item.images, qcPic)
}

async function changePictures(qcPics, qcPic) {
    while (true) {
        for (let i = 0; i < qcPics.length; i++) {
            qcPic.src = qcPics[i]
            await sleep((Math.random() + 2) * 2)
        }
    }
}

async function sleep(seconds) {
    await new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    })
}

async function removeSuggestedName(id) {
    const key = (await chrome.storage.local.get(["dev_key"])).dev_key
    await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/remove-suggestion", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            key: key,
            id: id
        }),
        method: "POST",
        credentials: "omit"
    })
}

async function getSuggestedNames() {
    while(document.querySelector("#mainTable > tr")) {
        document.querySelector("#mainTable").removeChild(document.querySelector("#mainTable > tr"))
    }
    const key = (await chrome.storage.local.get(["dev_key"])).dev_key
    const res = await fetch("https://qzpmvscvc3.execute-api.eu-north-1.amazonaws.com/sheet/suggested-names", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            key: key
        }),
        method: "POST",
        credentials: "omit"
    })

    const items = (await res.json()).data

    for (let i = 0; i < items.length; i++) {
        addObject(items[i])
    }
}

getSuggestedNames()
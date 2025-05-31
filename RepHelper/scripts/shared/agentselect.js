let table

let displayedAgentButtonsDiv
let colorTheme
let colorFilter

//that colors filter value (generate it: https://angel-rs.github.io/css-color-filter-generator/)

//This whole code is very ugly, I dont wanna look at it
let agentTable = [
    {
        "name": "AllChinaBuy",
        "convertLink": getACBLink,
        "val": 0,
        "color": "dodgerblue",
        "star": false
    },
    {
        "name": "PandaBuy",
        "convertLink": getPandaBuyLink,
        "val": 0,
        "color": "green",
        "star": false
    },
    {
        "name": "HooBuy",
        "convertLink": getHooBuyLink,
        "val": 0,
        "color": "orange",
        "star": false
    },
    {
        "name": "CNFans",
        "convertLink": getCNFansLink,
        "val": 0,
        "color": "#ff5555",
        "star": false
    },
    {
        "name": "Sugargoo",
        "convertLink": getSugargooLink,
        "val": 0,
        "color": "orange",
        "star": false
    },
    {
        "name": "SuperBuy",
        "convertLink": getSuperBuyLink,
        "val": 0,
        "color": "darkblue",
        "star": false
    },
    {
        "name": "MuleBuy",
        "convertLink": getMuleBuyLink,
        "val": 0,
        "color": "#ff3d01",
        "star": false
    },
    {
        "name": "JoyaGoo",
        "convertLink": getJoyaGooLink,
        "val": 0,
        "color": "#c30d23",
        "star": false
    },
    {
        "name": "CSSBuy",
        "convertLink": getCSSBuyLink,
        "val": 0,
        "color": "#6CBC2A",
        "star": false
    },
    {
        "name": "ACBuy",
        "convertLink": getACBuyLink,
        "val": 0,
        "color": "#31b38c",
        "star": false
    }
]
let starredNames = []

function getAgentElementByName(name) {
    for (let i = 0; i < agentTable.length; i++) {
        if (agentTable[i].name === name) return agentTable[i]
    }
    return null
}

function getValByName(name) {
    for (let i = 0; i < agentTable.length; i++) {
        if (agentTable[i].name === name) return agentTable[i].val
    }
}

function upvoteByName(name) {
    const val = getValByName(name)
    for (let i = 0; i < agentTable.length; i++) {
        if (agentTable[i].val > val || agentTable[i].name === name) agentTable[i].val += 1
    }
}

function downvoteByName(name) {
    const vals = []
    for (let i = 0; i < agentTable.length; i++) {
        vals.push(agentTable[i].val)
    }
    for (let i = 0; i < agentTable.length; i++) {
        if (agentTable[i].name === name) agentTable[i].val = 0
        if (!vals.includes(1) && agentTable[i].val > 1) agentTable[i].val -= 1
    }
}

function addAgentElementToDisplay(agentElement) {
    const placement = displayedAgentButtonsDiv

    const button = document.createElement("button")
    button.setAttribute("class", "displayedAgentButtonStyle")
    button.style.backgroundColor = agentElement.color
    button.textContent = agentElement.name

    placement.insertBefore(button, placement.firstElementChild)
    button.addEventListener("click", async () => {
        window.open(await agentElement.convertedLink, "_blank")
    })

}

function removeAgentFromDisplayByName(name) {
    const buttons = document.querySelectorAll(".displayedAgentButtonStyle")
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === name) {
            buttons[i].parentElement.removeChild(buttons[i])
        }
    }
}

async function addNewAgentDiv(agentButtonsDiv, agentSelectWindowDiv, platformLink, color, colorFilterString) {
    displayedAgentButtonsDiv = agentButtonsDiv
    colorTheme = color
    colorFilter = colorFilterString

    const mainColor = color

    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("class", "agentSelectDiv")

    table = document.createElement("table")
    table.style.overflowY = "auto"
    mainDiv.style.display = "none"
    mainDiv.style.borderColor = mainColor
    mainDiv.appendChild(table)

    agentSelectWindowDiv.appendChild(mainDiv)
    const platform_link = platformLink

    for (let i = 0; i < agentTable.length; i++) {
        agentTable[i].val = (await chrome.storage.local.get(["agentUpvote_" + agentTable[i].name]))["agentUpvote_" + agentTable[i].name] | 0
    }

    sortAgentTable()

    //add star flag
    starredNames = (await chrome.storage.local.get(["starred"])).starred || []
    for (let i = 0; i < starredNames.length; i++) {
        const agentElement = getAgentElementByName(starredNames[i])
        agentElement.star = true
        if (agentElement !== null) addAgentElementToDisplay(agentElement)
    }

    const buttonPlacement = agentButtonsDiv
    const agentSelectOpenButton = document.createElement("button")
    agentSelectOpenButton.textContent = "Other agents"
    agentSelectOpenButton.style.color = mainColor
    agentSelectOpenButton.style.border = "2px solid " + mainColor
    const openMenuArrow = document.createElement("strong")
    openMenuArrow.textContent = "^"
    openMenuArrow.style.color = mainColor
    openMenuArrow.setAttribute("class", "openMenuArrow")
    agentSelectOpenButton.appendChild(openMenuArrow)
    agentSelectOpenButton.setAttribute("class", "agentSelectOpenButton")

    agentSelectOpenButton.addEventListener("click", () => {
        if (mainDiv.style.display !== "block") {
            mainDiv.style.display = "block"
            openMenuArrow.style.rotate = "180deg"
            openMenuArrow.style.top = "5px"
            openMenuArrow.style.bottom = null
        }
        else {
            mainDiv.style.display = "none"
            openMenuArrow.style.rotate = "360deg"
            openMenuArrow.style.top = null
            openMenuArrow.style.bottom = "4px"
        }
    })
    buttonPlacement.appendChild(agentSelectOpenButton)

    for (let i = 0; i < agentTable.length; i++) {
        agentTable[i].convertedLink = agentTable[i].convertLink(platform_link)
        await addNewAgentButton(agentTable[i])
    }
}

async function addNewAgentButton(agentElement) {
    const mainColor = colorTheme || "#111111ff"
    const mainColorFilter = colorFilter || "invert(1)"

    const tr = document.createElement("tr")
    table.appendChild(tr)

    const td1 = document.createElement("td")
    const button = document.createElement("button")

    button.textContent = agentElement.name
    button.setAttribute("class", "agentButton")
    button.style.color = mainColor
    button.style.border = "2px solid " + mainColor

    button.style.transition = "all ease 0.35s"

    const mouseOverFunction = () => {
        button.style.color = "white"
        button.style.backgroundColor = mainColor
    }
    button.addEventListener("mouseover", mouseOverFunction)
    const mouseOutFunction = () => {
        button.style.color = mainColor
        button.style.backgroundColor = "white"
    }
    button.addEventListener("mouseout", mouseOutFunction)

    td1.appendChild(button)
    tr.appendChild(td1)
    button.addEventListener("click", async () => {
        window.open(await agentElement.convertedLink, '_blank');
    })

    const td2 = document.createElement("td")
    const upvoteButton = document.createElement("button")
    const upvote = document.createElement("img")
    upvote.src = absolutePath + "images/svg/upvote_off.svg"
    upvote.setAttribute("class", "noDrag agentUpvoteSVG")
    upvoteButton.setAttribute("class", "agentUpvote")
    upvoteButton.appendChild(upvote)
    for (let i = 0; i < agentTable.length; i++) {
        if (agentTable[i].name === agentElement.name) agentTable[i].val = (await chrome.storage.local.get(["agentUpvote_" + agentElement.name]))["agentUpvote_" + agentElement.name] || 0
    }
    upvote.style.filter = mainColorFilter
    if (getValByName(agentElement.name) !== 0) {
        upvote.setAttribute("selected", "true")
        upvote.src = absolutePath + "images/svg/upvote_on.svg"
    } else upvote.setAttribute("selected", "false")

    upvoteButton.addEventListener("click", async () => {

        if (upvote.getAttribute("selected") !== 'true') {
            upvote.setAttribute("selected", "true")
            upvote.src = absolutePath + "images/svg/upvote_on.svg"
            upvoteByName(agentElement.name)
        }
        else {
            upvote.setAttribute("selected", "false")
            upvote.src = absolutePath + "images/svg/upvote_off.svg"
            downvoteByName(agentElement.name)
        }

        //save vals
        for (let i = 0; i < agentTable.length; i++) {
            const setting = {}
            setting["agentUpvote_" + agentTable[i].name] = getValByName(agentTable[i].name)
            chrome.storage.local.set(setting)
        }
        //
        const elementVal = getValByName(agentElement.name)
        if (elementVal === 0) {
            table.insertBefore(tr, table.lastElementChild.nextSibling)
            return
        }
        let added = false
        for (let i = agentTable.length - 1; i >= 0; i--) {
            if (agentTable[i].val === elementVal + 1) {
                const buttons = document.querySelectorAll(".agentButton")
                for (let j = 0; j < buttons.length; j++) {
                    if (buttons[j].textContent === agentTable[i].name) {
                        table.insertBefore(tr, buttons[j].parentElement.parentElement.nextSibling)
                        added = true
                        break
                    }
                    if (added) break
                }
            }
            if (added) break
        }
        if (added === false) {
            table.insertBefore(tr, table.firstElementChild)
        }
    })
    td2.appendChild(upvoteButton)
    tr.appendChild(td2)

    const td3 = document.createElement("td")
    const starButton = document.createElement("button")
    const star = document.createElement("img")
    star.src = absolutePath + ((agentElement.star === true) ? "images/svg/star_on.svg" : "images/svg/star_off.svg")
    if (agentElement.star === true) star.setAttribute("selected", "true")
    star.setAttribute("class", "noDrag agentUpvoteSVG")
    starButton.setAttribute("class", "agentUpvote agentStar")

    starButton.appendChild(star)
    star.style.filter = mainColorFilter
    starButton.addEventListener("click", (() => {
        if (star.getAttribute("selected") !== 'true') {
            star.setAttribute("selected", "true")
            star.src = absolutePath + "images/svg/star_on.svg"
            addAgentElementToDisplay(agentElement)
            starredNames.push(agentElement.name)
        }
        else {
            star.setAttribute("selected", "false")
            star.src = absolutePath + "images/svg/star_off.svg"
            removeAgentFromDisplayByName(agentElement.name)
            starredNames.splice(starredNames.indexOf(agentElement.name), 1)
        }
        chrome.storage.local.set({ "starred": starredNames })
    }))
    td3.appendChild(starButton)
    tr.appendChild(td3)

    const turnedOff = (!(await agentElement.convertedLink)) ? true : false
    console.log("Agent " + agentElement.name + " turned off: " + turnedOff)
    if (turnedOff) {
        button.style.backgroundColor = "gray"
        button.style.color = "white"
        button.style.borderColor = "darkgray"
        button.disabled = true
        button.style.cursor = "not-allowed"
        button.removeEventListener("mouseover", mouseOverFunction)
        button.removeEventListener("mouseout", mouseOutFunction)
    }
}

function sortAgentTable() {
    agentTable = agentTable.sort((a_, b_) => {
        return b_.val - a_.val
    })
}
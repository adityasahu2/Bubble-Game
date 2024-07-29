let width = Math.floor((document.getElementById("game-area").offsetWidth - 20) / 60)
let height = Math.floor((document.getElementById("game-area").offsetHeight - 20) / 60)
let highscore = document.getElementById("highscore")
highscore.textContent = 0
let hit = document.getElementById("hit")
hit.textContent = 0
let timer = document.getElementById("timer")
timer.textContent = 60
let score = document.getElementById("score")
score.textContent = 0
let lives = document.getElementById("lives")
lives.textContent = 3
let countdown
let menu = document.getElementById("menu")

function RandomNumberGenerator() { return Math.ceil(Math.random() * 10) }

function CreateBubble() {
    for (let i = 0; i < width * height; i++) {
        let bubble = document.createElement("div")
        bubble.classList.add("bubble", "center")
        document.getElementById("game-area").appendChild(bubble)
    }
    AddBubble()
}

function AddBubble() {
    hit.textContent = RandomNumberGenerator()
    let bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach(bubble => {
        bubble.textContent = RandomNumberGenerator()
    })
}

function RemoveBubble() {
    let bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach(bubble => {
        bubble.parentNode.removeChild(bubble)
    })
    menu.style.display = "flex"
}

function Timer() {
    countdown = setInterval(() => {
        let count = --timer.textContent
        if (count == 0) {
            EndGame()
        }
    }, 1000)
}

function EndGame() {
    clearInterval(countdown)
    if (score.textContent > highscore.textContent) {
        highscore.textContent = score.textContent
    }
    RemoveBubble()
    
}

function Play() {
    menu.style.display = "none"
    Timer()
    CreateBubble()
    let bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach(bubble => {
        bubble.addEventListener("click", function (details) {
            let target = details.target.textContent
            if (target == hit.textContent) {
                score.textContent = Number(score.textContent) + 10
            }
            else {
                lives.textContent = --lives.textContent
                if (lives.textContent == 0) {
                    EndGame()
                }
            }
            AddBubble()
        })
    })
}

document.getElementById("button").addEventListener("click", Play)

// let bubbles = document.querySelector("#game-area").children
// for (const key in bubbles) {
    //     bubbles[key].addEventListener("click", function (details) {
        
    //     })
    // }

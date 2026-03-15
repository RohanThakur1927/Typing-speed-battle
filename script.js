const quoteElement = document.getElementById("quote")
const inputElement = document.getElementById("input")

const timeElement = document.getElementById("time")
const wpmElement = document.getElementById("wpm")
const accuracyElement = document.getElementById("accuracy")

const restartButton = document.getElementById("restart")
const progressBar = document.getElementById("progress")
const result = document.getElementById("result")

const leaderboardElement = document.getElementById("leaderboard")

const quotes = [
"Practice typing every day to improve coding productivity.",
"Consistency is the key to becoming a great developer.",
"JavaScript powers the modern web.",
"Developers turn coffee into code."
]

let startTime
let timer
let currentQuote=""

function loadQuote(){

currentQuote = quotes[Math.floor(Math.random()*quotes.length)]

quoteElement.innerHTML=""

currentQuote.split("").forEach(char=>{

const span=document.createElement("span")
span.innerText=char
quoteElement.appendChild(span)

})

progressBar.style.width="0%"
result.innerText=""

}

function updateLeaderboard(score){

let scores = JSON.parse(localStorage.getItem("scores")) || []

scores.push(score)

scores.sort((a,b)=>b-a)

scores = scores.slice(0,5)

localStorage.setItem("scores",JSON.stringify(scores))

displayLeaderboard()

}

function displayLeaderboard(){

leaderboardElement.innerHTML=""

let scores = JSON.parse(localStorage.getItem("scores")) || []

scores.forEach(score=>{

const li=document.createElement("li")
li.innerText=score+" WPM"
leaderboardElement.appendChild(li)

})

}

inputElement.addEventListener("input",()=>{

const quoteChars=quoteElement.querySelectorAll("span")
const inputChars=inputElement.value.split("")

let correct=0

quoteChars.forEach((char,index)=>{

if(inputChars[index]==null){

char.classList.remove("correct")
char.classList.remove("incorrect")

}

else if(inputChars[index]===char.innerText){

char.classList.add("correct")
char.classList.remove("incorrect")
correct++

}

else{

char.classList.add("incorrect")
char.classList.remove("correct")

}

})

const accuracy=Math.floor((correct/inputChars.length)*100)

accuracyElement.innerText=isNaN(accuracy)?100:accuracy+"%"

const progress=(inputChars.length/quoteChars.length)*100

progressBar.style.width=progress+"%"

if(inputChars.length===quoteChars.length){

clearInterval(timer)

const finalWPM = wpmElement.innerText

result.innerText="🎉 Completed!"

confetti()

updateLeaderboard(finalWPM)

}

})

inputElement.addEventListener("focus",()=>{

startTime=new Date()

timer=setInterval(()=>{

const time=Math.floor((new Date()-startTime)/1000)

timeElement.innerText=time

const words=inputElement.value.length/5

const wpm=Math.round(words/(time/60))

wpmElement.innerText=isNaN(wpm)?0:wpm

},1000)

},{once:true})

restartButton.addEventListener("click",()=>{

clearInterval(timer)

inputElement.value=""

timeElement.innerText="0"

wpmElement.innerText="0"

accuracyElement.innerText="100%"

loadQuote()

})

loadQuote()

displayLeaderboard()

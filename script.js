const close = document.querySelector(".close-rules");
const rules = document.querySelector(".rule-area");
const btn = document.querySelector('.rules');


function rulesShow() {
    btn.addEventListener('click', () => {
        rules.classList.add("active")

    })
}
rulesShow();
function closeRules() {
    close.addEventListener("click", () => {
        rules.classList.remove("active")
    })
}
closeRules()


const gameRule = [
    {
        choice: "rock",
        beat: "scissors",
    },

    {
        choice: "paper",
        beat: "rock",
    },
    {
        choice: "scissors",
        beat: "paper",
    }
]
const choices = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".container");
const resultDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".result");



choices.forEach((botton) => {
    botton.addEventListener("click", () => {
        const userChoice = botton.value;
        const choice = gameRule.find(name => name.choice == userChoice)
        const compChoice = computerChoice();
        displayResults([choice, compChoice]);
        displayDecision([choice, compChoice]);
    })
})

function computerChoice() {
    const random = Math.floor(Math.random() * gameRule.length);
    return gameRule[random];
}
function displayResults(results) {
    resultDivs.forEach((resultEle, id) => {
        resultEle.innerHTML = `
          <button class="choice-btn ${results[id].choice}-btn">
            <img src="${results[id].choice}.svg" alt="${results[id].choice}" />
          </button>
        `;
    });

    gameDiv.classList.toggle("hide");
    resultDiv.classList.toggle("hide");
}
const decision = document.querySelector(".decision h3");
const resultsText = document.querySelector(".result-text");
const nextBtn=document.querySelector(".next");
const playAgain = document.querySelector(".play-again");
let compScore=0;
let yourScore=0;


function displayDecision(results) {
    const userWin = Winner(results);
    const compWin = Winner(results.reverse());
    if (userWin) {
        resultsText.innerText = "You win"
        resultDivs[0].classList.toggle("winner");
        nextBtn.style.display="block";
        playAgain.innerText="play again"
        myScore(1);
    }
    else if (compWin) {
        resultsText.innerText = "You lost";
        resultDivs[1].classList.toggle("winner")
        playAgain.innerText="Play again"
         pcScore(1);
    } 
    else {
        resultsText.innerText = "Tie up"
        decision.style.display = "none";
        playAgain.innerText="Replay"
    }
}


function Winner(results) {
    return results[0].beat == results[1].choice;
}


function pcScore(point){
    compScore+=point;
    localStorage.setItem("computer",compScore)
    document.querySelector('.computer-score h1').innerText=localStorage.getItem("computer");
}

function myScore(point){
 yourScore+=point;
 localStorage.setItem("user",yourScore)
 document.querySelector('.your-score h1').innerText=localStorage.getItem("user");
}
window.addEventListener('load', () => {
    if(localStorage.getItem('computer')) {
        compScore = parseInt(localStorage.getItem('computer'));
        document.querySelector('.computer-score h1').innerText = compScore;
    }

    if(localStorage.getItem('user')) {
        yourScore =parseInt(localStorage.getItem('user'));
        document.querySelector('.your-score h1').innerText = yourScore;
    }
});
nextBtn.addEventListener("click",()=>{
    resultDiv.classList.toggle("hide");
    nextBtn.style.display = "none";
    document.querySelector("#header").classList.toggle("hide");
    document.querySelector(".hurray").classList.toggle("hide");
})


playAgain.addEventListener("click", () => {
    gameDiv.classList.toggle("hide");
    resultDiv.classList.toggle("hide");
    resultsText.innerText = "";
    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });
    decision.style.display = "block";
    nextBtn.style.display = "none";
    document.querySelector(".hurray").classList.add("hide");
    document.querySelector("#header").classList.remove("hide");
    
});

const againPlay=document.querySelector(".again-play");


againPlay.addEventListener("click", () => {
    gameDiv.classList.remove("hide");
    resultDiv.classList.add("hide");
    resultsText.innerText = "";
    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });
    decision.style.display = "block";
    nextBtn.style.display = "none";
    document.querySelector(".hurray").classList.add("hide");
    document.querySelector("#header").classList.remove("hide");
    rulesShow();
closeRules();
});
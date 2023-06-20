const gameAreaEl = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const countdownEl = document.getElementById("countdown");
const gameOverEl = document.getElementById("game-over");
const startBtnEl = document.querySelector(".startBtn");
const holes = [...document.getElementsByClassName('hole')];

let gameDuration = 20 //seconds
let score = 0;
let miss = 0;
const maximumMissThreshold = 3;
let gameRunning = false;
let countdownInterval = null;
let missTimerInterval = null;

// function initialize the game
function startGame() {
    initializeGameTimer();
    gameRunning = true;
    startBtnEl.style.display = "none";
    gameOverEl.style.display = "none";
    peekBearInterval = setInterval(peekBear, getPeekInterval())
}

// function to initialize the game timer
function initializeGameTimer() {
    countdownInterval = setInterval(() => {
        countdownEl.style.display = "block";
        countdownEl.textContent = `Your game will end in ${gameDuration} seconds or after three miss.`;
        gameDuration--;
        if(gameDuration == 0){
            endGame();
            return;
        }
    }, 1000);
}

// function to get peek interval game logic
function getPeekInterval() {
    if (score >= 0 && score <= 10) {
        return 2000;
    } else if (score >= 11 && score <= 20) {
        return 1500;
    } else {
        return 1100;
    }
}

// function for showing bear at certain intervals
function peekBear() {
    if (gameRunning) {
        if(miss === maximumMissThreshold){
            endGame();
            return;
        }
        const randomIndex = Math.floor(Math.random() * holes.length);
        const hole = holes[randomIndex];
        hole.classList.add("bearEmoji")
        setTimeout(() => {
            hole.classList.remove("bearEmoji");
        }, 800);
        missTimerInterval = setTimeout(() => {
            miss++;
        }, 800)
    }
}

// function to clear the game variables and end
function endGame(){
    clearInterval(countdownInterval);
    clearInterval(peekBearInterval);
    countdownEl.style.display = "none";
    countdownEl.textContent = `Your game will end in ${gameDuration} seconds or after three miss.`;
    gameOverEl.style.display = "block";
    gameOverEl.textContent = `Game Over! Score: ${score}.`
    gameDuration = 20;
    score = 0;
    miss = 0;
    startBtnEl.style.display = "block";
}

// function for whack event
function whack(event){
    if(gameRunning){
        clearInterval(missTimerInterval);
        const holeEl = event.target;
        if(holeEl.classList.contains("bearEmoji")){
            score++;
            scoreEl.textContent = `Score: ${score}`
        }else{
            miss++;
        }
    }
}
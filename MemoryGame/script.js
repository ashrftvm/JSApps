const icons = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐧', '🐦'];
const icons2 = [...icons]
const grid = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
const msgEl = document.querySelector(".msg")
const gameTimerEl = document.querySelector(".gameTimer")

let checkMatchTimer = null
let gameTimer = null

let totalGameTime = 10 //seconds
let cardViewSeconds = 5

let cards = [];
let moves = 0;
let score = 0;
let flippedCards = [];



// Shuffle the icons array
const cardValues = []
// const shuffledIcons = shuffle(cardValues.concat(icons.slice(0,3),icons2.slice(0,3)));
const shuffledIcons = shuffle(cardValues.concat(icons, icons2));


// Shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        // console.log([array[i], array[j]], [array[j], array[i]], i, j)
    }
    return array;
}

// Event listener for restart button
restartButton.addEventListener('click', restartGame);

// Restart the game
function restartGame() {
    let msg = `Do you want to start the game?`
    if (cards.length > 0) {
        msg = `All current progress will be lost, Do you want to continue?`
    }
    const res = window.confirm(msg)
    if (res) {
        startGame()
    }

}


// function to initialize the timer and cards
function startGame() {
    createCards()
    moves = 0;
    score = 0;
    scoreElement.style.display = "block"
    scoreElement.textContent = 'Moves: 0';
    flippedCards = [];

    cards.forEach(card => {
        card.classList.remove('flipped');
        card.classList.remove('matched');
    });

    shuffleCards();
    showPreviewTimer()
}

// Create cards
function createCards() {
    for (let i = 0; i < shuffledIcons.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = shuffledIcons[i];
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
        cards.push(card);
    }
}

// Shuffle the cards
function shuffleCards() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(card => grid.appendChild(card));
}


// function to display the timer for starting the game
function showPreviewTimer() {
    let timeToShowTheCard = cardViewSeconds
    const timeMsgEl = msgEl.querySelector(".time")
    msgEl.style.display = "block"
    const timerInterval = setInterval(() => {
        timeMsgEl.innerHTML = timeToShowTheCard
        timeToShowTheCard--
        if (timeToShowTheCard < 0) {
            hideAllCards()
            clearInterval(timerInterval)
            msgEl.style.display = "none"
        }
    }, 1000)
}

// function to hide all the cards
function hideAllCards() {
    cards.forEach(card => {
        card.classList.add('flipped');
    });
    startGameTimer()
}

// function to handle gametime logic
function startGameTimer() {
    let gameTimeSeconds = totalGameTime
    gameTimerEl.style.display = "block"
    const gameTimerMsgEl = gameTimerEl.querySelector(".time")
    gameTimer = setInterval(() => {
        gameTimerMsgEl.innerText = gameTimeSeconds
        gameTimeSeconds--
        if (gameTimeSeconds < 0) {
            clearInterval(gameTimer)
            const res = window.confirm("Game Over! Do you want to start a new game?")
            clearGame()
            if(res){
                startGame()
            }
        }
    }, 1000)
}


// function to clear all the variables
function clearGame() {
    scoreElement.style.display = "none"
    msgEl.style.display = "none"
    gameTimerEl.style.display = "none"
    grid.innerHTML = ""
    cards = []
    flippedCards = []
    clearInterval(checkMatchTimer)
    clearInterval(gameTimer)
}


// Flip a card
function flipCard(card) {
    if (card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.remove('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkMatchTimer = setTimeout(checkMatch, 1000);
        }
    }
}

// Check if the flipped cards match
function checkMatch() {
    moves++;
    scoreElement.textContent = `Moves: ${moves}`;

    if (flippedCards[0].textContent === flippedCards[1].textContent) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        score++;
        if (score === shuffledIcons.length / 2) {
            setTimeout(showFinalScore, 500);
        }
    } else {
        flippedCards.forEach(card => card.classList.add('flipped'));
    }
    flippedCards = [];
}

// Show the final score
function showFinalScore() {
    const res = window.confirm(`Congratulations! You have completed the game in ${moves} moves. Do you want to start a new game?`);
    clearGame()
    if(res){
        startGame()
    }
}


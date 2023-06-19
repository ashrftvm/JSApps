
const holes = document.querySelectorAll('.hole');
const bears = document.querySelectorAll('.bear');
let score = 0;
let gameRunning = false;
let misses = 0;
let peepingBear = null;

// Function to start the game
function startGame() {
    score = 0;
    misses = 0;
    gameRunning = true;
    updateScore();
    hideGameOver();
    gameLoop();
    setTimeout(() => {
        gameRunning = false;
        showGameOver();
    }, 10000); // Game duration: 10 seconds
}

// Function to randomly select a hole
function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// Function to make a bear appear
function peep() {
    if (!gameRunning) return;
    let speed;
    
    if (score < 10) {
        speed = Math.random() * 1000 + 500; // Normal level speed: Random time between 0.5 and 1.5 seconds
    } else if (score < 20) {
        speed = Math.random() * 800 + 300; // Medium level speed: Random time between 0.3 and 1.1 seconds
    } else {
        speed = Math.random() * 600 + 200; // Hard level speed: Random time between 0.2 and 0.8 seconds
    }
    
    const hole = randomHole();
    const bear = hole.querySelector('.bear');
    bear.style.opacity = '1';
    peepingBear = bear;
    
    setTimeout(() => {
        if (gameRunning && peepingBear === bear) {
            bear.style.opacity = '0';
            if (++misses === 3) {
                gameRunning = false;
                showGameOver();
            } else {
                peepingBear = null;
                gameLoop();
            }
        }
    }, 1000); // Time before the bear goes down: 1 second
}

// Function to start the game loop
function gameLoop() {
    const delay = Math.random() * 2000 + 500; // Delay between each bear appearance: Random time between 0.5 and 2.5 seconds
    setTimeout(() => {
        if (gameRunning) {
            peep();
        }
    }, delay);
}

// Function to whack a bear
function whack(event) {
    if (!event.target.classList.contains('bear')) return;
    const bear = event.target;
    bear.style.opacity = '0';
    score++;
    updateScore();
    misses = 0;
    peepingBear = null;
}

// Function to update the score display
function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Function to show the game over message
function showGameOver() {
    document.getElementById('game-over').style.display = 'block';
}

// Function to hide the game over message
function hideGameOver() {
    document.getElementById('game-over').style.display = 'none';
}
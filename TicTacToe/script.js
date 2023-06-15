let board = [];
let currentPlayer = 'X';
let gameActive = false;
let winner = null;
let difficulty = 'easy';
let gridSize = 3;
let winningCombinations = getWinningCombinations(gridSize);
let aiTurn = false; // Flag to track AI's turn


// Initialize the game
resetGame();


// Function to reset the game
function resetGame() {
  board = Array(gridSize * gridSize).fill('');
  currentPlayer = 'X';
  gameActive = true;
  winner = null;
  document.getElementById('message').innerText = "";
  
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = "";
  
  boardElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => placeSymbol(i));
    boardElement.appendChild(cell);
  }
}

// Function to place a symbol on the board
function placeSymbol(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    const currentEl = document.getElementById('board').children[index]
    currentEl.innerText = currentPlayer;
    currentEl.classList.add(currentPlayer.toLowerCase())
    checkWin();
    checkDraw();
    togglePlayer();

    if (gameActive && currentPlayer === 'O') {
      // Disable mouse clicks on the entire document
      document.documentElement.style.pointerEvents = "none";
      aiTurn = true; // Disable player's movement during AI's turn
      setTimeout(makeAIMove, 500);
    }
  }
}


// Function to get all winning combinations
function getWinningCombinations(size) {
  const combinations = [];
  
  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    combinations.push(row);
  }
  
  // Columns
  for (let i = 0; i < size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(i + j * size);
    }
    combinations.push(column);
    // console.log(column)
  }
  
  // Diagonals
  const diagonal1 = [];
  const diagonal2 = [];
  
  for (let i = 0; i < size; i++) {
    diagonal1.push(i * (size + 1));
    diagonal2.push((i + 1) * (size - 1));
  }
  
  combinations.push(diagonal1, diagonal2);
  
  return combinations;
}



// Function to check if the game has been won
function checkWin() {
  for (let combination of winningCombinations) {
    let isWinningCombination = true;
    for (let index of combination) {
      if (board[index] !== currentPlayer) {
        isWinningCombination = false;
        break;
      }
    }
    if (isWinningCombination) {
      gameActive = false;
      winner = currentPlayer;
      document.getElementById('message').innerText = `Player ${winner} wins!`;
      break;
    }
  }
}


// Function to check if the game ended in a draw
function checkDraw() {
  if (!board.includes('') && winner === null) {
    gameActive = false;
    document.getElementById('message').innerText = "It's a draw!";
  }
}

// Function to toggle the current player
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


// Function to make AI move based on difficulty level
function makeAIMove() {
  if (aiTurn) {

    if (difficulty === 'easy') {
      makeRandomMove();
    } else if (difficulty === 'medium') {
      const random = Math.random();
      if (random < 0.5) {
        makeRandomMove();
      } else {
        makeObstructingMove();
      }
    } else if (difficulty === 'hard') {
      makeObstructingMove();
    }
    aiTurn = false; // Enable player's movement after AI's turn
    // console.log(aiTurn)
    // Disable mouse clicks on the entire document
    document.documentElement.style.pointerEvents = "auto";

  }
}

// Function to make a random move for the AI
function makeRandomMove() {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableMoves.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  placeSymbol(availableMoves[randomIndex]);
}

// Function to make an obstructing move for the AI
function makeObstructingMove() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if ((board[a] === 'X' && board[b] === 'X' && board[c] === '') ||
        (board[a] === 'X' && board[b] === '' && board[c] === 'X') ||
        (board[a] === '' && board[b] === 'X' && board[c] === 'X')) {
      if (board[a] === '') {
        placeSymbol(a);
      } else if (board[b] === '') {
        placeSymbol(b);
      } else {
        placeSymbol(c);
      }
      return;
    }
  }
  
  makeRandomMove();
}



// Function to change the difficulty level
function changeDifficulty() {
  difficulty = document.getElementById('difficulty').value;
}

// Function to change the grid size
function changeGridSize() {
  gridSize = parseInt(document.getElementById('gridSize').value);
  winningCombinations = getWinningCombinations(gridSize);
  resetGame();
}

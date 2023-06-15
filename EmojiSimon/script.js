
        const gameButtons = document.querySelectorAll('.game-button');
        const sequence = [];
        let userSequence = [];
        let level = 1;
        let gameStarted = false;
        
        // Function to generate a random number from 0 to 3
        function getRandomButtonIndex() {
            return Math.floor(Math.random() * 4);
        }
        
        // Function to add a random button to the sequence
        function addToSequence() {
            sequence.push(getRandomButtonIndex());
        }
        
        // Function to show the sequence of buttons to the user
        async function showSequence() {
            document.getElementById('prompt-text').innerText = '👁️ Watch closely 👁️';
            await sleep(1500); // Wait for 1.5 seconds
            
            for (const buttonIndex of sequence) {
                await sleep(1000); // Wait for 1 second
                flashButton(gameButtons[buttonIndex]);
                await sleep(500); // Wait for 0.5 seconds
                restoreButton(gameButtons[buttonIndex]);
            }
            
            userSequence = [];
            gameStarted = true;
            document.getElementById('prompt-text').innerText = 'Your turn';
        }
        
        // Function to handle user button clicks
        function handleUserInput(buttonIndex) {
            if (!gameStarted) return;
            
            flashButton(gameButtons[buttonIndex]);
            userSequence.push(buttonIndex);
            
            if (userSequence.length === sequence.length) {
                if (checkUserSequence()) {
                    level++;
                    addToSequence();
                    showSequence();
                } else {
                    alert('Game Over! Your score: ' + (level - 1));
                    resetGame();
                    document.getElementById('start-button').style.display = 'block';
                }
            }
        }
        
        // Function to compare user sequence with the game sequence
        function checkUserSequence() {
            for (let i = 0; i < userSequence.length; i++) {
                if (userSequence[i] !== sequence[i]) {
                    return false;
                }
            }
            return true;
        }
        
        // Function to flash a button
        async function flashButton(button) {
            button.style.animation = 'none';
            void button.offsetWidth; // Trigger reflow to restart the animation
            button.style.animation = 'pulsate 1s';
        }
        
        // Function to restore a button to its original state
        async function restoreButton(button) {
            await sleep(300); // Wait for 0.3 seconds
            button.style.opacity = '1';
        }
        
        // Function to reset the game
        function resetGame() {
            sequence.length = 0;
            userSequence.length = 0;
            level = 1;
            gameStarted = false;
        }
        
        // Function to start the game
        function startGame() {
            document.getElementById('start-button').style.display = 'none';
            addToSequence();
            showSequence();
        }
        
        // Helper function to sleep
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
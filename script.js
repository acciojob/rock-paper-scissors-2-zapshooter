//your code here
// Game state
let totalRounds = 0;
let roundsLeft  = 0;
let userPoints  = 0;
let computerPoints = 0;

const choices = ["ROCK", "PAPER", "SCISSORS"];

// Play button
document.getElementById('play-game').addEventListener('click', () => {
    const val = parseInt(document.getElementById('game-number').value);
    if (!val || val < 1) {
        alert('Please enter a valid number of turns.');
        return;
    }
    totalRounds    = val;
    roundsLeft     = val;
    userPoints     = 0;
    computerPoints = 0;

    document.getElementById('rounds-left').textContent    = roundsLeft;
    document.getElementById('user-points').textContent    = userPoints;
    document.getElementById('computer-points').textContent = computerPoints;

    document.getElementById('scoreboard').style.display    = 'flex';
    document.getElementById('choices').style.display       = 'flex';
    document.getElementById('result-box').style.display    = 'none';
    document.getElementById('game-result-box').style.display = 'none';
});

// Handle user choice
['rock', 'paper', 'scissors'].forEach((choice, userIndex) => {
    document.getElementById(choice).addEventListener('click', () => {
        if (roundsLeft <= 0) return;

        // Computer choice
        const compIndex = Math.floor(Math.random() * 3);
        window.computerChoose = compIndex; // data-ns-test requirement

        const compChoice = choices[compIndex];
        const userChoice = choices[userIndex];

        // Show computer choice
        document.getElementById('computer-choose').textContent = compChoice;

        // Determine round result
        let roundResult;
        if (userIndex === compIndex) {
            roundResult = "TIE";
        } else if (
            (userIndex === 0 && compIndex === 2) || // Rock beats Scissors
            (userIndex === 1 && compIndex === 0) || // Paper beats Rock
            (userIndex === 2 && compIndex === 1)    // Scissors beats Paper
        ) {
            roundResult = "WON";
            userPoints++;
        } else {
            roundResult = "LOSE";
            computerPoints++;
        }

        roundsLeft--;

        // Update UI
        const roundResultEl = document.getElementById('round-result');
        roundResultEl.textContent  = roundResult;
        roundResultEl.className    = roundResult;

        document.getElementById('rounds-left').textContent     = roundsLeft;
        document.getElementById('user-points').textContent     = userPoints;
        document.getElementById('computer-points').textContent = computerPoints;
        document.getElementById('result-box').style.display    = 'block';

        // Check if game over
        if (roundsLeft === 0) {
            document.getElementById('choices').style.display = 'none';

            let gameResult;
            if (userPoints > computerPoints)       gameResult = "WON";
            else if (userPoints === computerPoints) gameResult = "TIE";
            else                                    gameResult = "LOSE";

            const gameResultEl = document.getElementById('game-result');
            gameResultEl.textContent = gameResult;
            gameResultEl.className   = gameResult;

            document.getElementById('game-result-box').style.display = 'block';
        }
    });
});

// Restart
document.getElementById('restart').addEventListener('click', () => {
    document.getElementById('scoreboard').style.display      = 'none';
    document.getElementById('choices').style.display         = 'none';
    document.getElementById('result-box').style.display      = 'none';
    document.getElementById('game-result-box').style.display = 'none';
    document.getElementById('game-number').value             = '';
});
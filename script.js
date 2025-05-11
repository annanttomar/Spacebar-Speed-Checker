// Get DOM elements
const startButton = document.getElementById("startButton");
const counterDisplay = document.getElementById("counter");
const timerDisplay = document.getElementById("timer");
const bestScoreDisplay = document.getElementById("bestScore");
const startMessage = document.getElementById("startMessage");
const resetButton = document.getElementById("resetButton");

let pressCount = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let timeLeft = 5;
let isRunning = false;
let timerInterval;

// Show the best score on load
bestScoreDisplay.textContent = `Best: ${bestScore}`;

// Show start message when the game is ready to begin
startButton.addEventListener("click", () => {
  if (isRunning) return;

  pressCount = 0;
  timeLeft = 5;
  isRunning = true;
  counterDisplay.textContent = "Presses: 0";
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  startButton.disabled = true;

  // Show the start message
  startMessage.style.opacity = 1;

  // Fade out start message after 1 second
  setTimeout(() => {
    startMessage.style.opacity = 0;
  }, 1000);

  // Start countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      timerDisplay.textContent = `Time's up!`;
      startButton.disabled = false;

      // Check and update best score
      if (pressCount > bestScore) {
        bestScore = pressCount;
        localStorage.setItem("bestScore", bestScore);
        bestScoreDisplay.textContent = `Best: ${bestScore}`;
      }
    }
  }, 1000);
});

// Listen for spacebar presses
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && isRunning) {
    pressCount++;
    counterDisplay.textContent = `Presses: ${pressCount}`;
  }
});

// Reset best score button logic
resetButton.addEventListener("click", () => {
  localStorage.removeItem("bestScore");
  bestScore = 0;
  bestScoreDisplay.textContent = `Best: ${bestScore}`;
});

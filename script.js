const ghost = document.getElementById("ghost");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
let score = 0;
let ghostInterval;
let gameStarted = false;
let gameDuration = 20;

function getRandomPosition() {
  const maxX = gameArea.clientWidth - ghost.clientWidth;
  const maxY = gameArea.clientHeight - ghost.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  return { x: randomX, y: randomY };
}

function showGhost() {
  const { x, y } = getRandomPosition();
  ghost.style.left = x + "px";
  ghost.style.top = y + "px";
  ghost.style.display = "block";

  ghostInterval = setTimeout(() => {
    ghost.style.display = "none";
    showGhost();
  }, 2000);
}

function increaseScore() {
  score++;
  scoreDisplay.textContent = score;
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startButton.style.display = "none"; // Hide the button.
    timerDisplay.textContent = gameDuration;

    score = 0;
    scoreDisplay.textContent = score;

    let remainingTime = gameDuration;
    const timer = setInterval(() => {
      remainingTime--;
      timerDisplay.textContent = remainingTime;

      if (remainingTime === 0) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);

    showGhost();
  }
}

function endGame() {
  gameStarted = false;
  startButton.style.display = "block"; // Show the button.
  timerDisplay.textContent = gameDuration;
  clearTimeout(ghostInterval);
  ghost.style.display = "none";
}

startButton.addEventListener("click", startGame);

ghost.addEventListener("click", () => {
  increaseScore();
  ghost.style.display = "none";
  clearTimeout(ghostInterval);
  showGhost();
});

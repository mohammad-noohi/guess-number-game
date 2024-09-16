"use strict";

// Elements ---------------------------------------------------
const $ = document;
const body = $.body;
const againBtn = $.querySelector(".again-btn");
const numberElem = $.querySelector(".number");
const input = $.querySelector(".number-input");
const checkBtn = $.querySelector(".check-btn");
const messageElem = $.querySelector(".message");
const scoreElem = $.querySelector(".score");
const highScoreElem = $.querySelector(".highscore");

let highScore = localStorage.getItem("bestScore") ?? "0";
highScoreElem.textContent = highScore;
let score = 20;
let secretNumber = Math.floor(Math.random() * 20) + 1; // 1 - 20


// Functions --------------------------------------------------
function displayMessage(message) {
  messageElem.textContent = message;
}

function resetGame() {
  body.style = "background-color: #222222;";
  messageElem.textContent = "start guessing...";
  score = 20;
  scoreElem.textContent = score;
  numberElem.textContent = "?";
  numberElem.style = "width: 15rem";
  highScore = localStorage.getItem("bestScore") || "0";
  highScoreElem.textContent = highScore;
  input.value = "";
  // generate new random number
  secretNumber = Math.floor(Math.random() * 20) + 1; // 1 - 20
}
// Events -----------------------------------------------------


checkBtn.addEventListener("click", e => {
  const guess = +input.value; // number type
  if (!guess) {
    displayMessage("⛔ wrong number");
  } else {
    if (guess === secretNumber) {
      numberElem.textContent = secretNumber;
      numberElem.style = "width: 30rem";
      displayMessage("🎉 correct");
      body.style = "background-color: #60b347;";

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("bestScore", highScore);
        highScoreElem.textContent = highScore;
      }
    } else {
      if (score > 1) {
        displayMessage(guess > secretNumber ? "📈 to high" : "📉 to low");
        score--;
        scoreElem.textContent = score;
      } else {
        displayMessage("💥you lost the game");
        scoreElem.textContent = "0";
      }
    }
  }
});

againBtn.addEventListener("click", resetGame);

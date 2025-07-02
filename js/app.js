const words = ["PLANET", "ASTEROID", "GALAXY", "SPACEMAN"];
let chosenWord;
let guessedLetters;
let attempts;
const maxAttempts = 6;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const hangmanParts = document.querySelectorAll(".part");

function initGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  attempts = maxAttempts;
  message.textContent = "";
  letterInput.value = "";
  submitBtn.disabled = false;
  letterInput.disabled = false;
  updateDisplay();
  hangmanParts.forEach(part => part.style.display = "none");
}

function updateDisplay() {
  const display = chosenWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;

  const wrongGuesses = guessedLetters.filter(letter => !chosenWord.includes(letter));
  hangmanParts.forEach((part, index) => {
    part.style.display = index < wrongGuesses.length ? "block" : "none";
  });

  if (!display.includes("_")) {
    message.textContent = "🎉 You saved the spaceman!";
    disableInput();
  } else if (wrongGuesses.length >= maxAttempts) {
    message.textContent = `☠️ Spaceman lost! The word was ${chosenWord}`;
    disableInput();
  }
}

function disableInput() {
  submitBtn.disabled = true;
  letterInput.disabled = true;
}

submitBtn.addEventListener("click", () => {
  const input = letterInput.value.toUpperCase();
  if (input && /^[A-Z]$/.test(input) && !guessedLetters.includes(input)) {
    guessedLetters.push(input);
    updateDisplay();
  }
  letterInput.value = "";
});

resetBtn.addEventListener("click", () => {
  initGame();
});

// Initialize the game on page load
initGame();

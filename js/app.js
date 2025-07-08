/*-------------- Constants -------------*/
const words = ["PLANET", "ASTEROID", "GALAXY", "SPACEMAN", "PLUTO", "EARTH", "UNIVERSE", "GRAVITY"]; //word list for the game
const maxAttempts = 6; //maximum number of incorrect attempts allowed
const revealedLettersCount = 1; // how many letters to reveal at the start

/*---------- Variables (state) ---------*/
let chosenWord;
let guessedLetters;
let attempts;
let hintUsed = false;
let math = Math.floor(Math.random() * words.length);
// console.log(math); // this will log the random number generated to the console

// these are all my conditions for the game

/*----- Cached Element References  -----*/
const wordDisplay = document.querySelector("#wordDisplay");
const message = document.querySelector("#message");
const resetBtn = document.querySelector("#resetBtn");
const hangmanParts = document.querySelectorAll(".part");
const keyboard = document.querySelector("#keyboard");
const toggleInstructionsBtn = document.querySelector("#toggleInstructions");
const instructionsBox = document.querySelector("#instructionsBox");
const hintBtn = document.querySelector("#hintBtn");

/*-------------- Functions -------------*/
function init() {
  chosenWord = words[Math.floor(Math.random() * words.length)];

  const lettersToReveal = new Set();
  while (lettersToReveal.size < revealedLettersCount) {
    const randomIndex = Math.floor(Math.random() * chosenWord.length);
    lettersToReveal.add(chosenWord[randomIndex]);
  }
  guessedLetters = Array.from(lettersToReveal);

  attempts = maxAttempts;
  message.textContent = "";
  hintUsed = false;

  if (hintBtn) {
    hintBtn.disabled = false;
    hintBtn.textContent = "💡 Hint";
  }

  if (keyboard) {
    keyboard.innerHTML = ""; // clear previous keyboard buttons
    createKeyboard();        // generate new keyboard buttons
  }

  hangmanParts.forEach(part => part.style.display = "none"); // hide all hangman parts at start
  updateDisplay(); // update word display with revealed letter
}

function useHint() {
  if (hintUsed) return; // Prevent using it more than once

  // Find letters not guessed yet and not already revealed
  const unrevealedLetters = chosenWord
    .split("")
    .filter(letter => !guessedLetters.includes(letter));

  if (unrevealedLetters.length === 0) return;

  // Pick a random unrevealed letter
  const randomLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
  guessedLetters.push(randomLetter);
  updateDisplay();

  hintUsed = true;
  if (hintBtn) {
    hintBtn.disabled = true;
    hintBtn.textContent = "✅ Hint Used";
  }
}

function createKeyboard() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  alphabet.split("").forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.classList.add("letter-btn");
    btn.addEventListener("click", () => handleGuess(letter, btn));
    keyboard.appendChild(btn);
  });
}

function updateDisplay() {
  const display = chosenWord
    .split("") // this will split the word into an array like (["P", "L", "A", "N", "E", "T"])
    .map(letter => (guessedLetters.includes(letter) ? letter : "_")) // this will map letters to either the letter itself or an underscore
    .join(" "); // this will join the letters with a space in between

  wordDisplay.textContent = display; // display the word in the word display element
  const wrongGuesses = guessedLetters.filter(letter => !chosenWord.includes(letter)); // only include wrong guesses

  hangmanParts.forEach((part, index) => {
    part.style.display = index < wrongGuesses.length ? "block" : "none";
  });

  if (!display.includes("_")) {
    message.textContent = "🎉 You saved the spaceman!";
    disableInput(); // display the win message
  } else if (wrongGuesses.length >= maxAttempts) {
    message.textContent = `☠️ Spaceman lost! The word was ${chosenWord}`;
    disableInput(); // display the loss message
  }
}// this function shows the hangman parts based on wrong guesses and checks for win/loss

function handleGuess(letter, btn) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    btn.disabled = true; // disable button after it's clicked
    updateDisplay();
  }
}

function disableInput() {
  // disables keyboard input (used when game is over)
  document.querySelectorAll(".letter-btn").forEach(btn => btn.disabled = true);
}

/*----------- Event Listeners ----------*/
document.addEventListener("DOMContentLoaded", () => {
  // only on home page: toggle instructions box
  if (toggleInstructionsBtn && instructionsBox) {
    toggleInstructionsBtn.addEventListener("click", () => {
      instructionsBox.style.display =
        instructionsBox.style.display === "none" ? "block" : "none";
    });
  }

  // only on game page: use hint button
  if (hintBtn) {
    hintBtn.addEventListener("click", useHint);
  }

  // initialize the game if on game page (wordDisplay is present)
  if (wordDisplay) {
    init();
  }

  // reset game when reset button is clicked
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      init();
    });
  }
});

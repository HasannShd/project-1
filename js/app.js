/*-------------- Constants -------------*/
const words = ["PLANET", "ASTEROID", "GALAXY", "SPACEMAN", "ASSEMBLY", "EARTH", "UNIVERSE", "GRAVITY"]; //word list for the game
const maxAttempts = 6; //maximum number of incorrect attempts allowed

/*---------- Variables (state) ---------*/
let chosenWord;
let guessedLetters;
let attempts;
// these are all my conditions for the game

/*----- Cached Element References  -----*/
const wordDisplay = document.querySelector("#wordDisplay");
const letterInput = document.querySelector("#letterInput");
const submitBtn = document.querySelector("#submitBtn");
const message = document.querySelector("#message");
const resetBtn = document.querySelector("#resetBtn");
const hangmanParts = document.querySelectorAll(".part");

/*-------------- Functions -------------*/
function init() {
    chosenWord = words[math.floor(Math.random() * words.length)]; // randomly select a word from the list
    guessedLetters = [];//this will reset the guessed letters
    attempts = maxAttempts;//max number of attempts is 6
    message.textContent = ""; // clear any previous messages
    letterInput.value = ""; // clear the input field from old rounds
    submitBtn.disabled = false;// enable the submit button once reset
    letterInput.disabled = false;// enable the input field once reset
    updateDisplay();//this will update the display aftre each round
    hangmanParts.forEach(part => part.style.display = "none");// hide all hangman parts at the start
}


/*----------- Event Listeners ----------*/



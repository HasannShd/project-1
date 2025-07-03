/*-------------- Constants -------------*/
const words = ["PLANET", "ASTEROID", "GALAXY", "SPACEMAN", "ASSEMBLY", "EARTH", "UNIVERSE", "GRAVITY"]; //word list for the game
const maxAttempts = 6; //maximum number of incorrect attempts allowed

/*---------- Variables (state) ---------*/
let chosenWord;
let guessedLetters;
let attempts;
let math = Math.floor(Math.random() * words.length);
// console.log(math); // this will log the random number generated to the console


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
    chosenWord = words[math]; // randomly select a word from the list
    // console.log(chosenWord); // this will log the chosen word to the console

    guessedLetters = [];//this will reset the guessed letters
    attempts = maxAttempts;//max number of attempts is 6

    message.textContent = ""; // clear any previous messages
    letterInput.value = ""; // clear the input field from old rounds
    submitBtn.disabled = false;// enable the submit button once reset
    letterInput.disabled = false;// enable the input field once reset

    updateDisplay();//this will update the display aftre each round
    hangmanParts.forEach(part => part.style.display = "none");// hide all hangman parts at the start
}// this function will reset the game and start over

function updateDisplay() {

    const display = chosenWord
        .split("")// this wil split the word into an array like (["P", "L", "A", "N", "E", "T"])
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))// this will map the letters to either the letter itself if it has been guessed or an underscore if it hasn't
        .join(" "); // this will join the letters with a space in between

    wordDisplay.textContent = display;// this will display the word in the word display element mentioned in the HTML
    const wrongGuesses = guessedLetters.filter(letter => !chosenWord.includes(letter));// this will filter the guessed letters to only include the ones that are not in the chosen word

    hangmanParts.forEach((part, index) => {
  part.style.display = index < wrongGuesses.length ? "block" : "none";
});


    if (!display.includes("_")) {
        message.textContent = "🎉 You saved the spaceman!";
        disableInput();// this will display the message if the user has won the game
    }
    else if (wrongGuesses.length >= maxAttempts) {
        message.textContent = `☠️ Spaceman lost! The word was ${chosenWord}`;
        disableInput();
    }// this will check if the user has won or lost the game and display the appropriate message

}//this function shows the hangman parts based on the number of wrong guesses 
// also checks if the game is won or lost
// shows and hides hangman body parts

function disableInput() {
    submitBtn.disabled = true;
    letterInput.disabled = true
}// this function will disable the input field and the submit button when the game is over

/*----------- Event Listeners ----------*/
submitBtn.addEventListener("click", () => {
    const letter = letterInput.value.toUpperCase(); // get the letter from the input field and convert it to uppercase

    if (letter && /^[A-Z]$/.test(letter) && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter); // Add the letter to guessed letters
        updateDisplay(); // Refresh the word display and hangman
    }

    letterInput.value = ""; // Clear the input box
});// this will add the letter to the guessed letters and update the display

resetBtn.addEventListener("click", () => {
  init(); // This re-initializes the game
});// this will reset the game when the reset button is clicked

// Initialize the game when the page loads
init();
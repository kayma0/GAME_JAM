const words = ["nandos"];

let wordKeys = Object.keys(words);
let word = words[Math.floor(Math.random() * words.length)];

console.log(word);

const submitBtn = document.getElementById("submit-btn");
const guessInput = document.getElementById("guess");
const guessList = document.getElementById("guess-list");
const errorMsg = document.getElementById("error-msg");
const attemptsLeft = document.getElementById("attempts-left");

let attempts = 0;
const maxAttempts = 6;

submitBtn.addEventListener("click", function () {
    const guess = guessInput.value.toLowerCase();
    let result = "";

    if (!/^[a-zA-Z]+$/.test(guess)) {
        errorMsg.textContent = "Invalid input! Only letters are allowed.";
        return;
    }


    errorMsg.textContent = ""; // Clear error message if input is valid

    if (guess.length !== 6) {
        result = `Please enter a 6-letter word`;
    } else if (guess === word) {
        result = "You win!";
        submitBtn.disabled = true;
        guessInput.disables = true;
    } else {
        const letters = word.split("");
        for (let i = 0; i < letters.length; i++) {
            if (guess[i] === letters[i]) {
                result += "✔️"; // Correct letter in correct place
            } else if (word.includes(guess[i])) {
                result += "⭕"; // Correct letter but wrong place
            } else {
                result += "❌"; // Incorrect letter
            }
        }
    }

    // Display result
    const listItem = document.createElement("li");
    listItem.textContent = `${guess} - ${result}`;
    guessList.appendChild(listItem);

    attempts++;
    attemptsLeft.textContent = `Attempts Left: ${maxAttempts - attempts}`;

    if (attempts >= maxAttempts && guess !== word) {
        errorMsg.textContent = 'Game Over!';
        submitBtn.disabled = true;
        guessInput.disabled = true;
    }
    
    // Clear input
    guessInput.value = "";
});

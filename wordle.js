const words = ["nandos"];

let word = words[Math.floor(Math.random() * words.length)];
console.log(word);

const submitBtn = document.getElementById("submit-btn");
const guessInput = document.getElementById("guess");
const guessList = document.getElementById("guess-list");

let attempts = 0;

submitBtn.addEventListener("click", function () {
    const guess = guessInput.value.toLowerCase();
    let result = "";
    attempts++;

    if (guess.length !== word.length) {
        result = `Please enter a 6-letter word`;
    } else if (guess === word) {
        result = "You win!";
        submitBtn.disabled = true;
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
    
    // Clear input
    guessInput.value = "";
});

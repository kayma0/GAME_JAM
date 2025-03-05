const words = ["nandos"];

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

  errorMsg.textContent = "";

  if (guess.length !== 6) {
    errorMsg.textContent = "Please enter a 6-letter word";
    return;
  }

  if (guess === word) {
    errorMsg.textContent = "You win!";
    submitBtn.disabled = true;
    guessInput.disabled = true;
    setTimeout(() => {
      window.location.href = "puzzle.html";
    }, 2000);
    return;
  } else {
    const letters = word.split("");
    for (let i = 0; i < letters.length; i++) {
      if (guess[i] === letters[i]) {
        result += "✔️";
      } else if (word.includes(guess[i])) {
        result += "⭕";
      } else {
        result += "❌";
      }
    }
  }

  const listItem = document.createElement("li");
  listItem.textContent = `${guess} - ${result}`;
  guessList.appendChild(listItem);

  attempts++;
  attemptsLeft.textContent = `Attempts Left: ${maxAttempts - attempts}`;

  if (attempts >= maxAttempts) {
    errorMsg.textContent = "Game Over! Restarting...";
    submitBtn.disabled = true;
    guessInput.disabled = true;
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  guessInput.value = "";
});

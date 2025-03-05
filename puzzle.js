var rows = 3; // Change from 5x5 to 3x3
var columns = 3;
var turns = 0;

var currTile;
var otherTile;

window.onload = function () {
  let board = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.src = "./imagy-splitted-images/black_piece.jpg";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }

  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString());
  }

  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./imagy-splitted-images/" + pieces[i] + ".jpg";

    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("dragenter", dragEnter);
    tile.addEventListener("dragleave", dragLeave);
    tile.addEventListener("drop", dragDrop);
    tile.addEventListener("dragend", dragEnd);

    document.getElementById("pieces").append(tile);
  }

  // Start Timer
  startTimer();
};

// Function to handle the timer
function startTimer() {
  let timeLeft = 30; // 30 seconds
  let timerDisplay = document.getElementById("timer");

  let countdown = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert("Time's up! You lost! 😢");
      window.location.href = "memory.html"; // Redirect to index page
    }
  }, 1000);

  // Done button event listener
  document.getElementById("doneButton").addEventListener("click", function () {
    clearInterval(countdown); // Stop the timer
    alert("Congratulations! You won! 🎉");
    window.location.href = "memory.html"; // Redirect to index page
  });
}

// Drag & Drop Functions
function dragStart() {
  currTile = this;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {}
function dragDrop() {
  otherTile = this;
}
function dragEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;

  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;
}

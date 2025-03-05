//first declare the errors and make a list of the cards
var errors = 0;
var cardList = [
    "bucket",
    "chair",
    "collar",
    "ferris",
    "icecream",
    "sandcastle",
    "sandals",
    "seagull",
    "toy",
    "treats"
];

//declare more variables
var cardSet;
var board = []; //will be populated after the game loads and cards are shuffled
var rows = 4;
var col = 5;
var lives = 5; //player starts with 3 lives
var matchedPairs = 0; // Track the number of matched pairs
var select1 = null; // Store the first selected card element
var select2 = null; // Store the second selected card element
var canClick = true; // Flag to control whether cards can be clicked

//when the page loads it'll shuffle the cards and start the game
window.onload = function () {
    shuffleCards(); //will duplicate cards from cardList, the cards we playingg
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //duplicates each card in the card list 
    console.log(cardSet);
    //shuffling timeee
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //generates random index
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    // 4 by 5 board layout
    for (let r = 0; r < rows; r++) {
        let row = []; // Initialize a new row
        for (let c = 0; c < col; c++) {
            let cardImage = cardSet.pop();
            row.push(cardImage); // Push the card image to the current row

            // Create the <img> element
            let card = document.createElement("img"); // Image tag
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImage + ".png"; // Set the image source
            card.classList.add("card");
            card.addEventListener("click", selectCard); // Add click event listener
            document.getElementById("memboard").append(card);
        }
        board.push(row); // Push the current row to the board
    }
    console.log(board); //print the board
    setTimeout(hideCards, 5000); // shows cards for a certain amount of time before hiding 
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < col; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "cardcover.png"; // sets card to the back of the card 
        }
    }
}

function selectCard() {
    // Only allow clicking if the card is covered and no more than 2 cards are selected
    if (this.src.includes("cardcover.png") && canClick) {
        if (!select1) {
            select1 = this; // Store the first selected card element
            let coords = select1.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            select1.src = board[r][c] + ".png"; // Show the card image
        } else if (!select2 && this != select1) {
            select2 = this; // Store the second selected card element
            let coords = select2.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            select2.src = board[r][c] + ".png"; // Show the card image
            canClick = false; // Disable further clicks until the pair is resolved
            setTimeout(update, 1000); // Wait 1 second before checking for a match
        }
    }
}

function update() {
    if (select1.src === select2.src) {
        matchedPairs += 1; // Increment the matched pairs counter

        // Check if all pairs have been matched
        if (matchedPairs === cardList.length) {
            showWinMessage(); // Show the winning message
        }
    } else {
        //if the cards aren't the same, flip them back
        select1.src = "cardcover.png";
        select2.src = "cardcover.png";
        errors += 1;
        document.getElementById("errors").innerText = errors;

        // Check if the player has made too many errors
        if (errors >= 1) { // Adjust the threshold as needed
            lifeLost();
        }
    }
    

    // Reset selected cards and re-enable clicking
    select1 = null;
    select2 = null;
    canClick = true; // Re-enable clicking for the next pair
    
}

function lifeLost() {
    lives = lives -1;
    document.getElementById("lives").innerText = lives; // Update the lives display
    if (lives > 0){
        alert(`Oh no! You lost a life! Lives remaining: ${lives}`);
    } else if (lives == 0) {
        alert("Game over! You've run out of lives.");
        restartGame();
    }
}

function restartGame() {
    lives = 3; // Reset lives
    matchedPairs = 0; // Reset the matched pairs counter
    errors = 0; // Reset errors
    // Reset the board
    document.getElementById("memboard").innerHTML = ""; // Clear the board
    board = []; // Reset the board array
    errors = 0; // Reset the error count
    document.getElementById("errors").innerText = errors; // Update the error display 
    // Shuffle and start the game again
    shuffleCards();
    startGame();
}

function showWinMessage() {
    alert("Congratulations! You've matched all the pairs!");
    window.location.href = "end.html"; //finish screen
}
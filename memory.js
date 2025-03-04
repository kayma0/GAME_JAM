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
            document.getElementById("memboard").append(card);

        }
        board.push(row); // Push the current row to the board
    }
    console.log(board);
}
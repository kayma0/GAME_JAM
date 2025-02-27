//These select the background, the character, and the gems on the screen..
let background = document.querySelector(".game-container");
let character = document.querySelector(".character");
let gems = document.querySelectorAll(".gem");

let background_position = 0; //keeps track of the backgrounds horizontal postion..its set to 0 now, and the game continues, it decreases..
let character_speed = 5; //keeps track of how fast the character and the background moves
let character_position = 100; //keeps track of the characters postion on the screen..i100px gives a good starting position..any other number may be too close to or far away from the edge of the screen
let gems_collected = 0; //counts how many questions the player got right

//The questions using an array of dictionary keys and values...an array that stores dictionaries..dictionaries that store keys and values
let questions = [
  { question: "1+1=", answer: "2" },
  {
    question: "2+2=",
    answer: "4",
  },
  { question: "3+3=", answer: "6" },
  { question: "4+4=", answer: "8" },
];

// This tracks the collected gems..it creates an array with the number of gems we have, and then fills up the 3 slots with false, just so we dont repeat the same questions
let collected_gems = new Array(gems.length).fill(false);

function moveBackground() {
  background_position -= character_speed; //this moves the background to the left, and moves the charater to the right..the character walks forward
  //this line creates a scrolling effect..
  //mind you, backgroundPositionX is a css property that controls the horizontal position of the background image...if its y, then vertical
  background.style.backgroundPositionX = background_position + "px"; //I used +px cause css needs px values..to convert it into a valid css value
  character_position += character_speed; //of course, this moves the player to the right..
  character.style.left = character_position + "px"; //just like the one for the background..

  // Check for gem collision
  gems.forEach((gem, index) => {
    //this is for looping through all the gems
    let gem_position = parseInt(gem.style.left); //this gets the horizontal position of a gem from css nd coverts it to a number so we can use it in calculations

    //They said we should make sure we let them know if any part of the code is from chat gpt..this part for the gems is from chatgpt..
    //didnt know how to do it😔..but now i understand it a little soo..that's what's important i guess😂
    //Anyways, this basically checks if the character is touching a gem..an if the gem has been collected before
    if (
      !collected_gems[index] &&
      character_position >= gem_position - 50 &&
      character_position <= gem_position + 50
    ) {
      collected_gems[index] = true; //marks as collected

      let user_answer = prompt(questions[index].question); //this gets the question from the questions array and displays it as a prompt using JS Alert
      if (user_answer.toLowerCase() === questions[index].answer.toLowerCase()) {
        //this means for e.g. Two is same as two..or Fish is same as fish..you get?
        alert("CONTINUE!");

        // This removes the gem because it has been collected..
        gem.style.display = "none";
        gems_collected++;

        //if the number of gems collected is equal to the question length, the game restarts..
        if (gems_collected === questions.length) {
          setTimeout(restartGame, 1000); // The game restarts after the last question..with some delay ofcourse!
        }
      } else {
        alert("Wrong answer! Game Over.");
        location.reload(); // This reloads the page if the player gets a question wrong...and wellll, the game starts again..lol
      }
    }
  });

  requestAnimationFrame(moveBackground); //funnnn facttt; that function i used to call moveBackground is a built-in JavaScript function that tells the browser to run a function before the next screen refresh..now you know 😙
}

function restartGame() {
  alert("You answered all questions! Restarting...");
  gems_collected = 0;
  collected_gems.fill(false); // Reset collection status

  // Reset character position
  background_position = 0; //this resets the number of gems collected by the character

  //these also set the character and background back to their original starting points..
  character_position = 100;
  background.style.backgroundPositionX = background_position + "px";
  character.style.left = character_position + "px";

  //This loops through each gem and makes them all visible again..yay!!
  gems.forEach((gem, index) => {
    gem.style.display = "block";
  });

  //andddd our game starts again..yipee!!
  moveBackground();
}

moveBackground(); //ummm yk what this is right 🥹?

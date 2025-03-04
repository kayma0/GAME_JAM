let CharacterState = "run";
const canvas = document.getElementById('game-container');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const CharacterImg = new Image();
CharacterImg.src = "size ref can edit.png";
const CharacterWidth = 575;
const CharacterHeight = 523;

let gameFrame = 0;
const staggerFrame = 5;
const CharacterAnimations = [];

const animationState = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    }
];

animationState.forEach((state, index) => {
    let frames = {
        //location
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * CharacterWidth;
        let positionY = index * CharacterHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    CharacterAnimations[state.name] = frames;
});

let characterY = 400; // Ground position
let isJumping = false;
let jumpStartTime = 0;
let jumpDuration = 300; // 2 seconds
let gravity = 4;

// Change CharacterState when a key is pressed
document.addEventListener("keydown", (event) => {
  if (!isJumping && (event.key === "w" || event.key === " " || event.key === "ArrowUp")) {
    isJumping = true;
    CharacterState = "jump";
    jumpStartTime = Date.now(); // Store the start time
}
});
document.addEventListener("keypress", (event) => {
  if (!isJumping && (event.key === "w" || event.key === " " || event.key === "ArrowUp")) {
    isJumping = true;
    CharacterState = "jump";
    jumpStartTime = Date.now(); // Store the start time
}
});



function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (isJumping) {
      let elapsedTime = Date.now() - jumpStartTime;

      if (elapsedTime < jumpDuration) {
          // Move character up for 2 seconds
          characterY = 400 - (elapsedTime / jumpDuration) * (CANVAS_HEIGHT / 6);
      } else {
          // Start falling after 2 seconds
          CharacterState = "fall";
          characterY += gravity;

          if (characterY >= 400) { 
              characterY = 400;
              isJumping = false;
              CharacterState = "run";
          }
      }
  }   
    //do podition increaes by 1 every time game frame increases by 5 and only cycles between 0 and 6
    let position = Math.floor(gameFrame / staggerFrame) % CharacterAnimations[CharacterState].loc.length;
    let frameX = CharacterWidth * position;
    let frameY = CharacterAnimations[CharacterState].loc[position].y;

    ctx.drawImage(CharacterImg, frameX, frameY, CharacterWidth, CharacterHeight, 0, characterY, CharacterWidth/6, CharacterHeight/4);

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();
/*old java
//These select the background, the character, and the gems on the screen..
let background = document.querySelector(".game-container");
let character = document.querySelector(".character");
let gems = document.querySelectorAll(".gem");
let thoughtCloud = document.getElementById("thoughtCloud"); //I'm not sure what its called so i named it thought cloud 😭😂
let thoughtText = document.getElementById("thoughtText"); // Text inside the cloud

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

  thoughtCloud.style.left = character_position + 50 + "px";
  thoughtCloud.style.bottom = "160px";

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
        gems_collected++; //gems collected
        //this means for e.g. Two is same as two..or Fish is same as fish..you get?
        showThought(
          `Yay! I got ${gems_collected} gem${gems_collected > 1 ? "s" : " "}!`,
          5000
        );
        alert("CONTINUE!");
        gem.style.display = "none"; //hide the thought cloud again..This removes the gem because it has been collected..

        //if the number of gems collected is equal to the question length, the game restarts..
        if (gems_collected === questions.length) {
          setTimeout(restartGame, 5000); // The game restarts after the last question..with some delay ofcourse!
        }
      } else {
        showThought("Oh no..", 5000);
        setTimeout(() => {
          alert("Wrong answer! Game Over.");
          location.reload(); // This reloads the page if the player gets a question wrong...and wellll, the game starts again..lol
        }, 2000);
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

function showThought(message, duration) {
  thoughtText.innerText = message; //used to set the text in the thought cloud
  thoughtCloud.style.display = "block"; // show the thought cloud

  setTimeout(() => {
    thoughtCloud.style.display = "none"; // hide the thought cloud after duration
  }, duration);
}

moveBackground(); //ummm yk what this is right 🥹?

//UGHHH I'M CONFUSED NOW!
*/
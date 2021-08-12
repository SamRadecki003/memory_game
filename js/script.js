//Card Data
const cardsArray = [
  {
    name: "soccer",
    img: "img/soccer.png",
  },
  {
    name: "tennis",
    img: "img/tennis.png",
  },
  {
    name: "basketball",
    img: "img/basketball.png",
  },
  {
    name: "butterfly",
    img: "img/butterfly.png",
  },
  {
    name: "cat",
    img: "img/cat.png",
  },
  {
    name: "dog",
    img: "img/dog.png",
  },
  {
    name: "golf",
    img: "img/golf.png",
  },
  {
    name: "hockey",
    img: "img/hockey.png",
  },
  {
    name: "volleyball",
    img: "img/volleyball.png",
  },
  {
    name: "zzz",
    img: "img/zzz.png",
  },
  {
    name: "sandwhich",
    img: "img/sandwhich.png",
  },
  {
    name: "love",
    img: "img/love.png",
  },
];

// Grab the div with an id of root
const game = document.getElementById("game");

// Create a section with a class of grid
const grid = document.createElement("section");
grid.setAttribute("class", "grid");

// Append the grid section to the game div
game.appendChild(grid);

// Duplicate array to create a match for each card
let gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(() => 0.75 - Math.random());

// For each item in the cardsArray array...
gameGrid.forEach((item) => {
  // Create a div
  const card = document.createElement("div");

  // Apply a card class to that div
  card.classList.add("card");

  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = item.name;

  // // Create front of card
  const front = document.createElement("div");
  front.classList.add("front");

  // // Create back of card, which contains
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${item.img})`;

  // Append the div to the grid section
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

let count = 0;
let firstGuess;
let secondGuess;
let previousTarget;
let delay = 1200;

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;

  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};
// Add event listener to grid
grid.addEventListener("click", function (event) {
  // The event target is our clicked item
  let clicked = event.target;

  // Do not allow the grid section itself to be selected; only select divs inside the grid
  if (clicked.nodeName === "SECTION" || clicked === previousTarget) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty...
    if (firstGuess !== "" && secondGuess !== "") {
      // and the first guess matches the second match...
      if (firstGuess === secondGuess) {
        // run the match function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    // Set previous target to clicked
    previousTarget = clicked;
  }
});
// Add match CSS
const match = () => {
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  });
};

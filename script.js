const gameContainer = document.getElementById("game");

let counterTwo = 0;
let colorOne = "";
let colorTwo = "";
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.setAttribute('id','card');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor= currentCard.className;

  //Check if colorOne and colorTwo are occupied already, we don't want them to have any colors yet

  if (!colorOne || !colorTwo) {
    currentCard.classList.add("flipped");
    colorOne = colorOne || currentCard;
    //turniary statement, if colorOne is equal to currentCard, then colorTwo is null; otherwise it is currentCard
    colorTwo = currentCard === colorOne ? null : currentCard;
  }

  if (colorOne && colorTwo) {
    noClicking = true;
    // debugger
    let gif1 = colorOne.className;
    let gif2 = colorTwo.className;

    if (gif1 === gif2) {
      counterTwo += 2;
      colorOne.removeEventListener("click", handleCardClick);
      colorTwo.removeEventListener("click", handleCardClick);
      colorOne = null;
      colorTwo = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        colorOne.style.backgroundColor = "";
        colorTwo.style.backgroundColor = "";
        colorOne.classList.remove("flipped");
        colorTwo.classList.remove("flipped");
        colorOne = null;
        colorTwo = null;
        noClicking = false;
      }, 1000);
    }

  if (counterTwo === COLORS.length) alert("game over!");

  }

}

// function MemGame(){

//   while(counterTwo == true){

//     colorTwo= event.target.className;
  
//     colorTwo.style.backgroundColor= colorTwo.className;
  
//     colorTwo= event.target.className;
  
//     if(colorOne.className === colorTwo.className){
//       counterTwo = false;
//       console.log("A MATCH!");
//     }
//     else{
//       colorOne.style.backgroundColor= "";
//       colorTwo.style.backgroundColor= "";
//       console.log("DON'T MATCH!");
//     }
  
//   }

// }

// if (counterTwo == true){

//   console.log("HELLO!!!!!!!!!")

// }

// let deck = document.querySelectorAll(".card");

// let deck = document.getElementsByTagName("div");

// let deckArray = Array.prototype.slice.call( deck, 0 )

// deck.splice(0,1);

// deck.splice(8,1);



// for (let items in deck){
//   console.log(items);
// }

// MemGame();

// when the DOM loads
createDivsForColors(shuffledColors);



/**
 * Add two numbers together
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Number}      The total of the two numbers
 */

/**
 * Checks if input keeps to certain constraints
 * @param {String} input The user input 
 * @return {boolean}
 */
function checkInputErrors(input) {
    if (isNaN(input))
        alert("Please enter a number!");

    // If a game is less than 4 squares there it is entirely unfair, there is no chance
    // that the second player can win
    else if (input < 4)
        alert("Must have atleast 4 squares for game to be somewhat fair!");

    else return true;
    return false;
}

/**
 * Draws number of squares requested by user
 * @param {int} userInput 
 */
function drawSquares(userInput) {
    for (let i = 0; i < userInput; i++) {
        let square = document.createElement('div');
        square.className = 'square';
        gameContainer.appendChild(square);
    }
}

/**
 * alternate colors depending on player turn
 * @param {Element} square 
 * @param {boolean} turn true for player 1 false for player 2
 */
function colorSquare(square, turn) {
    if (isPlayer1Turn === true)
        square.style.backgroundColor = 'blue';
    else square.style.backgroundColor = 'red';
}

/**
 * changes current players turn and resets selection to first
 */
function changeTurns() {
    isPlayer1Turn = !isPlayer1Turn;
    selectionInfo.selection = 1;
}

//DEBUG
let userInput = "6";


let isPlayer1Turn = true;
let selectionInfo = {
    firstSelectionIndex: -1,
    selection: 1
}

// error handling for userInput
while (true) {
    // userInput = prompt("Please enter a number");
    if (checkInputErrors(userInput)) {
        userInput = parseInt(userInput);
        break;
    }
}

/**
 * returns if clicked square is adjacent to first
 * @param {Element} square 
 * @param {int} index index of first square selection - this is second
 * @return {boolean}
 */
function isAdjacent(square, index) {
    return (square.index - 1 == index) || (square.index + 1 == index);
}

// Get container that will hold squares
let gameContainer = document.getElementById("paper-container");
drawSquares(userInput);

// get squares
let squares = document.getElementsByClassName("square");

// using a for loop rather than a foreach as we need an index, becausewant to be able to store the placement 
// of square
for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    // becomes false if has no adjacent reachable siblings or is already colored 
    square.reachable = true;
    // store placement in strip
    square.index = i;
    square.addEventListener("click", () => {
        if (square.reachable == true) {

            // if players second pick and chosen square is not adjacent
            if (selectionInfo.selection == 2 && !isAdjacent(square, selectionInfo.firstSelectionIndex)) {
                alert("Your second choice must be adjacent to the" +
                    " first");
                return;
            }

            colorSquare(square, isPlayer1Turn);
            square.reachable = false;

            // if second selection of players turn
            if (selectionInfo.selection == 2) {
                changeTurns();
                return;
            }
            selectionInfo.firstSelectionIndex = square.index;
            selectionInfo.selection++;
        }
    })
}



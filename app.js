// Element selectors
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Game state variables
let isOTurn = true; // player O starts
let moveCount = 0; // Tracks number of moves to check for draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game function
const resetGame = () => {
  isOTurn = true;
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Box click event handler
boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
});

// Handle box click
function handleBoxClick(e) {
  const box = e.target;

  box.innerText = isOTurn ? "O" : "X";
  box.disabled = true;
  isOTurn = !isOTurn;
  moveCount++;

  if (checkWinner()) return;

  if (moveCount === 9) {
    gameDraw();
  }
}

// Check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const boxA = boxes[a].innerText;
    const boxB = boxes[b].innerText;
    const boxC = boxes[c].innerText;

    if (boxA && boxA === boxB && boxB === boxC) {
      showWinner(boxA);
      return true;
    }
  }
  return false;
};

// Show draw message
const gameDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, ${winner} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Reset game events
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

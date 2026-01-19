var diceRollOne = Math.floor(Math.random() * 6) + 1
var diceRollTwo = Math.floor(Math.random() * 6) + 1
var diceOne = document.querySelector(".img1")
var diceTwo = document.querySelector(".img2")

diceOne.setAttribute("src", "images/dice" + diceRollOne + ".png");
diceTwo.setAttribute("src", "images/dice" + diceRollTwo + ".png");

if (diceRollOne > diceRollTwo) {
    document.querySelector("h1").textContent = "Player 1 wins!";
} else if (diceRollOne < diceRollTwo) {
    document.querySelector("h1").textContent = "Player 2 wins!";
} else {
    document.querySelector("h1").textContent = "It's a draw";
}
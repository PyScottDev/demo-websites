var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function startGame() {
  if (level === 0) {
    nextSequence();
  }
}

$(document).keypress(startGame);
$(document).on("pointerdown", startGame);

  



function nextSequence() {
    userClickedPattern = [];

    level ++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, i * 600);
    }

}


$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function playSound (name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over")
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 100)
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];


}

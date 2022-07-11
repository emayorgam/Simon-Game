var buttonColors = ["red", "blue", "green", "yellow"];

// patterns
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

//Keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;


// Key press to start the game
$(document).keypress(function() { //when any key is pressed in the DOM then start the function
  if (!started) { //when started is different from false
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Button click
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); // get the attribute of the clicked button
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

});

// Check Answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //if the most recent user answer is the same as the game pattern.

    if (gamePattern.length === userClickedPattern.length) { //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
      setTimeout(function() { //Call nextSequence() after a 1000 millisecond delay.
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over. Press Any Key to Restart");
    startOver();
  }
}

// Play the next button of the sequence
function nextSequence() {
  userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber]; //select random color position in the array with the random number
  gamePattern.push(randomChosenColor); //add chosen color to game pattern

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animate Button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

// Start Over
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let levelNumber = 0;
let started = false;

//The game will begin only after the user pressed on the button on the keyboard.
$(document).on("keydown", function () {
  if (!started){
    nextSeguence();
    started = true;
  }
});

//There game responses on the user's click on the button.
$(".btn").click(function (){
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//This function generates a random element in the pattern, which the user should repeat.
function nextSeguence(){
  userClickedPattern = [];
  levelNumber++;
  $("#level-title").text("Level " + levelNumber);
  const randomNumber = Math.round(Math.random()*3);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);//Animation of the picked element.
  playSound(randomChosenColor);
}

function playSound(name){
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// This function animates a user-selected element.
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//This function determins the behavior of the programm, according to the user's selection of buttons.
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSeguence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){
  levelNumber = 0;
  gamePattern = [];
  started = false;
}

let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let levelNumber = 0;
let moveOn = true;

//The game will begin only after the user pressed on the button on the keyboard.
$(document).on("keydown", function () {
  if (levelNumber === 0){
    nextSeguence();}
})

//There game responses on the user's click on the button.
$(".btn").click(function (event){
  const userChosenColor = event.target.id;
  $("#" + userChosenColor).fadeOut(100).fadeIn(100);//Animation of the picked element.
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);

  //Only if the user has choosen the button correctly, the game continues
  if(userClickedPattern.length === gamePattern.length){
    userClickedPattern.forEach(function(value, index){
      if(userClickedPattern[index] !== gamePattern[index]){
        moveOn = false;
      }
    })
    if(moveOn){
      userClickedPattern.splice(0);
      setTimeout(function() {
        nextSeguence();}, 1000);
    }
  }
  //If the user makes a mistake, the game ends.
  userClickedPattern.forEach(function(value, index){
    if(userClickedPattern[index] !== gamePattern[index]){
        gameOver();
        userClickedPattern.splice(0);
        gamePattern.splice(0);
        levelNumber = 0;
      }
  })
})

//This function generates a random element in the pattern, which the user should repeat.
function nextSeguence(){
  levelNumber++;
  $("h1").text("Level " + levelNumber);
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// This function animates a user-selected element.
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function gameOver(){
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 100);
  playSound("wrong");
}

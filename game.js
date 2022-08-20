var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level= 0;
var started = false;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var idColor = $(this).attr('id');

  userColor(idColor);
  animatePress(idColor);


})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
      nextSequence();
      }, 1000);

    }

  }else{
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
          $("body").removeClass("game-over");
    }, 200);
    startOver();
    $("h1").html("Game Over, Press Any Key to Restart");
  }

}

function startOver(){
  level= 0;
  gamePattern = [];
  started =  false;
}



function nextSequence(){

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()* 4);
  var randomChosenColour = buttonColours[randomNumber];

  level++;

  $("#level-title").text("Level " + level);

  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
  soundButton(randomChosenColour);

  gamePattern.push(randomChosenColour);
}


function soundButton(color){
  var color = new Audio("sounds/"+color+".mp3");
  color.play();
}

function animatePress(currentColour){
  $("."+ currentColour).addClass("pressed");
  setTimeout(function() {
        $(".btn").removeClass("pressed");
   }, 100);
}

function userColor(userChosenColour){ //this  function will play sound and push a color name in array named "userClickedPattern"
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  soundButton(userChosenColour);
}

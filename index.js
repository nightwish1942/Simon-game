
/**

@version: 0.1
@author: rui

**/

var buttonColors = new Array("red","blue","green","yellow");
var gamePattern =[];
var userClickPattern = [];
var level = 0;
var start = false;
var clickTime = 0;
var same = false;

$("#restart_button").hide();
$("#player").hide();
$("#user").click(function(){
  var userName = prompt("Please enter your name");
  alert("Welcome to Simon Game "+userName);
  $("h2").text("Player: "+userName);
});


$(document).keypress(function(){
  if(!start){
    $("h1").text("Level "+level);
    $("#user").fadeOut(100);

    $("h2").fadeIn();
    newSequence();
    start = true;
  }
});

// $(".btn").click(function(){
//   //get the color of button pressed;
//   var userChosenColor=$(this).attr("id");
//   //add it to the end of the userClickedPattern;
//   userClickPattern.push(userChosenColor);
//   //sound animation and check;
//   playSound(userChosenColor);
//   animatePress(userChosenColor);
//   checkAnswer(gamePattern,userClickPattern);
//
// });

$(".btn").click(function(){

  clickTime++;

    var userChosenColor=$(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    if (clickTime === gamePattern.length){
      checkAnswer();
    }else{
      newSequence();
    }
});


function newSequence(){
  //

  //level plus one each time newSequence() is called;
  level = level + 1;
  userClickedPattern = [];
  //change the h1 header;
  $("h1").text("Level "+level);
  //randomly generate a number;
  var randomNumber = Math.floor(Math.random()*4);
  //match the number to color;
  var randomChosenColor = buttonColors[randomNumber];
  //put this color to the end of the randomChosenColour;
  gamePattern.push(randomChosenColor);

  //animation showing that the color has been chosen by computer;
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //sound
  playSound(randomChosenColor);
}

function checkthrough(){
  for (var i = 0; i < gamePattern.length; i++){
    if (userClickPattern[i] === gamePattern[i]){
      same = true;
    }
    else{
      same = false;
    }
  }
  return same;
}

function checkAnswer(){
    if (checkthrough()){
      userClickedPattern = [];
      win();
    }else {
      // playSound("wrong");
      // //animation
      // $("body").addClass("game-over");
      // //text changed
      // $("h1").text("Game Over.");
      restart();
      lose();
    }
  }

  function playSound(name){
      var audio = new Audio ("sounds/"+name+".mp3");
      audio.play();
  }
  //animation when the button is being pressed;
  function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
      setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");}, 100);
  }

// function startOver(gamePattern){
//
//   level = 0;
//   gamePattern = [];
//   start = false;
// }

function win(){
  setTimeout(function () {
      if (gamePattern.length === 20 ){

        $("h1").text("You win! ");
        $("h2").hide();

        restart();
      }else{
        newSequence();
      }
    }, 1000);
}

function lose(){
  playSound("wrong");
  //animation
  $("body").addClass("game-over");
  //text changed
  $("h1").text("Game Over.");
  setTimeOut(function(){
    $("body").removeClass("game-over");
  },200);
}

function restart(){
  $("#restart_button").show(function(){
    $("#restart_button").click(function(){
      restart_ = confirm("Restart?");
      if (restart_==true){
          setTimeout(function(){
            open("index.html");},300);
      }
      else {
        $("h1").text("Thanks for playing.");
        $("#body").click(function(){open("startpage.html");});
      }
    });
  });
}

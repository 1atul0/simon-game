//initial game colour
var buttonColours = ["red", "blue", "green", "yellow"];

//game pattern were made when nextsequece function call
var gamePattern = [];


// when current level end then every time userClicedPattern array restart to zero
var userClicedPattern = [];


var started = false;
var level = 0;

//if game is not started then start using keypress and update started=true
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequenc();
    started = true;
  }
});


//if click by mouse on button then every time userclickepattern is added
$(".btn").click(function () 
{
  var userChosenColour = $(this).attr("id");
  userClicedPattern.push(userChosenColour);
  // alert(userChosenColour);
  // console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClicedPattern.length - 1);
});

//if userclicked pattern and gamepattern match or started=fasle then nextsequece function 
//call
function nextSequenc() {
  //starting of game
  userClicedPattern=[];//every game level userClickedPattern is update to empty
  var randomNumber = Math.floor(Math.random() * 4);//generate no. between 0-3
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);//add generated random color to gamepattern array
  $("#" + randomChosenColour)//add animation to randomchosen id
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  level++;//update evey level by 1
  $("#level-title").text("level " + level);//change h1 text to every level increased
}



//to check gamepattern array and userclicked array's element is same or not
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClicedPattern[currentLevel]) {
    console.log("yes");
    if (userClicedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequenc();
      }, 1000);
    }
  } else {
    // console.log("no");
    var audio =new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game over,Press any key to Restart");
    startOver();

  }
}

//when hit wrong button then call
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}


// when color div is pressed then animation change of button 
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $(".btn").removeClass("pressed");
  }, 100);
}


//play sound if any color is pressed and playsound function is called
function playSound(colorSourcePath) {
  var audio = new Audio("sounds/" + colorSourcePath + ".mp3");
  audio.play();
}

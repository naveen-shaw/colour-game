
var btnColour = ["green" , "red" , "yellow" , "blue"];

gamePattern=[];
userClickedPattern=[];
start=false;
level=0;

//start game by keypress

$(document).keypress(function(){
    
    if(!start)
    {
        start=true;
        $("h1").text("Level " + level);
        /* alert("New game keypress") */
        $("#strtBtn").addClass("startBtnVisibility");
        nextSequence();
    }
});

//start game by click

$(".startBtn").click(function(){
    
    if(!start)
    {
        /* alert("New game click") */
        start=true;
        $("h1").text("Level " + level);
        $("#strtBtn").addClass("startBtnVisibility");
        nextSequence();
    }
});

//gameSequence

function nextSequence()
{
    level++;
    $("h1").text("Level " + level);
    userClickedPattern=[];
    var gameNumber = Math.floor(Math.random() * 4);
    gameCurColour=btnColour[gameNumber];
    $("." +gameCurColour).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(gameCurColour);
    makeSound(gameCurColour);
}

// user click pattern

$(".btn").click(function(){

    var curBtn = $(this).attr("id");
    userClickedPattern.push(curBtn);
    makeSound(curBtn);
    btnPressed(curBtn);
    checkAnswer(userClickedPattern.length-1);
});

//check answer

function checkAnswer(curLevel)
{
    if(gamePattern[curLevel] === userClickedPattern[curLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000) ;
        }
    }
    else
    {
        $("h1").text("Game over noob 🤣 , press any key to continue ");
        start=false;
        makeSound("wrong");
        $("body").addClass("game-over");
        setInterval(function(){
            $("body").removeClass("game-over");
        },1000);
        $("#strtBtn").removeClass("startBtnVisibility");
        startAgain();
    }
}

//start again
function startAgain()
{
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    start=false;
}

//sound

function makeSound(btnKey){
    var audio=new Audio("sounds/" + btnKey +".mp3");
    audio.play();
}

//button pressed

function btnPressed(curBtnPressed)
{
    $("."+curBtnPressed).addClass("pressed");
    setTimeout(function(){
        $("."+curBtnPressed).removeClass("pressed");
    },200);
}
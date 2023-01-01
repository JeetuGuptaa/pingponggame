var score = 0;
var topRod = document.getElementById("rod1");
var bottomRod = document.getElementById("rod2");
var ball = document.getElementById("ball");
var gameBody = document.getElementById("gameBody");
var updateScore = document.getElementById("updateScore");
var previousScore = localStorage.getItem("previousScore");

var bodyCoords = gameBody.getBoundingClientRect();
var rodCoords = topRod.getBoundingClientRect();
var ballCoords = ball.getBoundingClientRect();


topRod.style.left = Math.floor((bodyCoords.width - rodCoords.width)/2) + "px";
bottomRod.style.left = Math.floor((bodyCoords.width - rodCoords.width)/2) + "px";

bottomRod.style.top = Math.floor(bodyCoords.height - rodCoords.height) - 16 + "px";
ball.style.top = rodCoords.height + "px";
ball.style.left = Math.floor((bodyCoords.width - ballCoords.width)/2) + "px";

if(!previousScore){
    alert("This is your First time playing this game, Press Enter to start the game");
}
else{
    alert("Your maximum score is " + previousScore + ", Press Enter to start the game");
}

var rodLeft = function(){
    let leftCount = topRod.style.left.substr(0,topRod.style.left.length-2);

    if(leftCount-10>0){
        topRod.style.left = leftCount - 10 + "px";
        bottomRod.style.left = topRod.style.left;
    }
    else{
        topRod.style.left = 0 + "px";
        bottomRod.style.left = 0 + "px";
    }
}

function rodRight(){
    let leftCount = topRod.style.left.substr(0,topRod.style.left.length-2);
    let leftconstrain = bodyCoords.width - 16 - rodCoords.width;

    if((parseInt(leftCount)+10)<leftconstrain){
        topRod.style.left = parseInt(leftCount) + 10 + "px";
        bottomRod.style.left = topRod.style.left;
    }
    else{
        console.log("Insise else");
        topRod.style.left = leftconstrain + "px";
        bottomRod.style.left = leftconstrain + "px";
    }
}

var id;
var horizontal = "right";
var vertical = "down";
function start(){
    id=setInterval(function(){
        rodCoords = topRod.getBoundingClientRect();
        ballCoords = ball.getBoundingClientRect();
        //horizontal
        if(horizontal=="right"){
            let left = parseInt(ball.style.left.substr(0, ball.style.left.length-2)) + 10;
            if(left<bodyCoords.width-16-ballCoords.width){
                ball.style.left = left + "px";
            }
            else{
                ball.style.left = bodyCoords.width - 16 - ballCoords.width + "px";
                horizontal = "left";
            }
        }
        else{
            let left = parseInt(ball.style.left.substr(0, ball.style.left.length-2)) - 10;
            if(left>0){
                ball.style.left = left + "px";
            }
            else{
                ball.style.left = 0 + "px";
                horizontal = "right";
            }
        }

        //Vertical
        if(vertical=="down"){
            let top = parseInt(ball.style.top.substr(0, ball.style.top.length-2)) + 10;
            if(top<(parseInt(bottomRod.style.top.substr(0, bottomRod.style.top.length-2)) - ballCoords.height)){
                ball.style.top = top + "px";
            }
            else{
                let centerLeft = Math.floor(parseInt(ball.style.left.substr(0, ball.style.left.length-2)) + ballCoords.width/2);
                if(centerLeft<(rodCoords.left + rodCoords.width) && centerLeft>(rodCoords.left)){
                    score+=5;
                    updateScore.innerText = score;
                    vertical = "up";
                    ball.style.top = parseInt(bottomRod.style.top.substr(0, bottomRod.style.top.length-2)) - ballCoords.height + "px";
                }
                else{
                    if(top + ballCoords.height<parseInt(bottomRod.style.top.substr(0, bottomRod.style.top.length-2)) + rodCoords.height){
                        ball.style.top = top + "px";
                    }
                    else{
                        ball.style.top =  bodyCoords.height - ballCoords.height - 16 + "px";
                        vertical = "up";
                        alert("GameOver, Your Score is " + score);
                        clearInterval(id);
                        Restart();
                    }

                }
            }
        }

        else{
            let top = parseInt(ball.style.top.substr(0, ball.style.top.length-2)) - 10;
            if(top>(8 + rodCoords.height)){
                ball.style.top = top + "px";
            }
            else{
                let centerLeft = Math.floor(parseInt(ball.style.left.substr(0, ball.style.left.length-2)) + ballCoords.width/2);
                if(centerLeft<(rodCoords.left + rodCoords.width) && centerLeft>(rodCoords.left)){
                    score+=5;
                    updateScore.innerText = score;
                    ball.style.top = rodCoords.height + "px";
                    vertical = "down";
                }
                else{
                    if(top>0){
                        ball.style.top = top + "px";
                    }
                    else{
                        ball.style.top =  rodCoords.height + "px";
                        vertical = "down";
                        alert("GameOver, Your Score is " + score);
                        clearInterval(id);
                        Restart();
                    }

                }
            }
        }
        
    }
    , 50);
    
}

function pause(){
    clearInterval(id);
}


var startGame = true;
window.addEventListener("keydown", function(event){
    console.log(event.keyCode);
    if(event.keyCode==13){
        if(startGame){
            start();
            startGame = false;
        }
        else{
            pause();
            startGame = true;
        }
        
    }
    else if((event.keyCode==65 || event.keyCode==37) && startGame == false){
        rodLeft();
    }
    else if((event.keyCode==68 || event.keyCode==39) && startGame == false){
        rodRight();
    }
});


function Restart(){
    topRod.style.left = Math.floor((bodyCoords.width - rodCoords.width)/2) + "px";
    bottomRod.style.left = Math.floor((bodyCoords.width - rodCoords.width)/2) + "px";

    bottomRod.style.top = Math.floor(bodyCoords.height - rodCoords.height) - 16 + "px";
    if(vertical=="down"){
        ball.style.top = rodCoords.height + "px";
    }
    else{
        ball.style.top = parseInt(bottomRod.style.top.substr(0, bottomRod.style.top.length-2)) - ballCoords.height + "px";
    }
    ball.style.left = Math.floor((bodyCoords.width - ballCoords.width)/2) + "px"; 
    if(!previousScore){
        localStorage.setItem("previousScore", score);
    }
    else{
        if(previousScore<score){
            previousScore = score;
            localStorage.setItem("previousScore", previousScore);
        }
    }
    score = 0; 
    updateScore.innerText = score;
    startGame = true;
}

window.addEventListener("resize", function(){
    bodyCoords = gameBody.getBoundingClientRect();
    rodCoords = topRod.getBoundingClientRect();
    ballCoords = ball.getBoundingClientRect();
    Restart();
});
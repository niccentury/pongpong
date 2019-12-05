document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let newH1 = document.createElement("h1");
newH1.textContent = "PONG";
document.body.appendChild(newH1);

let newButton = document.createElement("button");
newButton.textContent = "START GAME";
document.body.appendChild(newButton);

let newCanvas = document.createElement("canvas");
newCanvas.width = window.innerWidth/1.5;
newCanvas.height = window.innerHeight/1.5;

let paddle1 = {
    xCoord : newCanvas.width/1.1,
    yCoord : newCanvas.height/3.3,
    paddle1H : newCanvas.height/3.3,
    paddle1W : newCanvas.width/72,
    score : 0
}

let paddle2 = {
    xCoord : newCanvas.width/15,
    yCoord : newCanvas.height/3.3,
    paddle2H : newCanvas.height/3.3,
    paddle2W : newCanvas.width/72,
    score : 0
}

let ball = {
    xPos : newCanvas.width/2,
    yPos : newCanvas.height/2,
    h : newCanvas.height/30,
    w : newCanvas.width/61.44,
    increaseX : 0,
    increaseY : 0
}

let ctx = newCanvas.getContext("2d");
let deltaX = 2;
let deltaY = 1;

let upPressed = false;
let downPressed = false;
let W_Pressed = false;
let S_Pressed = false;


function gameStart()
{
    // console.log(paddle2.paddle2W);
    newH1.remove();
    newButton.remove();
    document.body.appendChild(newCanvas);

    ctx.globalCompositeOperation = "clipping";
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle1.xCoord, paddle1.yCoord, paddle1.paddle1W, paddle1.paddle1H);
    


    gameLoop();
}

function gameLoop()
{
    setInterval(() => {
        ctx.clearRect(0 , 0 , window.innerWidth, window.innerHeight);
        newCanvas.style.background = 'grey';
        ctx.font = "20px Georgia";
        ctx.fillStyle = 'white'
        ctx.fillText(paddle1.score, (newCanvas.width/3), 50);
        ctx.fillText(paddle2.score, (newCanvas.width/3) * 2, 50);

        ctx.fillStyle = "black";
        ball.xPos += deltaX + ball.increaseX;
        ball.yPos += deltaY + ball.increaseY;
        ctx.translate(0, 0);
        ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);

            if (upPressed)
            {
                if (paddle1.yCoord > 0)
                {
                if (ball.increaseY < 0){
                paddle1.yCoord += ball.increaseY ;
                }
                else{
                    paddle1.yCoord -= ball.increaseY ;


                }
                paddle1.yCoord--;

                }
            }

            if (downPressed)
            {
                if (paddle1.yCoord + paddle1.paddle1H <= newCanvas.height)
                {
                    if (ball.increaseY < 0){
                        paddle1.yCoord -= ball.increaseY ;
                        }
                        else{
                            paddle1.yCoord += ball.increaseY ;
        
        
                        }
                
                paddle1.yCoord++;
                }
            }


        if (W_Pressed)
        {
            if (paddle2.yCoord > 0)
            {
                if (ball.increaseY < 0){
                    paddle2.yCoord += ball.increaseY ;
                    }
                    else{
                        paddle2.yCoord -= ball.increaseY ;
    
    
                    }

                paddle2.yCoord --;

            }
        }

        if (S_Pressed)
        {
            if (paddle2.yCoord + paddle2.paddle2H < newCanvas.height)
            {
                 if (ball.increaseY < 0){
                        paddle2.yCoord -= ball.increaseY ;
                        }
                        else{
                            paddle2.yCoord += ball.increaseY ;
        
        
                        }
                paddle2.yCoord ++;

            }
        }

        ScoreEarned();
        HitOccurred();

        ctx.fillStyle = "blue"

        ctx.fillRect(paddle1.xCoord, paddle1.yCoord , paddle1.paddle1W, paddle1.paddle1H);

        ctx.fillStyle = "red";
        ctx.fillRect(paddle2.xCoord, paddle2.yCoord, paddle2.paddle2W, paddle2.paddle2H);
    



    }, 10);
}

function HitOccurred()
{
    if (ball.yPos + ball.h >= newCanvas.height)
    {
        deltaY = deltaY * -1;
        ball.increaseY = ball.increaseY + 0.3;
        ball.increaseY = ball.increaseY *-1;

    }
    else if (ball.yPos <= 0)
    {
        deltaY = deltaY * -1;
        ball.increaseY = ball.increaseY - 0.3;
        ball.increaseY = ball.increaseY *-1;

    }

    if(ball.xPos + ball.w >= paddle1.xCoord && ball.yPos + ball.h >= paddle1.yCoord  && ball.yPos- ball.h <= paddle1.yCoord + paddle1.paddle1H)
    {
        deltaX = deltaX * -1;
        ball.increaseX = ball.increaseX + 0.3;
        ball.increaseX = ball.increaseX *-1;

    }
    else if(ball.xPos <= paddle2.xCoord + paddle2.paddle2W && ball.yPos + ball.h>= paddle2.yCoord && ball.yPos - ball.h <= paddle2.yCoord + paddle2.paddle2H)
    {
        deltaX = deltaX * -1;
        ball.increaseY = ball.increaseY - 0.3;
        ball.increaseX = ball.increaseX *-1;

    }
}
        newButton.onclick = gameStart;
    

function ScoreEarned ()
{
    
    if (ball.xPos >= paddle1.xCoord)
    {
        ball.increaseX = 0;
        ball.increaseY = 0;
        paddle1.score ++;
        ball.xPos = newCanvas.width/2,
        ball.yPos = newCanvas.height/2,
        ball.h = newCanvas.height/30,
        ball.w = newCanvas.width/61.44
    }

    else if (ball.xPos <= paddle2.xCoord)
    {
        ball.increaseX = 0;
        ball.increaseY = 0;
        paddle2.score ++;
        ball.xPos = newCanvas.width/2,
        ball.yPos = newCanvas.height/2,
        ball.h = newCanvas.height/30,
        ball.w = newCanvas.width/61.44
    }
}
    



function keyDownHandler(event) {
    if(event.key === 'ArrowUp') {
        upPressed = true;
        downPressed = false;
    }
    if(event.key === 'ArrowDown') {
        downPressed = true;
        upPressed = false;
    }
    if(event.key === 'w') {
        W_Pressed = true;
        S_Pressed = false;
        
    }
    if(event.key === 's') {

        W_Pressed = false;
       S_Pressed = true;
    }
}

function keyUpHandler(event)
{
    if(event.key === 'ArrowUp') {
        upPressed = false;
    }
    if(event.key === 'ArrowDown') {
        downPressed = false;
    }
    if(event.key === 'w') {
        W_Pressed = false;
    }
    if(event.key === 's') {
        S_Pressed = false;
    }
}


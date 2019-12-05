document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let newH1 = document.createElement("h1");
newH1.textContent = "PONG";
document.body.appendChild(newH1);

let newButton = document.createElement("button");
newButton.textContent = "START GAME";
document.body.appendChild(newButton);

let newCanvas = document.createElement("canvas");
newCanvas.width = window.innerWidth/1.5;
newCanvas.height = window.innerHeight/1.5;

let gameOverH1 = document.createElement("h1");
let gameOverButton = document.createElement("button");

newButton.onclick = gameStart;

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
    serve_counter : 60,
    first_move : true
}

let ctx = newCanvas.getContext("2d");
let speed = 5;
let angle = 2;

let upPressed = false;
let downPressed = false;
let W_Pressed = false;
let S_Pressed = false;

let requestID;



function gameStart()
{
    newH1.remove();
    newButton.remove();

    gameOverH1.remove();
    gameOverButton.remove();
    document.body.appendChild(newCanvas);


    paddle1.score = 0;
    paddle2.score = 0;

    ctx.globalCompositeOperation = "clipping";
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle1.xCoord, paddle1.yCoord, paddle1.paddle1W, paddle1.paddle1H);
    


    gameLoop();
}


function gameLoop() {
    
    requestID = window.requestAnimationFrame(gameLoop);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        newCanvas.style.background = 'grey';
        ctx.font = "20px Georgia";
        ctx.fillStyle = 'white'
        ctx.fillText(paddle1.score, (newCanvas.width/3), 50);
        ctx.fillText(paddle2.score, (newCanvas.width/3) * 2, 50);

        if(ball.first_move == true)
        {
            console.log(`in the if statement, first move is ${ball.first_move}`);
            ball.first_move = false;
            angle = Math.random(0,1) >= .5 ? 2 : -2;
            speed *= -1;
            ball.serve_counter = 60;
            ctx.translate(0, 0);
        }
        else if (ball.serve_counter > 0)
        {
            ctx.fillStyle = "black";
            ball.serve_counter--;
            ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);
        }
        else if (ball.first_move == false)
        {
            console.log(`in the else if statement, first move is ${ball.first_move}`);
            ctx.fillStyle = "black";
            ball.xPos += speed;
            ball.yPos += angle;
            ctx.translate(0, 0);
            ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);
        }
        

            if (upPressed)
            {
                if (paddle1.yCoord > 0)
                {
                paddle1.yCoord-=5;
                }
            }

            if (downPressed)
            {
                if (paddle1.yCoord + paddle1.paddle1H <= newCanvas.height)
                {
                paddle1.yCoord+=5;
                }
            }


        if (W_Pressed)
        {
            if (paddle2.yCoord > 0)
            {
                paddle2.yCoord-=5;
            }
        }

        if (S_Pressed)
        {
            if (paddle2.yCoord + paddle2.paddle2H < newCanvas.height)
            {
                paddle2.yCoord+=5;
            }
        }

        ScoreEarned();
        HitOccurred();

        ctx.fillStyle = "blue"

        ctx.fillRect(paddle1.xCoord, paddle1.yCoord , paddle1.paddle1W, paddle1.paddle1H);

        ctx.fillStyle = "red";
        ctx.fillRect(paddle2.xCoord, paddle2.yCoord, paddle2.paddle2W, paddle2.paddle2H);
    
        
}


function HitOccurred()
{
    if (ball.yPos + ball.h >= newCanvas.height)
    {
        angle = angle * -1;
    }
    else if (ball.yPos <= 0)
    {
        angle = angle * -1;
    }

    if(ball.xPos + ball.w >= paddle1.xCoord && ball.yPos >= paddle1.yCoord  && ball.yPos+ ball.w <= paddle1.yCoord + paddle1.paddle1H)
    {
        speed = speed * -1;
    }
    else if(ball.xPos <= paddle2.xCoord + paddle2.paddle2W && ball.yPos >= paddle2.yCoord && ball.yPos + ball.h <= paddle2.yCoord + paddle2.paddle2H)
    {
        speed = speed * -1;
    }
}
        
    

function ScoreEarned()
{
    if (paddle1.score == 10 || paddle2.score == 10)
    {
    
        GameOver();
    }
    
    else if (ball.xPos >= paddle1.xCoord)
    {
        ball.first_move = true;
        paddle1.score ++;
        ball.xPos = newCanvas.width/2,
        ball.yPos = newCanvas.height/2,
        ball.h = newCanvas.height/30,
        ball.w = newCanvas.width/61.44
    }

    else if (ball.xPos <= paddle2.xCoord)
    {
        ball.first_move = true;
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
    }
    if(event.key === 'ArrowDown') {
        downPressed = true;
    }
    if(event.key === 'w') {
        W_Pressed = true;
    }
    if(event.key === 's') {
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

function GameOver()
{
    window.cancelAnimationFrame(requestID);
    newCanvas.remove();
    gameOverH1.textContent = "GAME OVER";
    document.body.appendChild(gameOverH1);
    gameOverButton.textContent = "Play Again";
    document.body.appendChild(gameOverButton);
    gameOverButton.onclick = gameStart;
}



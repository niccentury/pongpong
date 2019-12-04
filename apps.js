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
    xCord : newCanvas.width/1.1,
    yCord : newCanvas.height/3.3,
    paddle1H : newCanvas.height/3.3,
    paddle1W : newCanvas.width/72,
    score : 0
}

let paddle2 = {
    xCord : newCanvas.width/15,
    yCord : newCanvas.height/3.3,
    paddle2H : newCanvas.height/3.3,
    paddle2W : newCanvas.width/72,
    score : 0
}

let ball = {
    xPos : newCanvas.width/2,
    yPos : newCanvas.height/2,
    h : newCanvas.height/30,
    w : newCanvas.width/61.44
}

let ctx = newCanvas.getContext("2d");
let speed = 2;
let angle = 1;

let upPressed = false;
let downPressed = false;
let W_Pressed = false;
let S_Pressed = false;


function gameStart()
{
    console.log(paddle2.paddle2W);
    newH1.remove();
    newButton.remove();
    document.body.appendChild(newCanvas);

    ctx.globalCompositeOperation = "clipping";
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle1.xCord, paddle1.yCord, paddle1.paddle1W, paddle1.paddle1H);
    


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
        ball.xPos += speed;
        ball.yPos += angle;
        ScoreEarned();
        HitOccurred();
        ctx.translate(0, 0);
        ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);

            if (upPressed)
            {
                if (paddle1.yCord > 0)
                {
                paddle1.yCord--;
                }
            }

            if (downPressed)
            {
                if (paddle1.yCord + paddle1.paddle1H <= newCanvas.height)
                {
                paddle1.yCord++;
                }
            }


        if (W_Pressed)
        {
            if (paddle2.yCord > 0)
            {
                paddle2.yCord--;
            }
        }

        if (S_Pressed)
        {
            if (paddle2.yCord + paddle2.paddle2H < newCanvas.height)
            {
                paddle2.yCord++;
            }
        }



        ctx.fillStyle = "blue"

        ctx.fillRect(paddle1.xCord, paddle1.yCord , paddle1.paddle1W, paddle1.paddle1H);

        ctx.fillStyle = "red";
        ctx.fillRect(paddle2.xCord, paddle2.yCord, paddle2.paddle2W, paddle2.paddle2H);




    }, 5);
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

    if(ball.xPos + ball.w >= paddle1.xCord && ball.yPos >= paddle1.yCord  && ball.yPos+ ball.w <= paddle1.yCord + paddle1.paddle1H)
    {
        speed = speed * -1;
    }
    else if(ball.xPos <= paddle2.xCord + paddle2.paddle2W && ball.yPos >= paddle2.yCord && ball.yPos + ball.h <= paddle2.yCord + paddle2.paddle2H)
    {
        speed = speed * -1;
    }
}
        newButton.onclick = gameStart;
    

function ScoreEarned ()
{
    
    if (ball.xPos >= paddle1.xCord)
    {
        paddle1.score ++;
        ball.xPos = newCanvas.width/2,
        ball.yPos = newCanvas.height/2,
        ball.h = newCanvas.height/30,
        ball.w = newCanvas.width/61.44
    }

    else if (ball.xPos <= paddle2.xCord)
    {
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
    else if(event.key === 'ArrowDown') {
        downPressed = true;
    }
    else if(event.key === 'w') {
        W_Pressed = true;
    }
    else if(event.key === 's') {
        S_Pressed = true;
    }
}

function keyUpHandler(event)
{
    if(event.key === 'ArrowUp') {
        upPressed = false;
    }
    else if(event.key === 'ArrowDown') {
        downPressed = false;
    }
    else if(event.key === 'w') {
        W_Pressed = false;
    }
    else if(event.key === 's') {
        S_Pressed = false;
    }
}


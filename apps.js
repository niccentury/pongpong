let newH1 = document.createElement("h1");
newH1.textContent = "PONG";
document.body.appendChild(newH1);

let newButton = document.createElement("button");
newButton.textContent = "START GAME";
document.body.appendChild(newButton);

let newCanvas = document.createElement("canvas");
newCanvas.width = window.innerWidth;
newCanvas.height = window.innerHeight;

let paddle1 = {
    xCord : newCanvas.width/1.1,
    yCord : newCanvas.height/3.3,
    paddle1H : newCanvas.height/3.3,
    paddle1W : newCanvas.width/60
}

let paddle2 = {
    xCord : newCanvas.width/15,
    yCord : newCanvas.height/3.3,
    paddle2H : newCanvas.height/3.3,
    paddle2W : newCanvas.width/60
}

let ball = {
    xPos : newCanvas.width/2,
    yPos : newCanvas.height/2,
    h : newCanvas.height/30,
    w : newCanvas.width/61.44
}

let ctx = newCanvas.getContext("2d");
let speed = 2;

function gameStart()
{
    newH1.remove();
    newButton.remove();
    document.body.appendChild(newCanvas);
    ctx.fillStyle = "red";
    ctx.fillRect(paddle2.xCord, paddle2.yCord, paddle2.paddle2W, paddle2.paddle2H);
    ctx.globalCompositeOperation = "clipping";
    //ctx.translate(-5,-5);
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle1.xCord, paddle1.yCord, paddle1.paddle1W, paddle1.paddle1H);
    


    gameLoop();
}

function gameLoop()
{
    setInterval(() => {
        ctx.clearRect(ball.xPos -1, ball.yPos-1, ball.w +1, ball.h+2);
        ctx.fillStyle = "black";
        ball.xPos += speed;
        HitOccurred();
        ctx.translate(0, 0);
        ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);
    }, 10);
}

function HitOccurred()
{
    
    if(ball.xPos + ball.w >= paddle1.xCord)
    {
        console.log("it hit");
        ball.xPos = paddle1.xCord - ball.w;
        speed * -1;
    }
    else if(ball.xPos <= paddle1.yCord + paddle2.paddle1W)
    {

    }
}

newButton.onclick = gameStart;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let upPressed = false;
let downPressed = false;
let W_Pressed = false;
let S_Pressed = false;

function keyDownHandler(event) {
    if(event.key == 'ArrowUp') {
        upPressed = true;
    }
    else if(event.key == 'ArrowDown') {
        downPressed = true;
    }
    else if(event.key == 'w') {
        W_Pressed = true;
    }
    else if(event.key == 's') {
        S_Pressed = true;
    }
}

function keyUpHandler(event)
{
    if(event.key == 'ArrowUp') {
        upPressed = false;
    }
    else if(event.key == 'ArrowDown') {
        downPressed = false;
    }
    else if(event.key == 'w') {
        W_Pressed = false;
    }
    else if(event.key == 's') {
        S_Pressed = false;
    }
}


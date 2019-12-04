let newH1 = document.createElement("h1");
newH1.textContent = "PONG";
document.body.appendChild(newH1);
    //ball.height + ball.yPos 

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
    paddle1W : newCanvas.width/72
}

let paddle2 = {
    xCord : newCanvas.width/15,
    yCord : newCanvas.height/3.3,
    paddle2H : newCanvas.height/3.3,
    paddle2W : newCanvas.width/72
}

let ball = {
    xPos : newCanvas.width/2,
    yPos : newCanvas.height/2,
    h : newCanvas.height/30,
    w : newCanvas.width/61.44
}

let ctx = newCanvas.getContext("2d");
let speed = 2;

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
    //ctx.translate(-5,-5);
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle1.xCord, paddle1.yCord, paddle1.paddle1W, paddle1.paddle1H);
    


    gameLoop();
}

function gameLoop()
{
    setInterval(() => {
        ctx.clearRect(0 , 0 , window.innerWidth, window.innerHeight);
        ctx.fillStyle = "black";
        ball.xPos += speed;
        HitOccurred();
        ctx.translate(0, 0);
        ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);

        if (upPressed){

            paddle1.yCord--;
            //ctx.clearRect(paddle1.xCord , paddle1.yCord , paddle1.paddle1W, paddle1.paddle1H);
           // ctx.translate()
           // ctx.fillRect(paddle1.xCord, paddle1.yCord , paddle1.paddle1W, paddle1.paddle1H);


        }

        if (downPressed){

            paddle1.yCord++;
        }


        if (W_Pressed){

            paddle2.yCord--;
        }

        if (S_Pressed){

            paddle2.yCord++;
        }


        ctx.fillStyle = "blue"

        ctx.fillRect(paddle1.xCord, paddle1.yCord , paddle1.paddle1W, paddle1.paddle1H);

        ctx.fillStyle = "red";
        ctx.fillRect(paddle2.xCord, paddle2.yCord, paddle2.paddle2W, paddle2.paddle2H);




    }, 10);
}

function HitOccurred()
{

    //ball.xPos + ball.w >= paddle1.xCord && ball.yPos + ball.h <= paddle1.yCord + paddle1H))
    
    if(ball.xPos + ball.w >= paddle1.xCord && ball.yPos >= paddle1.yCord  && ball.yPos+ ball.w <= paddle1.yCord + paddle1.paddle1H)
    
    {
        speed = speed * -1;
    }
    else if(ball.xPos <= paddle2.xCord + paddle2.paddle2W && ball.yPos >= paddle2.yCord && ball.yPos + ball.h <= paddle2.yCord + paddle2.paddle2H)
    {
        console.log(`${ball.xPos} and ${paddle2.xCord + paddle2.paddle2W}`);
        speed = speed * -1;


    }
}
        newButton.onclick = gameStart;
    


document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);



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


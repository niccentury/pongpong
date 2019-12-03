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

let ctx = newCanvas.getContext("2d");

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
    ctx.fillStyle = "yellow";
    gameLoop();
}

function gameLoop()
{
    setInterval(() => {
        ctx.clearRect(0, 0, 10, 10);
        ctx.translate(1,1);
        ctx.fillRect(0, 0, 10, 10);
    }, 10);
}

newButton.onclick = gameStart;


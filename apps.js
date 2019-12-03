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
    xCord : 50,
    yCord : 50,
    
}

let ctx = newCanvas.getContext("2d");

function gameStart()
{
    newH1.remove();
    newButton.remove();
    document.body.appendChild(newCanvas);
    ctx.fillStyle = "red";
    ctx.fillRect(50,50, 20, 300);
    ctx.globalCompositeOperation = "clipping";
    //ctx.translate(-5,-5);
    ctx.fillStyle = "blue";
    ctx.fillRect(1450,50, 20, 300);
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


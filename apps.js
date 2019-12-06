document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let buttonDiv = document.createElement('div');
document.body.appendChild(buttonDiv);
buttonDiv.style.backgroundColor = "grey";
buttonDiv.style.display = "inline-block";
buttonDiv.style.height = "300px";
buttonDiv.style.width = "400px";
buttonDiv.style.margin = "100px";
buttonDiv.style.marginTop = "10px";
buttonDiv.style.marginBottom = "10px";
buttonDiv.style.alignItems = "center";
buttonDiv.style.justifyContent = "center";

document.body.style.backgroundColor = "black";
let newH1 = document.createElement("h1");
buttonDiv.appendChild(newH1);

newH1.style.marginLeft = "120px";
newH1.style.marginRight = "100px";
newH1.style.marginTop = "10px";
newH1.style.marginBottom = "10px";
newH1.style.alignItems = "center";
newH1.style.justifyContent = "center";
newH1.style.color = "red";
newH1.textContent = "PONG";


let pVp = document.createElement("button");
pVp.textContent = "PLAYER v PLAYER";
pVp.style.marginLeft = "100px";
pVp.style.marginRight = "100px";
pVp.style.marginTop = "10px";
pVp.style.marginBottom = "10px";
document.body.appendChild(pVp);

let pVc = document.createElement("button");
pVc.textContent = "PLAYER v COMPUTER";
pVc.style.marginLeft = "100px";
pVc.style.marginRight = "100px";
pVc.style.marginTop = "10px";
pVc.style.marginBottom = "10px";
document.body.appendChild(pVc);

let cVc = document.createElement("button");
cVc.textContent = "BATTLE ROYALE";
cVc.style.marginLeft = "100px";
cVc.style.marginRight = "100px";
cVc.style.marginTop = "10px";
cVc.style.marginBottom = "10px";
document.body.appendChild(cVc);



buttonDiv.appendChild(pVp);
buttonDiv.appendChild(pVc);
buttonDiv.appendChild(cVc);

console.log(buttonDiv);


let newCanvas = document.createElement("canvas");
newCanvas.width = window.innerWidth/1.5;
newCanvas.height = window.innerHeight/1.5;

let gameOverH1 = document.createElement("h1");
let gameOverButton = document.createElement("button");

isPvp = false;
isPvc = false;
isCvc = false;


pVp.onclick = () => {

    //change your boolean
    isPvp = true;
    gameStart()
};

pVc.onclick = () => {

    //change your boolean
    isPvc = true;
    gameStart()
};

cVc.onclick = () => {

    //change your boolean
    isCvc = true;
    gameStart()
};




let paddle1 = {
    xCoord : newCanvas.width/1.1,
    yCoord : newCanvas.height/3.3,
    paddle1H : newCanvas.height/3.3,
    paddle1W : newCanvas.width/72,
    score : 0,
    hit_occurred : true,
    canMove: false
}

let paddle2 = {
    xCoord : newCanvas.width/15,
    yCoord : newCanvas.height/3.3,
    paddle2H : newCanvas.height/3.3,
    paddle2W : newCanvas.width/72,
    score : 0,
    hit_occurred : false,
    canMove: true
}

let ball = {
    xPos : newCanvas.width/2,
    yPos : newCanvas.height/2,
    h : newCanvas.height/30,
    w : newCanvas.width/61.44,
    serve_counter : 60,
    first_move : true,
    increaseX : 0,
    increaseY : 0
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
    buttonDiv.remove();
    newH1.remove();
    pVp.remove();
    pVc.remove();
    cVc.remove();

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
            ball.xPos += (speed + ball.increaseX);
            ball.yPos += (angle + ball.increaseY); 
            ctx.translate(0, 0);
            ctx.fillRect(ball.xPos, ball.yPos, ball.w, ball.h);
        }
        ScoreEarned();
        HitOccurred();

        if (isCvc){
        computerPlays();
        }
       
        if (isPvc){
            computerPlayPlayer();
        }
        

        if (isPvp){
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
            paddle1.yCoord-= 5;

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
            
            paddle1.yCoord+= 5;
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

            paddle2.yCoord -= 5;

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
            paddle2.yCoord += 5;

        }
    }
}

      

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
        ball.increaseY = ball.increaseY + 0.3;
        ball.increaseY = ball.increaseY *-1;
    }
    else if (ball.yPos <= 0)
    {
        angle = angle * -1;
        ball.increaseY = ball.increaseY - 0.3;
        ball.increaseY = ball.increaseY *-1;
    }

    if(ball.xPos + ball.w >= paddle1.xCoord && ball.yPos + ball.h >= paddle1.yCoord  && ball.yPos - ball.h <= paddle1.yCoord + paddle1.paddle1H)
    {
        paddle1.hit_occurred = true;
        paddle2.hit_occurred = false;

        speed = speed * -1;
        ball.increaseX = ball.increaseX + 0.3;
        ball.increaseX = ball.increaseX *-1;
    }
    else if(ball.xPos <= paddle2.xCoord + paddle2.paddle2W && ball.yPos+ball.h >= paddle2.yCoord && ball.yPos - ball.h <= paddle2.yCoord + paddle2.paddle2H)
    {
        paddle2.hit_occurred = true;
        paddle1.hit_occurred = false;

        speed = speed * -1;
        ball.increaseY = ball.increaseY - 0.3;
        ball.increaseX = ball.increaseX *-1;
    }
}
        
    

function ScoreEarned()
{
    if (paddle1.score == 1 || paddle2.score == 1)
    {
    
        GameOver();
    }
    
    else if (ball.xPos >= paddle1.xCoord)
    {
        ball.increaseX = 0 ;
        ball.increaseY = 0 ; 
        ball.first_move = true;
        paddle1.score ++;
        ball.xPos = newCanvas.width/2,
        ball.yPos = newCanvas.height/2,
        ball.h = newCanvas.height/30,
        ball.w = newCanvas.width/61.44
    }

    else if (ball.xPos <= paddle2.xCoord)
    {
        ball.increaseX = 0 ; 
        ball.increaseY  = 0;
        ball.first_move = true;
        paddle2.score ++;
        ball.xPos = newCanvas.width/2,
        ball.yPos = newCanvas.height/2,
        ball.h = newCanvas.height/30,
        ball.w = newCanvas.width/61.44
    }
}
    

function computerPlays (){


    //go down 
    if (paddle2.hit_occurred && ball.xPos > newCanvas.width/2){
    if (paddle1.yCoord +  paddle1.paddle1H/3  < ball.yPos && (paddle1.yCoord + paddle1.paddle1H <= newCanvas.height)){

        if (ball.increaseY < 0){
            paddle1.yCoord -= ball.increaseY ;
            }
            else{
                paddle1.yCoord += ball.increaseY ;


            }

            if (paddle1.hit_occurred)
            {
                paddle1.yCoord = (newCanvas.height/2);
                paddle1.hit_occurred = false;
            }
            
            paddle1.yCoord+= 5;
            }
        
       
    
    // go up 
    
    if ( paddle1.yCoord >  ball.yPos &&   (paddle1.yCoord > 0)
    ){

        if (ball.increaseY < 0){
            paddle1.yCoord += ball.increaseY ;
            }
            else{
                paddle1.yCoord -= ball.increaseY ;


            }

    
    paddle1.yCoord-= 5;
        
}
    }
 //go down 

 if(paddle1.hit_occurred){
 if (paddle2.yCoord +  (paddle2.paddle2H/2)  <= ball.yPos  && (paddle2.yCoord + paddle2.paddle2H <= newCanvas.height)){

    if (ball.increaseY < 0){
        paddle2.yCoord -= ball.increaseY ;
        }
        else{
            paddle2.yCoord += ball.increaseY ;


        }
        if (paddle2.hit_occurred)
        {
            paddle2.yCoord = (newCanvas.height/2);
            paddle2.hit_occurred = false;
        }
        paddle2.yCoord+= 5;
        }
   

// go up 

if ( paddle2.yCoord >  ball.yPos && paddle2.yCoord > 0){

    if (ball.increaseY < 0){
        paddle2.yCoord += ball.increaseY ;
        }
        else{
            paddle2.yCoord -= ball.increaseY ;


        }


    paddle2.yCoord-= 5;
    
    }

    

}
    
}


function computerPlayPlayer (){


    //go down 
    if (paddle1.yCoord +  paddle1.paddle1H/3  < ball.yPos && (paddle1.yCoord + paddle1.paddle1H <= newCanvas.height)){

        if (ball.increaseY < 0){
            paddle1.yCoord -= ball.increaseY ;
            }
            else{
                paddle1.yCoord += ball.increaseY ;


            }

            if (paddle1.hit_occurred)
            {
                paddle1.yCoord = (newCanvas.height/2);
                paddle1.hit_occurred = false;
            }
            
            paddle1.yCoord+= 5;
            }
       
    
    // go up 
    
    if ( paddle1.yCoord >  ball.yPos &&   (paddle1.yCoord > 0)
    ){

        if (ball.increaseY < 0){
            paddle1.yCoord += ball.increaseY ;
            }
            else{
                paddle1.yCoord -= ball.increaseY ;


            }

    
    paddle1.yCoord-= 5;
        
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

        paddle2.yCoord -= 5;

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
        paddle2.yCoord += 5;

    }
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



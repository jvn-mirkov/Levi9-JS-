/***************************************
Neka resenja prezeta sa:
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
***************************************/

class Ball {
    constructor(x, y, dx, dy, radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }
}

class Game {
    constructor(lineHeight, lineWidth, move, ball2StartTime, ball3StartTime){
        this.lineHeight = lineHeight;
        this.lineWidth = lineWidth;
        this.move = move;
        this.ball2StartTime = ball2StartTime;
        this.ball3StartTime = ball3StartTime;
    }
}

//
var name;
var score;

//canvas setup
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

//init objekata
ball1 = new Ball(canvas.width/2, canvas.height-30, 2, -2, 10);
ball2 = new Ball(canvas.width/2, canvas.height/2, 2, 2, 10);
ball3 = new Ball(canvas.width/2, canvas.height/2, 2, -2, 10);
game  = new Game(10, 75, 4, 7000, 140000);

//init flags
var downPressed = false;
var upPressed = false;
var leftPressed = false;
var rightPressed = false;

//init positions
var xB = (canvas.width-game.lineWidth)/2;
var yB = canvas.height-game.lineHeight;
var xT = (canvas.width-game.lineWidth)/2;
var yT = 0;
var xL = 0;
var yL = (canvas.width-game.lineWidth)/2;
var xR = canvas.width-game.lineHeight;
var yR = (canvas.width-game.lineWidth)/2;

//listener functions
document.addEventListener('mousemove', mouseMoveHandler, false);


function mouseMoveHandler(e) {
    
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;   

    if(relativeX > 0 && relativeX < canvas.width) {
        xB = relativeX - game.lineWidth/2;
        xT = relativeX - game.lineWidth/2;
        if (xB + game.lineWidth > canvas.width){
            xB = canvas.width - game.lineWidth;
            xT = canvas.width - game.lineWidth;
        }
        if (xB < 0){
            xB = 0;
            xT = 0;
        }
    }

    if(relativeY > 0 && relativeY < canvas.height) {
        yL = relativeY - game.lineHeight/2;
        yR = relativeY - game.lineHeight/2;
        if (yL < 0){
            yL = 0;
            yR = 0;
        }
        if (yL + game.lineWidth > canvas.height){
            yL = canvas.height - game.lineWidth;
            yR = canvas.height - game.lineWidth;
        }
    }
}


//prebaci u odgovarajuce klase
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball1.x, ball1.y, ball1.radius, 0, Math.PI*2);
    ctx.fillStyle = "#BB7777";
    ctx.fill();
    ctx.closePath();
}

function drawBall2() {
    ctx.beginPath();
    ctx.arc(ball2.x, ball2.y, ball2.radius, 0, Math.PI*2);
    ctx.fillStyle = "#BB7777";
    ctx.fill();
    ctx.closePath();
}

function drawBall3() {
    ctx.beginPath();
    ctx.arc(ball3.x, ball3.y, ball3.radius, 0, Math.PI*2);
    ctx.fillStyle = "#BB7777";
    ctx.fill();
    ctx.closePath();
}

function drawLineBottom() {
    ctx.beginPath();
    ctx.rect(xB, yB, game.lineWidth, game.lineHeight);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}

function drawLineTop() {
    ctx.beginPath();
    ctx.rect(xT, yT, game.lineWidth, game.lineHeight);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}

function drawLineLeft() {
    ctx.beginPath();
    ctx.rect(xL, yL, game.lineHeight, game.lineWidth);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}

function drawLineRight() {
    ctx.beginPath();
    ctx.rect(xR, yR, game.lineHeight, game.lineWidth);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}




currentMs = 0;

//prebaci u game klasu
function getScore(){
    currentMs= getCurrentTime() - start;
    console.log("getScore: " + currentMs);
    document.getElementById('sc').innerHTML = "" + currentMs ;

}

//prebaci u game klasu
function endGame(){
    console.log("endGame");
    getScore();
	document.getElementById('gameover').innerHTML = "GAME OVER";
    clearInterval(interval);
    document.body.innerHTML += '<input id="getname" type="text" placeholder="Input your name here " width="100" height="100"></input><br>';
    document.body.innerHTML += '<button id="submit" class="slova" onclick="awaitSendData()">Submit</button>';
}

async function awaitSendData(){
    await sendData();
}


//prebaci u game klasu
function restartGame(){
    console.log("restartGame");
    document.location.reload();	
}

//prebaci u Game klasu
var start = new Date().getTime();

function getCurrentTime(){
	return new Date().getTime();
}


//za funkciju ispod
function positiveOrNegativeOne(){
	var sample = Math.random();
	if(sample < 0.5){
		return -1;
	}
	else{
		return 1;
	}

}

//FIXME
function randomAngle(){
	var temp = Math.random();
	while(temp <= 0.6){
		temp = Math.random();
	}
	return temp ;
}


//napredovanje lotpe na canvasu
function updateBallMovement(){

	ball1.x += ball1.dx;
    ball1.y += ball1.dy;

    if(getCurrentTime() - start > game.ball2StartTime){
		ball2.x += ball2.dx;
		ball2.y += ball2.dy;
    }

    if(getCurrentTime() - start > game.ball3StartTime){
    	ball3.x += ball3.dx;
    	ball3.y += ball3.dy;
    }
}


function ballCoallision(ball){
    if(ball.y + ball.dy > canvas.height - ball.radius){
        if(ball.x >= xB && ball.x <= xB + game.lineWidth){
            ball.dy = -ball.dy*randomAngle();
            ball.dx = ball.dx * positiveOrNegativeOne();
        }
            else {
                endGame();
            }
    }

    if(ball.y + ball.dy < 0 + ball.radius){
        if(ball.x >= xT && ball.x <= xT + game.lineWidth){
            ball.dy = -ball.dy*randomAngle();
            ball.dx = ball.dx * positiveOrNegativeOne();    
        }
            else {
                endGame();
            }
    }

    if(ball.x + ball.dx > canvas.width - ball.radius){
        if(ball.y >= yR && ball.y <= yR + game.lineWidth){
            ball.dx = -ball.dx*randomAngle();
            ball.dy = ball.dx * positiveOrNegativeOne();    
        }
                else {
                endGame();
            }
    }

    if(ball.x + ball.dx < 0 + ball.radius){
        if(ball.y >= yL && ball.y <= yL + game.lineWidth){
            ball.dx = -ball.dx*randomAngle();
            ball.dy = ball.dx * positiveOrNegativeOne();
        }
            else {
                endGame();
            }
    }
    
}

//slanje serveru //FIX JSON
async function sendData(){
    try{

        fetchNameAndScore();

        //const data = {name, score};
        const URL = 'http://localhost:2020/';
        const response = await fetch(URL, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            //mode : 'cors',
            body : JSON.stringify({name : name, score : score})
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);

    } catch (e) {
        console.error(e);
    }
}

async function getData(){
    try {
        const URL = 'http://localhost:2020/';
        const response = await fetch(URL, {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);   
             
    } catch (err) {
        console.log(err);
    }
}


//dohvatanje imena preko doma
function fetchNameAndScore(){

    name = document.getElementById('getname').value;
    score = parseInt(document.getElementById('sc').innerHTML);

    console.log("Name: "+ name);
    console.log("Score: "+ score);
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLineBottom();
    drawLineTop();    
    drawLineLeft();
    drawLineRight();
    drawBall();

    if(getCurrentTime() - start > game.ball2StartTime){
    	drawBall2();
    }

    if(getCurrentTime() - start > game.ball3StartTime){
   		drawBall3();
    }

    ballCoallision(ball1);
    ballCoallision(ball2);
    ballCoallision(ball3);

    updateBallMovement();

}

var interval = setInterval(draw, 10);
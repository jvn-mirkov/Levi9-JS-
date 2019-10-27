/***************************************
Neka resenja prezeta sa:
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
***************************************/
//canvas 
//background layer
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

//vertical and horizontal path layer
//var canvas2 = document.getElementById("crossCanvas");
//var ctx2 = canvas.getContext("2d");

//ball and lines layer
//var canvas3 = document.getElementById("myCanvas3");
//var ctx3 = canvas.getContext("2d");

//ball1
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

//ball2
var ball2StartTime = 7000; 
var x2 = canvas.width/2;
var y2 = canvas.height/2;
var dx2 = 2;
var dy2 = 2;

//ball3
var ball3StartTime = 14000; 
var x3 = canvas.width/2;
var y3 = canvas.height/2;
var dx3 = 2;
var dy3 = -2;




//line properites
var lineHeight = 10;
var lineWidth = 75;
var move = 4;

//flags
var downPressed = false;
var upPressed = false;
var leftPressed = false;
var rightPressed = false;

//init positions
var xB = (canvas.width-lineWidth)/2;
var yB = canvas.height-lineHeight
var xT = (canvas.width-lineWidth)/2;
var yT = 0 
var xL = 0
var yL = (canvas.width-lineWidth)/2;
var xR = canvas.width-lineHeight
var yR = (canvas.width-lineWidth)/2;



//listener functions
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);




function mouseMoveHandler(e) {
    
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;   

    if(relativeX > 0 && relativeX < canvas.width) {
        xB = relativeX - lineWidth/2;
        xT = relativeX - lineWidth/2;
        if (xB + lineWidth > canvas.width){
            xB = canvas.width - lineWidth;
            xT = canvas.width - lineWidth;
        }
        if (xB < 0){
            xB = 0;
            xT = 0;
        }
    }

    if(relativeY > 0 && relativeY < canvas.height) {
        yL = relativeY - lineHeight/2;
        yR = relativeY - lineHeight/2;
        if (yL < 0){
            yL = 0;
            yR = 0;
        }
        if (yL + lineWidth > canvas.height){
            yL = canvas.height - lineWidth;
            yR = canvas.height - lineWidth;
        }
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
        else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}




function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#BB7777";
    ctx.fill();
    ctx.closePath();
}

function drawBall2() {
    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#BB7777";
    ctx.fill();
    ctx.closePath();
}

function drawBall3() {
    ctx.beginPath();
    ctx.arc(x3, y3, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#BB7777";
    ctx.fill();
    ctx.closePath();
}

function drawLineBottom() {
    ctx.beginPath();
    ctx.rect(xB, yB, lineWidth, lineHeight);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}

function drawLineTop() {
    ctx.beginPath();
    ctx.rect(xT, yT, lineWidth, lineHeight);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}

function drawLineLeft() {
    ctx.beginPath();
    ctx.rect(xL, yL, lineHeight, lineWidth);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}

function drawLineRight() {
    ctx.beginPath();
    ctx.rect(xR, yR, lineHeight, lineWidth);
    ctx.fillStyle = "#00818a";
    ctx.fill();
    ctx.closePath();
}


/*
function drawVerticalPath() {
	ctx2.beginPath();
    ctx2.clearRect(xT,yT, lineWidth, canvas.height);
    ctx2.fillStyle = "#737373";
    ctx2.fill();
    ctx2.closePath();
}

function drawHorizontalPath() {
	ctx2.beginPath();
    ctx2.clearRect(xL,yL,canvas.width,lineHeight);
    ctx2.fillStyle = "#737373";
    ctx2.fill();
    ctx2.closePath();	
}
*/


function endGame(){
	alert("GAME OVER");
	document.location.reload();
	clearInterval(interval);
}

function movement(){
    if(rightPressed) {
        {xB += move; xT += move;}
        if (xB + lineWidth > canvas.width){
            xB = canvas.width - lineWidth;
            xT = canvas.width - lineWidth;
        }
    }
    else if(leftPressed) {
        {xB -= move; xT -= move;}
        if (xB < 0){
            xB = 0;
            xT = 0;
        }
    }
    else if(upPressed) {
        {yL -= move; yR -= move;}
        if (yL < 0){
            yL = 0;
            yR = 0;
        }
    }
    else if(downPressed) {
        {yL += move; yR += move;}
        if (yL + lineWidth > canvas.height){
            yL = canvas.height - lineWidth;
            yR = canvas.height - lineWidth;
        }
    }
}




var start = new Date().getTime();

function getCurrentTime(){
	return new Date().getTime();
}


function positiveOrNegativeOne(){
	var sample = Math.random();
	if(sample < 0.5){
		return -1;
	}
	else{
		return 1;
	}

}


function randomAngle(){
	var temp = Math.random();
	while(temp <= 0.5){
		temp = Math.random();
	}
	return temp* positiveOrNegativeOne();
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLineBottom();
    drawLineTop();    
    drawLineLeft();
    drawLineRight();
   
    drawBall();

    if(getCurrentTime() - start > ball2StartTime){
    	drawBall2();
    }

    if(getCurrentTime() - start > ball3StartTime){
   		drawBall3();
    }


    //koalizija

	if(y + dy > canvas.height - ballRadius){
		if(x >= xB && x <= xB + lineWidth){
			dy = -dy*randomAngle();

		}
    	else{
			endGame();
    	}
	}

	if(y + dy < 0 + ballRadius){
		if(x >= xT && x <= xT + lineWidth){
			dy = -dy*randomAngle();

		}
        else{
			endGame();
        }
	}

	if(x + dx > canvas.width - ballRadius){
		if(y >= yR && y <= yR + lineWidth){
			dx = -dx*randomAngle();

		}
        else {
			endGame();
        }
	}

	if(x + dx < 0 + ballRadius){
		if(y >= yL && y <= yL + lineWidth){
			dx = -dx*randomAngle();
		}
        else {
			endGame();
        }
	}







	if(y2 + dy2 > canvas.height - ballRadius){
		if(x2 >= xB && x2 <= xB + lineWidth){
			dy2 = -dy2*randomAngle();

		}
	        else {
				endGame();
	        }
	}

	if(y2 + dy2 < 0 + ballRadius){
		if(x2 >= xT && x2 <= xT + lineWidth){
			dy2 = -dy2*randomAngle();
		}
	        else {
				endGame();
	        }
	}

	if(x2 + dx2 > canvas.width - ballRadius){
		if(y2 >= yR && y2 <= yR + lineWidth){
			dx2 = -dx2*randomAngle();
		}
		        else {
				endGame();
	        }
	}

	if(x2 + dx2 < 0 + ballRadius){
		if(y2 >= yL && y2 <= yL + lineWidth){
			dx2 = -dx2*randomAngle();
		}
	        else {
				endGame();
	        }
	}





	if(y3 + dy3 > canvas.height - ballRadius){
		if(x3 >= xB && x3 <= xB + lineWidth){
			dy3 = -dy3*randomAngle();

		}
	        else {
				endGame();
	        }
	}

	if(y3 + dy3 < 0 + ballRadius){
		if(x3 >= xT && x3 <= xT + lineWidth){
			dy3 = -dy3*randomAngle();

		}
	        else {
				endGame();
	        }
	}

	if(x3 + dx3 > canvas.width - ballRadius){
		if(y3 >= yR && y3 <= yR + lineWidth){
			dx3 = -dx3*randomAngle();

		}
		        else {
				endGame();
	        }
	}

	if(x3 + dx3 < 0 + ballRadius){
		if(y3 >= yL && y3 <= yL + lineWidth){
			dx3 = -dx3*randomAngle();

		}
	        else {
				endGame();
	        }
	}


	//ako koristimo arrow keys
    movement();


    //kretanje lopte

    x += dx;
    y += dy;

    if(getCurrentTime() - start > ball2StartTime){
		x2 += dx2;
		y2 += dy2;
    }

    if(getCurrentTime() - start > ball3StartTime){
    	x3 += dx3;
    	y3 += dy3;
    }





}

var interval = setInterval(draw, 10);
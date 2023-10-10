const BtnStart = document.getElementById("Start");
const area = document.getElementById("Area1");
let snakeHead = document.getElementById("Snake1");
const labelscore = document.getElementById("ScoreValue");
const img1 = document.getElementById("Imagen1");
let score = 0;
let snakeDivs = [snakeHead];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function colide(usx, usy, ufx, ufy){
    if((Math.abs(usx - ufx) < 17) && Math.abs(usy - ufy) < 17){
        return true;
    }
}
food.newFood = function(){
    food.posX[0] =  getRandomInt(2,((area.offsetWidth) / 10 - 30 )) * 10;
    food.posY[0] =  getRandomInt(2,((area.offsetHeight) / 10 - 30 )) * 10;
    create(food.posX[0], 0, "food");
}

function lostGame(){
    snake.stops();
    BtnStart.removeAttribute('hidden');
    img1.setAttribute("src","./img/snakedead.png");
    img1.removeAttribute('hidden');
    document.getElementById("Name1").innerText = "GAME OVER";
    document.getElementById("Name1").style.color = "Red";
    snake.posX[0]= parseInt((area.offsetWidth/2));
    snake.posY[0]= parseInt((area.offsetHeight/2));
    snake.posX.length = 5;
    snake.posY.length = 5;
    snakeDivs.length = 5;
}

function moveSnake(){
    const limitX = area.offsetWidth - 10;
    const limitY = area.offsetHeight - 20;
    const snakeLength = snake.posX.length;
    const headX = snake.posX[0];
    const headY = snake.posY[0];
    const divFood = document.getElementById("Food1");
    const arrayFood = [divFood];
    const colf = colide(snake.posX[0], snake.posY[0], food.posX[0], food.posY[0]);
    let lost = false;
    if(colf) {
        snake.posX.push(snake.posX[snakeLength - 1]);
        snake.posY.push(snake.posY[snakeLength - 1]);
        food.newFood();
        snake.speed = 200 - (snakeLength * 2);
        deleteDiv(arrayFood);
        score = score + 50;
        labelscore.innerText = score.toString();
        snake.stops();
        snake.move();
    }
    for(i = snakeLength - 1; i > 0; i--){
        lost = colide(snake.posX[0], snake.posY[0], snake.posX[i], snake.posY[i]);
        if(lost) {
            lostGame();
            deleteDiv(arrayFood);
            break;
        } else {
        snake.posX[i] = snake.posX[i - 1];
        snake.posY[i] = snake.posY[i - 1];
        }
    }
    if(!lost) {
        switch (snake.dir)
            {
                case "left":
                    if(snake.posX[0] < 20){
                        snake.posX[0] = limitX;
                    }else{
                        snake.posX[0] = headX - 20;
                    }
                break;          
                case "right":
                    if(snake.posX[0] > limitX){
                        snake.posX[0] = 0;
                    }else{
                        snake.posX[0] = 20 + headX;
                    }
                break;                                
                case "up":
                    if(snake.posY[0] < 10){
                        snake.posY[0] = limitY;
                    }else{
                        snake.posY[0] = headY - 20;
                    }
                break;                          
                case "down":
                    if(snake.posY[0] > limitY){
                        snake.posY[0] = 0;
                    }else{
                        snake.posY[0] = headY + 20;
                    }
                break;
            }
    }
}

function create(item, index, drawElement){
    let newDiv = document.createElement("div");
    if (drawElement === "Snake") {
        if(index === 0) {
            newDiv.setAttribute("class", "SnakeHead");
            newDiv.setAttribute("id", "Snake1");
            switch(snake.dir){
                case "left":
                    newDiv.style.transform = "rotate(90deg)";
                break;
                case "right":
                    newDiv.style.transform = "rotate(-90deg)";
                break;
                case "up":
                    newDiv.style.transform = "rotate(180deg)";
                break;
                default:
                    newDiv.style.transform = "rotate(0deg)";
            }
        }else{
            newDiv.setAttribute("class", "SnakeBody");
            newDiv.setAttribute("id", 'Body' + index);       
        }
        newDiv.style.top = snake.posY[index] + 'px';
        snakeDivs[index] = newDiv; 
    }else{
        newDiv.setAttribute("class", "Food");
        newDiv.setAttribute("id", "Food1");
        newDiv.style.top = food.posY[index] + 'px';
    }
    newDiv.style.left = item + 'px';
    area.appendChild(newDiv);
}

function drawSnake(){
    const snx = snake.posX;
    for(i = 0;i < snx.length; i++) {
        create(snx[i], i, "Snake");
    }
}

function deleteDiv(delElement){
    delElement.forEach((e) => {
        const divToDelete = e;
        divToDelete.parentNode.removeChild(divToDelete);
    });
}

snake.moveChange = function (posX,posY,dir){
    deleteDiv(snakeDivs);
    moveSnake();
    drawSnake();
 }

const changeDir = (e) => {
    switch (e.key) {
        case ("a"):
            if(snake.dir !== "right"){
                snake.dir = "left";
            }
        break;
        case ("s"):
            if(snake.dir !== "up"){
                snake.dir = "down";
            }
        break;
        case ("d"):
            if(snake.dir !== "left"){
                snake.dir = "right";
            }
        break;
        case ("w"):
            if(snake.dir !== "down"){
                snake.dir = "up";
            }
        break;
    }
}

function startGame(){
    score = 0;
    snakeHead = document.getElementById("Snake1");
    snake.posX[0] = snakeHead.offsetLeft;
    snake.posY[0] = snakeHead.offsetTop;
    for (i = 1; i < 5; i++){
        snake.posX[i] = snake.posX[i - 1] - 17;
        snake.posY[i] = snakeHead.offsetTop;
    }
    deleteDiv(snakeDivs);
    drawSnake();
    food.newFood();
    snake.speed = 200;
    snake.dir = "right";
    snake.move();
    img1.setAttribute('hidden', true);
    BtnStart.setAttribute('hidden', true);
}

BtnStart.addEventListener("click", ()=>startGame());
addEventListener('keyup', changeDir);
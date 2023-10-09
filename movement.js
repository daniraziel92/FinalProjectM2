const BtnStart = document.getElementById("start");
const Area = document.getElementById("A1");
let SnakeHead = document.getElementById("S1");
const labelscore = document.getElementById("scorev");
const Img1 = document.getElementById("Img1");
let score = 0;
let Sdraw = [SnakeHead];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function colide(usx,usy,ufx,ufy){
    if((Math.abs(usx-ufx)<17) && Math.abs(usy-ufy)<17){
        return true;
    }
}
food.NewFood = function(){
    food.posx[0] =  getRandomInt(2,((Area.offsetWidth)/10 - 30))*10;
    food.posy[0] =  getRandomInt(2,((Area.offsetHeight)/10 - 30))*10;
    Create(food.posx[0],0,"food");
}

function Lost(){
    snake.Stops();
    BtnStart.removeAttribute('hidden');
    Img1.setAttribute("src","./img/snakedead.png");
    Img1.removeAttribute('hidden');
    document.getElementById("Name1").innerText = "GAME OVER";
    document.getElementById("Name1").style.color = "Red";
    snake.posx[0]= parseInt((Area.offsetWidth/2));
    snake.posy[0]= parseInt((Area.offsetHeight/2));
    snake.posx.length = 5;
    snake.posy.length = 5;
    Sdraw.length = 5;
    

}

function MoveSnake(){
    const largo = snake.posx.length;
    const headx = snake.posx[0];
    const heady = snake.posy[0];
    const DivFood = document.getElementById("f1");
    const ArrayFood = [DivFood];
    const colf = colide(snake.posx[0],snake.posy[0],food.posx[0],food.posy[0]);
    if(colf){
        snake.posx.push(snake.posx[largo-1]);
        snake.posy.push(snake.posy[largo-1]);
        food.NewFood();
        snake.speed = 200 - (largo*2);
        Delete(ArrayFood);
        score = score + 50;
        labelscore.innerText = score.toString();
        snake.Stops();
        //DrawSnake();
        snake.Move();
    }
    let lost = false;
    for(i=largo-1;i>0;i--){
        lost = colide(snake.posx[0],snake.posy[0],snake.posx[i],snake.posy[i]);
        if(lost){
            Lost();
            Delete(ArrayFood);
            break;
        }else{
        snake.posx[i]=snake.posx[i-1];
        snake.posy[i]=snake.posy[i-1];}
    }

    const Limitx = Area.offsetWidth - 10;
    const LimitY = Area.offsetHeight - 20;
    if(lost){
    }else{
        switch (snake.dir)
            {
                case "left":
                    if(snake.posx[0] < 20){snake.posx[0] = Limitx;
                    }else{snake.posx[0] = headx-20;}
                    break           
                case "right":
                    if(snake.posx[0] > Limitx){snake.posx[0] = 0;
                    }else{snake.posx[0] = 20 + headx;}
                    break                                  
                case "up":
                    if(snake.posy[0] < 10){snake.posy[0] = LimitY;
                    }else{snake.posy[0] = heady-20;}
                    break                          
                case "down":
                    if(snake.posy[0] > LimitY){snake.posy[0] = 0;
                    }else{snake.posy[0] = heady+20;}
                    break
            }
    }     
        //labelscore.innerText = score.toString()
}

function Create(item, index, drawelement){
    let DivS = document.createElement("div");
    if (drawelement==="Snake"){
        if(index === 0){
            DivS.setAttribute("class","SnakeHead");
            DivS.setAttribute("id","S1");
            switch(snake.dir){
                case "left":
                    DivS.style.transform = "rotate(90deg)";
                    break;
                case "right":
                    DivS.style.transform = "rotate(-90deg)";
                    break;
                case "up":
                    DivS.style.transform = "rotate(180deg)";
                    break;
                default:
                    DivS.style.transform = "rotate(0deg)";
                    break;
            }
        }else{
            DivS.setAttribute("class","SnakeBody");
            DivS.setAttribute("id",'B'+index);       
        }
        DivS.style.top = snake.posy[index]+'px';
        Sdraw[index] = DivS; 
    }else{
        DivS.setAttribute("class","food");
        DivS.setAttribute("id","f1");
        DivS.style.top = food.posy[index]+'px';
    }
    DivS.style.left = item+'px';
    Area.appendChild(DivS);
}

function DrawSnake(){
    const Snx = snake.posx;
    for(i=0;i<Snx.length;i++)
    {
        Create(Snx[i],i,"Snake");
    }
    //Snx.forEach(Create());
}

function Delete(DelElement){
    DelElement.forEach((e) => {
        const DivE = e;
        DivE.parentNode.removeChild(DivE);
    });
}


snake.MoveChange = function (posx,posy,dir){
    Delete(Sdraw);
    MoveSnake();
    DrawSnake();
 }

const changedir = (e) => {
    console.log(e)

    switch (e.key) {
        case ("a"):
           if(snake.dir != "right"){snake.dir="left"}
            return
        case ("s"):
            if(snake.dir != "up"){snake.dir="down"}
            return
        case ("d"):
            if(snake.dir != "left"){snake.dir="right"}
            return
        case ("w"):
            if(snake.dir != "down"){snake.dir="up"}
            return
    }
}


function startgame(){
    score = 0;
    
    SnakeHead = document.getElementById("S1");
    snake.posx[0]=SnakeHead.offsetLeft;
    snake.posy[0]=SnakeHead.offsetTop;
    for (i=1; i<5;i++){
        snake.posx[i] = snake.posx[i-1] - 17;
        snake.posy[i]= SnakeHead.offsetTop;
    }
    Delete(Sdraw);
    DrawSnake();
    food.NewFood();
    snake.speed=200;
    snake.dir="right";
    snake.Move();
    Img1.setAttribute('hidden',true);
    BtnStart.setAttribute('hidden',true);
}


BtnStart.addEventListener("click",()=>startgame());
addEventListener('keyup', changedir);
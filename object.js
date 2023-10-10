const snake = {
    posX:[250,240,230,220,210],
    posY:[250,250,250,250,250],
    speed:200,
    dir:"right",
    internalId: null,
    moveChange: function(posX,posY,dir){},
    move: function(){
        snake.internalId = setInterval(function(){
            snake.moveChange(snake.posX,snake.posY,snake.dir)
            },snake.speed)
        },
    stops: function () {
        clearInterval(snake.internalId)
        }
}

const food = {
    posX:[100],
    posY:[100],
    newFood:function(){}
}
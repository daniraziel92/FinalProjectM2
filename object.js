snake = {
    posx:[250,240,230,220,210],
    posy:[250,250,250,250,250],
    speed:200,
    dir:"right",
    InternalId: null,
    MoveChange: function(posx,posy,dir){},
    Move: function(){
    snake.InternalId = setInterval(function(){
    snake.MoveChange(snake.posx,snake.posy,snake.dir)
        },snake.speed)
  
    },
    Stops: function () {
        clearInterval(snake.InternalId)
        }
}

food = {
    posx:[100],
    posy:[100],
    NewFood:function(){}
}
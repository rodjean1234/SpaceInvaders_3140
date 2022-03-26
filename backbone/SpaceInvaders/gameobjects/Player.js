"using strict";

var gameObjs = (function (gameObjs)
{
    function Player_prototype ()
    {
        this.sprite = null;
        this.rectangle = null;
    }
    Player_prototype.prototype.initialize = function(sprite, rect)
    {
        this.sprite = sprite;
        this.rectangle = rect;
    };
    Player_prototype.prototype.drawPlayer = function()
    {
        brain.Canvas2d.drawRectangle(this.rectangle, "green");
    };
    Player_prototype.prototype.move = function (units, direction)
    {
        if (direction === "left")
        {
            var x = this.rectangle.x-units < 0 ? 0 : this.rectangle.x-units;
            this.rectangle = new brain.Rectangle(x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
        if (direction === "right")
        {
            var future = this.rectangle.x+units+this.rectangle.width;
            var x = future > brain.Game.dimension.x ? brain.Game.dimension.x-this.rectangle.width : this.rectangle.x+units;
            this.rectangle = new brain.Rectangle(x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
    };
    gameObjs.Player = new Player_prototype();
    return gameObjs;
})(gameObjs || {});

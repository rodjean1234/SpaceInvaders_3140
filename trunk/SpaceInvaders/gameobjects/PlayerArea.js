"using strict";

var gameObjs = (function (gameObjs)
{
    function PlayerArea_prototype ()
    {
        this.rectangle = null;
    }

    PlayerArea_prototype.prototype.initialize = function (rect)
    {
        rect = typeof rect === 'undefined' ? new gameObjs.Rectangle(0, 0, 50, 50) : rect;
        this.rectangle = rect;
    };

    gameObjs.PlayerArea = new PlayerArea_prototype();
    return gameObjs;
})(gameObjs || {});

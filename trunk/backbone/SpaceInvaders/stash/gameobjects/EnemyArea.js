"using strict";

var gameObjs = (function (gameObjs)
{
    function EnemyArea_prototype ()
    {
        this.rectangle = null;
    }

    EnemyArea_prototype.prototype.initialize = function (rect)
    {
        rect = typeof rect === 'undefined' ? new gameObjs.Rectangle(0, 0, 50, 50) : rect;
        this.rectangle = rect;
    };
    gameObjs.EnemyArea = new EnemyArea_prototype();
    return gameObjs;
})(gameObjs || {});

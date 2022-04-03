"using strict";

var gameObjs = (function (gameObjs)
{
    function uiArea_prototype ()
    {
        this.rectangle = null;
    }

    uiArea_prototype.prototype.initialize = function (rect)
    {
        rect = typeof rect === 'undefined' ? new gameObjs.Rectangle(0, 0, 50, 50) : rect;
        this.rectangle = rect;
    };

    gameObjs.uiArea = new uiArea_prototype();
    return gameObjs;
})(gameObjs || {});

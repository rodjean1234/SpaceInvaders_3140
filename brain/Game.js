"using strict";

/*
    Get used to this code structure presented here. We begin by declaring a
    variable brain. This variable is assigned the value of function(brain || {}).
    Now if brain is already defined, the parameter passed to this lambda is
    brain. If brain is not defined, we pass an empty object.
*/
var brain = (function (brain)
{
    /*This is used to call the mainLoop over and over. requestAnimationFrame is
    assigned the value that is appropraite depending upon the browser and version.
    If none of the browser specific functions are defined, we simply use the
    window.setTimeout function. Not that this calls the mainLoop every 60 milliseconds
    so we get 60 frames per second as required by the system requirement specification.
    */
    var requestAnimationFrame = (function ()
        {
            return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();
    /*Here we define the constructor for a Game object. Note that we only need 1
    game object so we add a singulare Game_prototype object to the namespace instead
    of adding the class itself. We could have added the class also but that would
    have been redundant because we only need 1 game object that we contiously
    refer to in our code.
    */
    function Game_prototype()
    {
        /*
        A game object has three members: a Vector2 object that denotes its
        width and height.
        The object also has two members used to load sprites. We have not gotten
        to the point of loading sprites in our code so they are not used yet.
        They will, however, be used in the future.
        */
        this._dimensions = null;
        this._spritesStillLoading = 0;
        this._totalSprites = 0;
    }
    //A simple get procedure that returns the Game's dimension vector.
    //For those not familiar with javascript this function is called using
    //GameObject.dimension
    Object.defineProperty(Game_prototype.prototype, "dimension",
            {
                get: function()
                {
                    return this._dimensions;
                }
            });
    /*
    A game rectangle that will be very useful later on because we divide the
    game rectangle into three areas. The ui, the enemies, and the player area.
    */
    Object.defineProperty(Game_prototype.prototype, "gameRect",
            {
                get: function()
                {
                    return new brain.Rectangle(0, 0,
                                                this._dimensions.x,
                                                this._dimensions.y);
                }
            });
    //This function is used to initialize the Game object.
    //This should be only used once when the game is first initialized.
    Game_prototype.prototype.start = function (divName, canvasName, width, height)
    {
        this._dimensions = new brain.Vector2(width, height);
        brain.Canvas2d.initialize(divName, canvasName, width, height);
        this.loadAssets();
        this.assetLoadingLoop();
    };

    //An asset loading function that will come in use later.
    Game_prototype.prototype.loadAssets = function ()
    {
        ;
    };

    //An asset loading loop that will come in use later.
    Game_prototype.prototype.assetLoadingLoop = function ()
    {
        ;
    };

    //The main loop of our game.
    Game_prototype.prototype.mainLoop = function ()
    {
        brain.Canvas2d.clearCanvas();
        var canvas = brain.Canvas2d.canvas;
        var ctx = brain.Canvas2d.canvasContext;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        brain.Canvas2d.writeText("I love 0x4164646572616C6C", new brain.Vector2(brain.Game._dimensions.x/2, brain.Game._dimensions.y/2), new brain.Vector2(0, 0),
                                 "#FFFFFF", "center", "Cambria Math", "75px");
        var scale = 0.05;
        var random_cords = new brain.Vector2(Math.random()*brain.Game.dimension.x*(1/scale),
                                             Math.random()*brain.Game.dimension.y*(1/scale))
        brain.Canvas2d.drawImage(sprites.player, random_cords,
                                 new brain.Vector2(sprites.player.width/2,sprites.player.height/2), 0, scale,
                                 new brain.Rectangle(0, 0, sprites.player.width, sprites.player.height))
        requestAnimationFrame(brain.Game.mainLoop);
    };

    //Here we add the Game object to the namespace.
    brain.Game = new Game_prototype;
    return brain;
})(brain || {});

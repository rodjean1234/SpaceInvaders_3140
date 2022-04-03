/*
    This is the main file javascript file for the SpaceInvader game.
    Most of the logical code is contained in the brain director---hence
    the name. As you can see in the lines below we are are using brain.
    because brain here is synonymous to a namepsace in C++. Our brain
    namespace contains a lot of things currently. In particular, it contains
    a Canvas object, Game object, Vector class, and a Rectangle class.
    More classes and objects will be added to this namespace as time
    progresses.
*/
"using strict";

var sprites = {};
brain.Game.loadAssets = function()
{
    var loadImage = function (src)
    {
        return new brain.Sprite(src);
    };
    sprites.player = loadImage("Images/player.png");
};

brain.Game.initialize = function()
{
    var width = brain.Game.dimension.x;
    var height = brain.Game.dimension.y;
    gameObjs.uiArea.initialize(new brain.Rectangle(0, 0, width, height/10));
    gameObjs.EnemyArea.initialize(new brain.Rectangle(0, height/10 + 1, width, 2*height/3));
    gameObjs.PlayerArea.initialize(new brain.Rectangle(0, gameObjs.uiArea.rectangle.height + gameObjs.EnemyArea.rectangle.height + 2,
                                                        width, 13*width/30));
    var player_width = gameObjs.PlayerArea.rectangle.width/10;
    var player_height = gameObjs.PlayerArea.rectangle.height/10;
    var pRect = new brain.Rectangle(gameObjs.PlayerArea.rectangle.width/2-player_width/2,
                                    brain.Game.dimension.y-player_height, player_width, player_height);
    gameObjs.Player.initialize(sprites.player.image, pRect);
}

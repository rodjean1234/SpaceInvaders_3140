"using strict";

var brain = (function (brain)
{
    function Sprite (src)
    {
        console.log("Loading Image: " + src);
        brain.Game._spritesStillLoading += 1;
        brain.Game._totalSprites += 1;

        this.image = new Image();
        this.image.src = src;

        this.image.onload = function ()
        {
            console.log("Finished loading " + src);
            brain.Game._spritesStillLoading -= 1;
        }
    }
    Object.defineProperty(Sprite.prototype, "width",
        {
            get: function()
            {
                this.image.width;
            }
        });
    Object.defineProperty(Sprite.prototype, "height",
        {
            get: function()
            {
                this.image.height;
            }
        });
    brain.Sprite = Sprite;
    return brain;
})(brain || {});

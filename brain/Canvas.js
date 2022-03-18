"using strict";

/*
    A canvas class that is used to store our mainCanvas and its context.
*/
var brain = (function (brain)
{
    /*
    Canvas2d constructor. The canvas has 4 members: div, canvas, canvasContext,
    and offset. The div object refers to the divider. This object is very
    important and useful becuase it is used to center our canvas and adjust
    the canvas when the window is resized.
    */
    function Canvas2d_prototype ()
    {
        this.div = null;
        this.canvas = null;
        this.canvasContext = null;
        this.offset = new brain.Vector2(0, 0);
    }
    /*
    This returns a vector that holds the x and y scale for our canvas. We must
    use a scale because we want to support mobile support.
    */
    Object.defineProperty(Canvas2d_prototype.prototype, "scale",
        {
            get: function()
            {
                return new brain.Vector2(this.canvas.width  / brain.Game.dimension.x,
                                         this.canvas.height / brain.Game.dimension.y);
            }
        });

    //Procedure used to initialize the members. Very simple and straight to the point.
    //We tell the window to call our canvas resize procedure when it is resized.
    //Then immediately call the resize procedure to adjust the div and canvas.
    Canvas2d_prototype.prototype.initialize = function (divName, canvasName)
    {
        this.div = document.getElementById(divName);
        this.canvas = document.getElementById(canvasName);
        this.canvasContext = this.canvas.getContext("2d");
        window.onresize = this.resize;
        this.resize();
    };

    //Simple procedure to clear the canvas.
    Canvas2d_prototype.prototype.clearCanvas = function()
    {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    //Resize procedure that is called when the window is resized.
    Canvas2d_prototype.prototype.resize = function()
    {
        var gameCanvas = brain.Canvas2d.canvas;
        var gameArea = brain.Canvas2d.div;
        var aspect_ratio = brain.Game.dimension.x / brain.Game.dimension.y;
        var new_width = window.innerWidth;
        var new_height = window.innerHeight;
        var new_aspect_ratio = new_width / new_height;

        //We use the following code to determine where we should add margins.
        //Should we add margins to the top and bottom, or should we add margins
        //to the left and right? Well this all depends on which is larger:
        //the window width or window height. If the height is larger, we add
        //margins to the top and bottom, and if the width is larger, we add
        //margins to the left and right.
        if (new_aspect_ratio > aspect_ratio)
            new_width = new_height * aspect_ratio;
        else
            new_height = new_width / aspect_ratio;

        //Adjust the div width.
        gameArea.style.width = new_width + 'px';
        gameArea.style.height = new_height + 'px';

        //Add margins.
        gameArea.style.marginTop = (window.innerHeight - new_height) / 2 + 'px';
        gameArea.style.marginLeft = (window.innerWidth - new_width) / 2 + 'px';
        gameArea.style.marginBottom = (window.innerHeight - new_height) / 2 + 'px';
        gameArea.style.marginRight = (window.innerWidth - new_width) / 2 + 'px';

        //Adjust canvas width.
        gameCanvas.width = new_width;
        gameCanvas.height = new_height;

        //offset will used to adjust for user input.
        var offset = new brain.Vector2(0, 0);
        if (gameCanvas.offsetParent)
        {
            do {
                offset.x += gameCanvas.offsetLeft;
                offset.y += gameCanvas.offsetTop;
            } while ((gameCanvas = gameCanvas.offsetParent));
        }
        brain.Canvas2d.offset = offset;
    };

    //Simple procedure that writes text to the canvas.
    //The names and the code itself should be self-explanatory.
    Canvas2d_prototype.prototype.writeText = function (text, cords, origin, color, align, font, fontsize)
    {
        var canvasScale = this.scale;

        cords = typeof cords === 'undefined' ? new brain.Vector2(0, 0) : cords;
        origin = typeof origin === 'undefined' ? new brain.Vector2(0, 0) : origin;
        color = typeof color === 'undefined' ? "#FFFFFF" : color;
        align = typeof align === 'undefined' ? "top" : align;
        font = typeof font === 'undefined' ? "Cambria Math" : font;
        fontsize = typeof fontsize === 'undefined' ? "35px" : fontsize;

        this.canvasContext.save();
        this.canvasContext.scale(canvasScale.x, canvasScale.y);
        this.canvasContext.translate(cords.x - origin.x, cords.y - origin.y);
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.font = fontsize + " " + font;
        this.canvasContext.fillStyle = color;
        this.canvasContext.textAlign = align;
        this.canvasContext.fillText(text, 0, 0);
        this.canvasContext.restore();
    };
    //Simple procedure to draw a rectangle. Will come in handy later on.
    Canvas2d_prototype.prototype.drawRectangle = function (rect, strokeColor)
    {
        rect = typeof rect === 'undefined' ? new brain.Rectangle(0, 0, 50, 50) : rect;
        strokeColor = typeof strokeColor === 'undefined' ? "white" : strokeColor;
        var canvasScale = this.scale;
        this.canvasContext.save();
        this.canvasContext.strokeStyle = strokeColor;
        this.canvasContext.scale(canvasScale.x, canvasScale.y);
        this.canvasContext.strokeRect(rect.x, rect.y, rect.width, rect.height);
        this.canvasContext.restore();
    };
    //Image drawing procedure that will be used throughout the game to do
    //the main drawing.
    Canvas2d_prototype.prototype.drawImage = function (sprite, cords, origin, rotation, scale, rect, mirror)
    {
        cords = typeof cords === 'undefined' ? new brain.Vector2(0, 0) : cords;
        origin = typeof origin === 'undefined' ? new brain.Vector2(0, 0) : origin;
        rotation = typeof rotation === 'undefined' ? 0 : rotation;
        scale = typeof scale === 'undefined' ? 1 : scale;
        rect = typeof rect === 'undefined' ? new brain.Vector2(0, 0) : rect;

        this.canvasContext.save();
        var canvasScale = this.scale;

        //mirror indicates whether we want to reflect the sprite on the y-axis
        if (mirror)
        {
            //we scale the canvas x-cords by -1 because we want to reflect
            //the sprite with respect to the y-axis. this should make sense if
            //you try to imagine a Cartesian plane.
            this.canvasContext.scale(scale * canvasScale.x * -1, scale * canvasScale.y);
            this.canvasContext.translate(-cords.x - source.width, cords.y);
            this.canvasContext.rotate(rotation);
            //this should make sense, but if it doesn't, imagine the Cartesian plane
            //and there's a rectangle in the first quadrant, and the origin is the
            //the intersection of the diagonals of the rectangle. When we reflect the
            //rectangle, we have to change the origin to show the reflection.
            //for more see
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
            this.canvasContext.drawImage(sprite, rect.x, rect.y, rect.width, rect.height,
                                         rect.width-origin.x, -origin.y,
                                         rect.width, rect.height);
        }
        else
        {
            this.canvasContext.scale(scale * canvasScale.x, scale * canvasScale.y);
            this.canvasContext.translate(cords.x, cords.y);
            this.canvasContext.rotate(rotation);
            //for more see
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
            this.canvasContext.drawImage(sprite, rect.x, rect.y, rect.width, rect.height,
                                         -origin.x, -origin.y, rect.width, rect.height);
        }
        //restore the canvas context
        this.canvasContext.restore();
    };
    //We add the Canvas2d object to the brain namespace.
    brain.Canvas2d = new Canvas2d_prototype();
    return brain;
})(brain || {});

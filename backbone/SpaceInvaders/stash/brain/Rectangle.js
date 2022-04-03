"using strict";
/*
    A simple Rectangle class that has no uses currently, but will come in use
    later when we are required to create 3 rectangles within the game area
    as specified by the system requirement specification.
*/
var brain = (function (brain)
{
    //Simple constructor.
    function Rectangle (x, y, width, height)
    {
        this.x = typeof x === 'undefined' ? 0 : x;
        this.y = typeof y === 'undefined' ? 0 : y;
        this.width = typeof width === 'undefined' ? 0 : width;
        this.height = typeof height === 'undefined' ? 0 : height;
    }

    //Add the class into the namespace. 
    brain.Rectangle = Rectangle;
    return brain;
})(brain || {});

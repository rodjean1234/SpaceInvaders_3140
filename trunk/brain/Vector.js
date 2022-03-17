"using strict";

//Very simple vector class that will be used throughout our namsepace,
//hence we add it to our namespace.
//The code is very simplistic and self-explanatory so not a lot of comments.
var brain = (function (brain)
{
    function Vector2(x, y)
    {
        this.x = typeof x === 'undefined' ? 0 : x;
        this.y = typeof y === 'undefined' ? 0 : y;
    }
    Object.defineProperty(Vector2.prototype, "isZero",
        {
            get: function ()
            {
                return this.x == 0 && this.y == 0;
            }
        });
    Vector2.prototype.addToMe = function (vec)
    {
        if (vec.constructor === Vector2)
        {
            this.x += vec.x;
            this.y += vec.y;
        }
        else if (vec.constructor === Number)
        {
            this.x += vec;
            this.y += vec;
        }
        return this;
    }
    Vector2.prototype.add = function (vec)
    {
        var temp = this.copy();
        return temp.addToMe(vec);
    }
    Vector2.prototype.subFromMe = function (vec)
    {
        if (vec.constructor === Vector2)
        {
            this.x -= vec.x;
            this.y -= vec.y;
        }
        else if (vec.constructor === Number)
        {
            this.x -= vec;
            this.y -= vec;
        }
        return this;
    }
    Vector2.prototype.sub = function (vec)
    {
        var temp = this.copy();
        return temp.subFromMe(vec);
    }
    Vector2.prototype.multMeBy = function (vec)
    {
        if (vec.constructor === Vector2)
        {
            this.x *= vec.x;
            this.y *= vec.y;
        }
        else if (vec.constructor === Number)
        {
            this.x *= vec;
            this.y *= vec;
        }
        return this;
    }
    Vector2.prototype.mult = function (vec)
    {
        var temp = this.copy();
        return temp.multMeBy(vec);
    }
    Vector2.prototype.divMeBy = function (vec)
    {
        if (vec.constructor === Vector2)
        {
            this.x /= vec.x;
            this.y /= vec.y;
        }
        else if (vec.constructor === Number)
        {
            this.x /= vec;
            this.y /= vec;
        }
        return this;
    }
    Vector2.prototype.mult = function (vec)
    {
        var temp = this.copy();
        return temp.multMeBy(vec);
    }
    Vector2.prototype.copy = function ()
    {
        return new Vector2(this.x, this.y);
    }
    Vector2.prototype.equals = function (vec)
    {
        if (vec.constructor === Vector2)
        {
            return this.x === vec.x && this.y === vec.y;
        }
        else if (vec.constructor === Number)
        {
            return this.x === vec && this.y === y;
        }
    }
    Vector2.prototype.toString = function ()
    {
        return "(" + this.x + ", " + this.y + ")";
    }
    //Add the Vector2 class to the namespace. 
    brain.Vector2 = Vector2;
    return brain;
})(brain || {});

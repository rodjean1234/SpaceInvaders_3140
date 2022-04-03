"using strict";

var brain = (function (brain)
{
    function HandleKeyDown(evt)
    {
        if (evt.keyCode == 37)
        {
            this.left_key_is_down = true;
            gameObjs.Player.move(15, "left");
        }
        else if (evt.keyCode == 39)
        {
            this.right_key_is_down = true;
            gameObjs.Player.move(15, "right");
        }
    }
    function HandleKeyUp(evt)
    {
        if (evt.keyCode == 37)
        {
            this.left_key_is_down = false;
        }
        else if (evt.keyCode == 39)
        {
            this.right_key_is_down = false;
        }
    }
    function Keyboard_prototype ()
    {
        this.left_key_is_down = false;
        this.right_key_is_down = false;

        document.onkeydown = HandleKeyDown;
        document.onkeyup = HandleKeyUp;
    }
    Keyboard_prototype.prototype.down = function (key) {
        if (key == 39)
            return this.right_key_is_down;
        else if (key == 37)
            return this.left_key_is_down;
    };

    brain.Keyboard = new Keyboard_prototype();
    return brain;
})(brain || {});

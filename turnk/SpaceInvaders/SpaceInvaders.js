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

brain.Game.start('gameArea', 'gameCanvas', 1440, 825);

brain.Game.mainLoop();

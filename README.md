jQuery Game Loop and Super Lightweight HTML5 Game Engine
========================================================

This GameLoop maintains a constant game speed with maximum FPS.

On slow hardware, the display FPS will drop, but the game will maintain the tick frequency and will provide that to your game world.
The game runs seamlessly on fast hardware, with the maximum FPS you have set.


INSTALL
=======

To see a live demo, go to: http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/

This package contains the Game Loop and a sample Game World that you can use to develop your game.

Your Game World object maintains all the states and entities of your game. In this there will be three main functions to:
* update the game (with n tick) 
* display the game's actual state
* handle user input

The Game Loop provides a cycle that will call the world's update and display functions with the FPS set.

Install instructions in this package at demo.html


LICENSE
=======

Use it as is. Show me if you did something cool.

This code uses the jQuery Javascript library. To read more about it, go to http://jquery.com/


ABOUT
=====

Richard Dancsi
blog: http://www.wimagguc.com/
twitter: http://twitter.com/wimagguc
linkedin: http://linkedin.com/in/richarddancsi
gplus: https://plus.google.com/u/0/115939246085616544919

Zenfield Ltd.
http://zenfield.com/

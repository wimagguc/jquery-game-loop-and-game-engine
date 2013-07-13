# jQuery Game Loop and Super Lightweight HTML5 Game Engine

This GameLoop maintains a constant game speed with maximum FPS.

On slow hardware, the display FPS will drop, but the game will maintain the tick frequency and will provide that to your game world.
The game runs seamlessly on fast hardware, with the maximum FPS you have set.

## Install

To see a live demo, go to:
[www.wimagguc.com/projects/jquery-game-loop-and-game-engine/](http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/)

This package contains the Game Loop and a sample Game World that you can use to develop your game.

Your Game World object maintains all the states and entities of your game. In this there will be three main functions to:

* update the game (with n tick) 
* display the game's actual state
* handle user input

The Game Loop provides a cycle that will call the world's update and display functions with the FPS set.

For install instructions, see `demo.html` in this package.

## Pacman

I added a playable, one-level version of pacman to the /pacman folder, written in jQuery, using this game engine. It has no monsters yet, all you can do is to collect the dots :)

To try it out live, go to:
[www.wimagguc.com/projects/jquery-game-loop-and-game-engine/pacman/](http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/pacman/)

This is for demonstration purposes only, to show how the game loop can be used for creating an actual game. If you want to use the code, feel free to do so - but please be aware that you probably need a license to publish such a game.

## License

Use it as is, show me if you did something cool. Also, feel free to push back anything you think is useful for the project.

This code uses the jQuery Javascript library. To read more about it, go to [jquery.com/](http://jquery.com/)


## About

Richard Dancsi  
[www.wimagguc.com](http://www.wimagguc.com/)  

twitter: [@wimagguc](http://twitter.com/wimagguc)  
linkedin: [linkedin.com/in/richarddancsi](http://linkedin.com/in/richarddancsi)  
gplus: [plus.google.com/u/0/115939246085616544919](https://plus.google.com/u/0/115939246085616544919)  

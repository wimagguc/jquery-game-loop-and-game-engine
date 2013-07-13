/**
 * 	
 * This is a demo game world for the game loop above: describes a game world, updates and 
 * displays it whenever the updateWorld and displayWorld triggers have been called. 
 * 
 * ------------------- 
 * A JQUERY GAME LOOP AND SUPER LIGHTWEIGHT GAME ENGINE
 * ------------------- 
 * DEMO & INSTALL
 * http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/
 * ------------------- 
 * By Richard Dancsi in 2012
 * blog: wimagguc.hu, twitter: @wimagguc
 * License: use it as is. Show me if you did something cool.
 * ------------------- 
 */
var Wimagguc = this.Wimagguc || {};

Wimagguc.DemoWorld = (function() {

	var pacmanEntity = new Wimagguc.PacmanEntity();
	var canvasHandler = new Wimagguc.DemoWorldCanvas();			

	var _self = this;

	///////////////////////////////////////////////////////////////////////////////////////////////
	// SETUP
	_self.params = {
		CANVAS_WIDTH : 500,
		CANVAS_HEIGHT : 300,
		pacman : new pacmanEntity.Pacman({
			name  : 'P',
			x     : 50,
			y     : 120,
			speed : 0.11,
			size  : 10
		})
	};

	///////////////////////////////////////////////////////////////////////////////////////////////

	// PARAMETERS USED BY THE CLASS (should not be modified)
	_self.vars = {
		pacman : _self.params.pacman
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS VISIBLE FOR PUBLIC
	return {

		// INITIALIZE THE GAME
		init: function(containerID, gameLoopID, frameRate) {
			_self.vars.gameLoopID = gameLoopID;
			_self.vars.frameRate = frameRate;

			canvasHandler.init(containerID, _self.params.CANVAS_WIDTH, _self.params.CANVAS_HEIGHT);
			canvasHandler.clear();

			$('body').bind('updateGame',  this.updateWorld );
			$('body').bind('displayGame', this.displayWorld );
			$('body').bind('keydown',     this.directionChange );

			_self.vars.lastTick = 0;
		},

		// UPDATE THE WORLD'S CURRENT STATE
		updateWorld: function(e, params) {
			if (_self.vars.gameLoopID != params.gameID) { return; } // Check if this event is for another World

			// Count how many ticks elapsed since last update; maybe we need to update the world with multiple or no ticks. 
			var ticksElapsed = Math.round( (params.currentGameTick - _self.vars.lastTick));
			_self.vars.lastTick = params.currentGameTick;

			// Update the position of pacman
			var newX = _self.vars.pacman.x();
			var newY = _self.vars.pacman.y();
	
			if (_self.vars.pacman.direction() == pacmanEntity.Direction.LEFT) {
				newX -= ticksElapsed * _self.vars.pacman.speed();
				newX = ( newX + _self.params.CANVAS_WIDTH ) % _self.params.CANVAS_WIDTH;
			}
			else if (_self.vars.pacman.direction() == pacmanEntity.Direction.RIGHT) {
				newX += ticksElapsed * _self.vars.pacman.speed();
				newX = ( newX + _self.params.CANVAS_WIDTH ) % _self.params.CANVAS_WIDTH;
			}
			else if (_self.vars.pacman.direction() == pacmanEntity.Direction.UP) {
				newY -= ticksElapsed * _self.vars.pacman.speed();
				newY = ( newY + _self.params.CANVAS_HEIGHT ) % _self.params.CANVAS_HEIGHT;
			}
			else if (_self.vars.pacman.direction() == pacmanEntity.Direction.DOWN) {
				newY += ticksElapsed * _self.vars.pacman.speed();
				newY = ( newY + _self.params.CANVAS_HEIGHT ) % _self.params.CANVAS_HEIGHT;
			}

			_self.vars.pacman.setX(newX);
			_self.vars.pacman.setY(newY);

			_self.vars.lastDirection = _self.vars.pacman.direction();
			// ^^^
	
			// Some animation for pacman
			_self.vars.pacman.shiftAnimationPhase(ticksElapsed, _self.vars.frameRate);
		},

		// DISPLAY THE WORLD'S CURRENT STATE
		displayWorld: function(e, params) {
			if (_self.vars.gameLoopID != params.gameID) { return; } // Check if this event is for another World

			canvasHandler.clear();
			canvasHandler.drawPacman(_self.vars.pacman);
		},
		
		// PACMAN RELATED FUNCTIONS
		directionChange: function(e) {
			_self.vars.lastDirection = _self.vars.pacman.direction();
		    switch (e.keyCode) {
		        case 65: // left: 37 
		            _self.vars.pacman.setDirection(pacmanEntity.Direction.LEFT);
		            break;
		        case 87: // up: 38 
		            _self.vars.pacman.setDirection(pacmanEntity.Direction.UP);
		            break;
		        case 68: // right: 39
		            _self.vars.pacman.setDirection(pacmanEntity.Direction.RIGHT);
		            break;
		        case 83: // down: 40
					_self.vars.pacman.setDirection(pacmanEntity.Direction.DOWN);
		            break;
            }
		},

		// PACMAN RELATED FUNCTIONS
		directionChangeWithButtons: function(directionID) {
			_self.vars.lastDirection = _self.vars.pacman.direction();
		    switch (directionID) {
		        case 1:
		            _self.vars.pacman.setDirection(pacmanEntity.Direction.LEFT);
		            break;
		        case 2:
		            _self.vars.pacman.setDirection(pacmanEntity.Direction.RIGHT);
		            break;
		        case 3:
		            _self.vars.pacman.setDirection(pacmanEntity.Direction.UP);
		            break;
		        case 4:
					_self.vars.pacman.setDirection(pacmanEntity.Direction.DOWN);
		            break;
            }
		}
	};

});

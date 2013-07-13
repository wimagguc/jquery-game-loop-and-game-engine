/**
 * 	
 * This is a game world for Pacman, using wimagguc's game engine: describes the 
 * game world for pacman, updates and displays it whenever the updateWorld and
 * displayWorld triggers have been called. 
 * 
 * ------------------- 
 * A JQUERY GAME LOOP AND SUPER LIGHTWEIGHT GAME ENGINE
 * ------------------- 
 * GAMELOOP DEMO & INSTALL
 * http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/
 *	
 * PACMAN DEMO
 * http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/pacman/
 * ------------------- 
 * By Richard Dancsi in 2012
 * blog: www.wimagguc.com, twitter: @wimagguc
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
		CANVAS_WIDTH : 476,
		CANVAS_HEIGHT : 573
	};

	///////////////////////////////////////////////////////////////////////////////////////////////

	// PARAMETERS USED BY THE CLASS (should not be modified)
	_self.vars = {
		pacman : new pacmanEntity.Pacman({
			name  : 'P',
			x     : 30,
			y     : 30,
			speed : 0.13,
			size  : 5
		}),
		pacman2 : new pacmanEntity.Pacman({
			name  : 'P',
			x     : 50,
			y     : 220,
			speed : 1.9,
			size  : 8
		}),
		mLines : [
			// row 1, horizontal lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 30,  length: 182, vertical: false }),
			new pacmanEntity.MagnetLine({ x : 262, y : 30,  length: 182, vertical: false }),
			// row 1, vertical lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 30,  length: 118, vertical: true }),
			new pacmanEntity.MagnetLine({ x : 112, y : 30,  length: 423, vertical: true }),
			new pacmanEntity.MagnetLine({ x : 212, y : 30,  length: 68,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 262, y : 30,  length: 68,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 362, y : 30,  length: 423, vertical: true }),
			new pacmanEntity.MagnetLine({ x : 444, y : 30,  length: 118, vertical: true }),
			// row 2, horizontal line
			new pacmanEntity.MagnetLine({ x : 30,  y : 98,  length: 415, vertical: false }),
			// row 2, vertical lines
			new pacmanEntity.MagnetLine({ x : 162, y : 98,  length: 50,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 311, y : 98,  length: 50,  vertical: true }),
			// row 3, horizontal lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 148, length: 82,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 162, y : 148, length: 50,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 262, y : 148, length: 50,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 362, y : 148, length: 83,  vertical: false }),
			// row 3, vertical lines
			new pacmanEntity.MagnetLine({ x : 212, y : 148, length: 53,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 262, y : 148, length: 53,  vertical: true }),
			// row 4, horizontal line
			new pacmanEntity.MagnetLine({ x : 162, y : 200, length: 150, vertical: false }),
			// row 4, vertical lines
			new pacmanEntity.MagnetLine({ x : 162, y : 200, length: 152, vertical: true }),
			new pacmanEntity.MagnetLine({ x : 312, y : 200, length: 152, vertical: true }),
			// row 5, horizontal lines
			new pacmanEntity.MagnetLine({ x : 112, y : 250, length: 51, vertical: false }),
			new pacmanEntity.MagnetLine({ x : 312, y : 250, length: 51, vertical: false }),
			// row 6, horizontal line
			new pacmanEntity.MagnetLine({ x : 162, y : 300, length: 150, vertical: false }),
			// row 7, horizontal lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 351, length: 182, vertical: false }),
			new pacmanEntity.MagnetLine({ x : 262, y : 351, length: 181, vertical: false }),
			// row 7, vertical lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 351, length: 51,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 212, y : 351, length: 51,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 262, y : 351, length: 51,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 444, y : 351, length: 51,  vertical: true }),
			// row 8, horizontal lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 401, length: 32,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 112, y : 401, length: 250, vertical: false }),
			new pacmanEntity.MagnetLine({ x : 412, y : 401, length: 32,  vertical: false }),
			// row 8, vertical lines
			new pacmanEntity.MagnetLine({ x : 62,  y : 401, length: 52,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 162, y : 401, length: 52,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 312, y : 401, length: 52,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 412, y : 401, length: 52,  vertical: true }),
			// row 9, horizontal lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 452, length: 83,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 162, y : 452, length: 50,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 262, y : 452, length: 50,  vertical: false }),
			new pacmanEntity.MagnetLine({ x : 362, y : 452, length: 83,  vertical: false }),
			// row 9, vertical lines
			new pacmanEntity.MagnetLine({ x : 30,  y : 452, length: 51,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 212, y : 452, length: 51,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 262, y : 452, length: 51,  vertical: true }),
			new pacmanEntity.MagnetLine({ x : 444, y : 452, length: 51,  vertical: true }),
			// row 10, horizontal line
			new pacmanEntity.MagnetLine({ x : 30, y : 502, length: 415, vertical: false })
		],
		mDots : [],
		gameState : {}
	};
	
	// 
	// PRIVATE FUNCTIONS
	
	_self.getTouchedLines = function(x, y, snap) {
		// check if the new x, y is illegal: it should touch at least one line
		var touchedLines = [];
		for (var i=0; i<_self.vars.mLines.length; i++) {
			var lineX = _self.vars.mLines[i].x() - snap;
			var lineY = _self.vars.mLines[i].y() - snap;
			var lineW = lineX + snap*2 + (_self.vars.mLines[i].vertical() ? 0 : _self.vars.mLines[i].length());
			var lineH = lineY + snap*2 + (_self.vars.mLines[i].vertical() ? _self.vars.mLines[i].length() : 0);

			if (lineX < x && x < lineW && lineY < y && y < lineH) {
				touchedLines.push(i);
			}
		}
		return touchedLines;
	},
	
	_self.changePacmanDirection = function(pacman, direction) {
		var touchedLines = _self.getTouchedLines(pacman.x(), pacman.y(), 2);
		for (var i=0; i<touchedLines.length; i++) {
			var line = _self.vars.mLines[ touchedLines[i] ];
			if (line.vertical() && (direction == pacmanEntity.Direction.UP || direction == pacmanEntity.Direction.DOWN)) {
				// TODO fix this
				// if ( pamcan.y() < line.y() || pamcan.y() > (line.y() + line.length()) ) {
				// 	newY = line.y() + line.length();
				// }
				pacman.setDirection(direction);
				return true;
			}
			else if (!line.vertical() && (direction == pacmanEntity.Direction.LEFT || direction == pacmanEntity.Direction.RIGHT)) {
				pacman.setDirection(direction);
				return true;
			}
		}
		// TODO if we are close enough?
		_self.vars.autoChangePacmanDirection = {'pacman': pacman, 'direction': direction};
		return false;
	},
	
	_self.autoUpdatePacmanPosition = function(ticksElapsed, pacman) {
		var newX = pacman.x();
		var newY = pacman.y();

		if (pacman.direction() == pacmanEntity.Direction.LEFT) {
			newX -= ticksElapsed * pacman.speed();
			newX = (newX + _self.params.CANVAS_WIDTH ) % _self.params.CANVAS_WIDTH;
		} else if (pacman.direction() == pacmanEntity.Direction.RIGHT) {
			newX += ticksElapsed * pacman.speed();
			newX = (newX + _self.params.CANVAS_WIDTH ) % _self.params.CANVAS_WIDTH;
		} else if (pacman.direction() == pacmanEntity.Direction.UP) {
			newY -= ticksElapsed * pacman.speed();
			newY = (newY + _self.params.CANVAS_HEIGHT ) % _self.params.CANVAS_HEIGHT;
		} else if (pacman.direction() == pacmanEntity.Direction.DOWN) {
			newY += ticksElapsed * pacman.speed();
			newY = (newY + _self.params.CANVAS_HEIGHT ) % _self.params.CANVAS_HEIGHT;
		}

		var touchedLines = _self.getTouchedLines(newX, newY, 10);

		// snapping
		if (touchedLines.length > 0) {
			for (var i=0; i<touchedLines.length; i++) {
				var line = _self.vars.mLines[ touchedLines[i] ];
				if (line.vertical() && (pacman.direction() == pacmanEntity.Direction.UP || pacman.direction() == pacmanEntity.Direction.DOWN)) {
					newX = line.x();
					if ( newY < line.y() ) {
						newY = line.y();
					} else if ( newY > (line.y() + line.length()) ) {
						newY = line.y() + line.length();
					}
				}
				else if (!line.vertical() && (pacman.direction() == pacmanEntity.Direction.LEFT || pacman.direction() == pacmanEntity.Direction.RIGHT)) {
					newY = line.y();
					if ( newX < line.x() ) {
						newX = line.x();
					} else if ( newX > (line.x() + line.length()) ) {
						newX = line.x() + line.length();
					}
				}
			}
			pacman.setX(newX);
			pacman.setY(newY);
		}

		if (_self.vars.autoChangePacmanDirection) {
			var success = _self.changePacmanDirection(_self.vars.autoChangePacmanDirection.pacman, _self.vars.autoChangePacmanDirection.direction);
			if (success) {
				_self.vars.autoChangePacmanDirection = 0;
			}
		}

	};
	
	_self.checkState = function() {
		var pacmanX = _self.vars.pacman.x();
		var pacmanY = _self.vars.pacman.y();

		var points = 0;

		for (var i=0; i<_self.vars.mDots.length; i++) {
			var dotX = _self.vars.mDots[i].x();
			var dotY = _self.vars.mDots[i].y();
			var snap = 3;
			if (pacmanX > dotX-snap && pacmanX < dotX+snap && pacmanY > dotY-snap && pacmanY < dotY+snap) {
				_self.vars.mDots[i].setVisible(false);
			}
			if (!_self.vars.mDots[i].visible()) {
				++points;
			}
		}

		_self.vars.gameState.points = points;
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

			$('body').bind('updateGame',  this.updateWorld);
			$('body').bind('displayGame', this.displayWorld);
			$('body').bind('keydown',     this.directionChange);

			for (var i=0; i<_self.vars.mLines.length; i++) {
				var line = _self.vars.mLines[i];
				var x = _self.vars.mLines[i].x();
				var y = _self.vars.mLines[i].y();
				for (var j=0; j<line.length(); j+=23) {
					var dot;
					if (line.vertical()) {
						dot = new pacmanEntity.Dot({ x : x,  y : y+j, visible: true });
					} else if (j >= 23 && j<(line.length()-23) ) {
						dot = new pacmanEntity.Dot({ x : x+j,  y : y, visible: true });
					}
					if (dot) {
						_self.vars.mDots.push(dot);
					}
				}
			}

			_self.vars.lastTick = 0;
		},

		// UPDATE THE WORLD'S CURRENT STATE
		updateWorld: function(e, params) {
			if (_self.vars.gameLoopID != params.gameID) { return; } // Check if this event is for another World

			// Count how many ticks elapsed since last update; maybe we need to update the world with multiple or no ticks. 
			var ticksElapsed = Math.round( (params.currentGameTick - _self.vars.lastTick));

			_self.vars.lastTick = params.currentGameTick;

			var tmpTick = 0;
			while (tmpTick<=ticksElapsed) {
				tmpTick += 1;
				_self.autoUpdatePacmanPosition(1, _self.vars.pacman);
				_self.checkState();
			}

			// _self.autoUpdatePacmanPosition(ticksElapsed, _self.vars.pacman);
			// multiplayer later on
			// _self.autoUpdatePacmanPosition(ticksElapsed, _self.vars.pacman2);

			// Some animation for pacman
			_self.vars.pacman.shiftAnimationPhase(ticksElapsed, _self.vars.frameRate);
			_self.vars.pacman2.shiftAnimationPhase(ticksElapsed, _self.vars.frameRate);
		},

		// DISPLAY THE WORLD'S CURRENT STATE
		displayWorld: function(e, params) {
			if (_self.vars.gameLoopID != params.gameID) { return; } // Check if this event is for another World

			canvasHandler.clear();

			for (var i=0; i<_self.vars.mLines.length; i++) {
				canvasHandler.drawMagnetLine(_self.vars.mLines[i]);
			}

			for (var i=0; i<_self.vars.mDots.length; i++) {
				if (_self.vars.mDots[i].visible()) {
					canvasHandler.drawDot(_self.vars.mDots[i]);
				}
			}

			canvasHandler.showPoints(_self.vars.gameState.points);
			
			if (!_self.vars.gameState.winner && _self.vars.gameState.points == _self.vars.mDots.length) {
				canvasHandler.showWinner("you");
				_self.vars.gameState.winner = true; 
			}

			canvasHandler.drawPacman(_self.vars.pacman);
			// canvasHandler.drawPacman(_self.vars.pacman2);
		},
		
		// PACMAN RELATED FUNCTIONS
		directionChange: function(e) {
		    switch (e.keyCode) {
		        case 37:
		            _self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.LEFT);
		            break;
		        case 38:
		            _self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.UP);
		            break;
		        case 39:
		            _self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.RIGHT);
		            break;
		        case 40:
					_self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.DOWN);
		            break;
            }
		},

		// PACMAN RELATED FUNCTIONS
		directionChangeWithButtons: function(directionID) {
		    switch (directionID) {
		        case 1:
		        	_self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.LEFT);
		            break;
		        case 2:
		            _self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.RIGHT);
		            break;
		        case 3:
		            _self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.UP);
		            break;
		        case 4:
					_self.changePacmanDirection(_self.vars.pacman, pacmanEntity.Direction.DOWN);
		            break;
            }
		},
		
		// MULTIPLAYER UPDATE
		updateMultiplayers: function(data) {
			data = JSON.parse(data);
			if (data) {
				_self.changePacmanDirection(_self.vars.pacman2, data.data[0].content.direction);
			}
		}
	};

});

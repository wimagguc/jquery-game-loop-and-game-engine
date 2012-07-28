/**
 * 	
 * A JQUERY GAME LOOP AND SUPER LIGHTWEIGHT GAME ENGINE
 * version 1.0
 * 
 * This GameLoop maintains a constant game speed with maximum FPS.
 *
 * On slow hardware, the display FPS will drop, but the game will maintain the tick frequency
 * and will provide that to your game world.
 * The game runs seamlessly on fast hardware, with the maximum FPS you have set.
 *  
 * ------------------- 
 * DEMO & INSTALL
 *
 * http://wimagguc.hu/projects/jquery-game-loop-and-game-engine/
 *  
 * ------------------- 
 * USAGE
 * 
 * Public functions
 *   start()     > starts or restarts the current game loop; at the first start it returns an
 *                 unique ID to the game
 *   stop()      > stops the current game loop; with the start() function the game continues
 *                 right where it was left off
 *   isRunning() > returns a boolean that shows whether the game currently is running 
 *
 * Event Handlers:
 *   updateGame  > to trigger your World's update function; params: {gameID, currentGameTick}
 *   displayGame > to trigger your World's display function; params: {gameID, currentGameTick}
 *
 * Initialize
 *   FRAME_PER_SECONDS is the max FPS you want to support. Set the MAX_REFRESH_RATE accordingly,
 *   to provide the best experience
 *
 * ------------------- 
 * By Richard Dancsi in 2012
 * blog: wimagguc.hu, twitter: @wmguk
 *
 * License: use it as is. Show me if you did something cool.
 * ------------------- 
 */
var Wimagguc = this.Wimagguc || {};

Wimagguc.GameLoop = (function(FRAME_PER_SECOND) {

	var _self = this;

	// SETUP
	_self.params = {
	    'MAX_REFRESH_RATE' : (1000 / 2 / FRAME_PER_SECOND) // Milliseconds. The game will run no faster than this; set it according to the supported devices
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PARAMETERS USED BY THIS CLASS (should not be modified)
	_self.vars = {
		'start_game_time' : new Date().getTime(),
	    'skip_milliseconds' : (1000 / FRAME_PER_SECOND),
	    'is_running' : false,
	    'next_game_tick' : 0,
	    'last_paused_at' : 0,
	    'all_paused_time' : 0,
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PRIVATE FUNCTIONS
	
	// THE GAME LOOP
	_self.gameLoop = function() {
		_self.pauseCount();

		if (_self.vars.is_running) {
			var gameStartTick   = _self.vars.start_game_time - _self.vars.all_paused_time;
			var currentGameTick = new Date().getTime() - gameStartTick;

	        if ( currentGameTick > _self.vars.next_game_tick) {
				_self.countRealFPS();
	            _self.updateGame(currentGameTick);
				_self.displayGame(currentGameTick);
				_self.vars.next_game_tick = _self.vars.skip_milliseconds * (Math.floor(currentGameTick / _self.vars.skip_milliseconds) + 1);
	    	}

   			setTimeout(function(){ _self.gameLoop() }, _self.params.MAX_REFRESH_RATE);
		}
	};

	// INCREASE THE all_paused_time DURING THE GAME IS STOPPED
	_self.pauseCount = function() {
		// The game is running and it has been paused before -> increase the all_paused_time
		// so that the currengGameTick can be adjusted
		if (_self.vars.is_running && _self.vars.last_paused_at) {
			var lastPausedDuration = new Date().getTime() - _self.vars.last_paused_at;
			if (lastPausedDuration) {
				_self.vars.all_paused_time += lastPausedDuration;
			}
			_self.vars.last_paused_at = 0;
		}
		
		// The game is not running and wasn't paused before -> put it into paused mode and set its start date
		if (!_self.vars.is_running && !_self.vars.last_paused_at) {
			 _self.vars.last_paused_at = new Date().getTime();
		}
	};
	
	// FUNCTION TO COUNT THE CURRENT VISIBLE SPEED OF THE GAME
	_self.countRealFPS = function() {
		var currentSeconds = Math.floor(new Date().getTime() / 1000);
		if (_self.vars.real_fps_second == currentSeconds) {
			_self.vars.real_fps_ticks++;
		} else {
			_self.vars.real_fps_currentValue = _self.vars.real_fps_ticks; 
			_self.vars.real_fps_ticks = 0;
		}
		_self.vars.real_fps_second = currentSeconds;
		$('#realFPSDump').text(_self.vars.real_fps_currentValue);
	};

	// FUNCTION TO UPDATE GAME
	// triggers event 'updateGame' with the game loop's ID
	_self.updateGame = function(currentGameTick) {
		$('body').trigger('updateGame', {'gameID': _self.vars.ID, 'currentGameTick': currentGameTick});
	};

	// FUNCTION TO DISPLAY GAME
	// triggers event 'displayGame' with the game loop's ID
	_self.displayGame = function(currentGameTick) {
		$('body').trigger('displayGame', {'gameID': _self.vars.ID, 'currentGameTick': currentGameTick});
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS VISIBLE FOR PUBLIC
	return {
		// START OR RESUME THE GAME LOOP
		start: function() {
			// if the game loop has never been started yet, we generate a random ID. this is needed for triggering
			// the events from outer objects (if you have more than one objects using a game loop on the page)
			if (!_self.vars.ID) { _self.vars.ID = Math.floor(Math.random()*10000000); }

			if (!_self.vars.is_running) {
				_self.vars.is_running = true;
				_self.gameLoop();
			}

			return _self.vars.ID;
		},

		// STOP THE GAME LOOP
		stop: function() {
			_self.vars.is_running = false;
			_self.gameLoop();
		},

		// RETURNS IF THE GAMELOOP IS RUNNING
		isRunning: function() {
			return _self.vars.is_running;
		}
	};

});

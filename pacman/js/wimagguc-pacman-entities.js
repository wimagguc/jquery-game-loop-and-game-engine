/**
 * 	
 * This is a helper object for the demo game world: describes the Direction and Pacman objects
 * 
 * ------------------- 
 * A JQUERY GAME LOOP AND SUPER LIGHTWEIGHT GAME ENGINE
 * ------------------- 
 * DEMO & INSTALL
 * http://www.wimagguc.com/projects/jquery-game-loop-and-game-engine/pacman/
 * ------------------- 
 * By Richard Dancsi in 2012
 * blog: www.wimagguc.com, twitter: @wimagguc
 * License: use it as is. Show me if you did something cool.
 * ------------------- 
 */
var Wimagguc = this.Wimagguc || {};

Wimagguc.PacmanEntity = (function() {

	///////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS VISIBLE FOR PUBLIC
	var publicFunc = {

		// ENTITY: DIRECTION ('ENUM')
		Direction : {
			LEFT: 'left',
			RIGHT: 'right',
			UP: 'up',
			DOWN: 'down'
		},
		
		MagnetLine : function(params) {
			var entity = {
				x        : params.x ? params.x : 0, 
				y        : params.y ? params.y : 0,
				length   : params.length ? params.length : 0,
				vertical : params.vertical ? params.vertical : 0
			}
			var functions = {};
			
			functions.x        = function() { return entity.x; }
			functions.y        = function() { return entity.y; }
			functions.length   = function() { return entity.length; }
			functions.vertical = function() { return entity.vertical; }
			
			return functions;
		},

		Dot : function(params) {
			var entity = {
				x       : params.x ? params.x : 0, 
				y       : params.y ? params.y : 0,
				visible : params.visible ? params.visible : false
			}
			var functions = {};
			
			functions.x          = function() { return entity.x; }
			functions.y          = function() { return entity.y; }
			functions.visible    = function() { return entity.visible; }
			functions.setVisible = function(visible) { entity.visible = visible; }
			
			return functions;
		},

		// ENTITY: PACMAN ('CLASS')
		Pacman : function(params) {
			var entity = {
				type      : "pacman",
				name      : params.name ? params.name : "Pacman",
				x         : params.x ? params.x : 0,
				y         : params.y ? params.y : 0,
				speed     : params.speed ? params.speed : 1,
				size      : params.size ? params.size : 1,
				direction : publicFunc.Direction.RIGHT,
				anim_curr_phase : 1,
				anim_curr_ticks : 1,
				anim_left_max   : 5, // set this...
				anim_right_max  : 5  // ...and this according to animation phases you have on pacman
			};

			var functions = {};

			functions.x = function() { return entity.x; }
			functions.y = function() { return entity.y; }
			functions.direction = function() { return entity.direction; }
			functions.speed = function() { return entity.speed; }
			functions.size = function() { return entity.size; }
			functions.anim_curr_phase = function() { return entity.anim_curr_phase ? entity.anim_curr_phase : 1; }

			functions.setX = function(x) { entity.x = x; }
			functions.setY = function(y) { entity.y = y; }
			functions.setDirection = function(direction) { entity.direction = direction; }
			functions.setSpeed = function(speed) { entity.speed = speed; }

			functions.shiftAnimationPhase = function(ticks, frameRate) {
				var maxPhase;

				if (entity.direction == publicFunc.Direction.RIGHT) {
					maxPhase = entity.anim_right_max;
				} else {
					maxPhase = entity.anim_left_max;
				}

				entity.anim_curr_ticks += ticks / frameRate * 7;
				
				if (entity.anim_curr_ticks > frameRate) { entity.anim_curr_ticks = 1; }

				entity.anim_curr_phase = Math.round(entity.anim_curr_ticks / frameRate * maxPhase);

				if (entity.anim_curr_phase > maxPhase) { entity.anim_curr_phase = 1; }
				if (entity.anim_curr_phase < 1) { entity.anim_curr_phase = 1; }
			}

			return functions;
		}

	};

	return publicFunc;

});

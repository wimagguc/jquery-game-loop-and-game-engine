/**
 * 	
 * This is a helper object for the demo game world: handles all canvas related functions (create
 * canvas, clear canvas, draw pacman to canvas)
 * 
 * -------------------
 * A JQUERY GAME LOOP AND SUPER LIGHTWEIGHT GAME ENGINE
 * -------------------
 * DEMO & INSTALL
 * http://wimagguc.hu/projects/jquery-game-loop-and-game-engine/
 * -------------------
 * By Richard Dancsi in 2012
 * blog: wimagguc.hu, twitter: @wmguk
 * License: use it as is. Show me if you did something cool.
 * -------------------
 */
var Wimagguc = this.Wimagguc || {};

Wimagguc.DemoWorldCanvas = function() {

	var _self = this;

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PARAMETERS USED BY THE CLASS (should not be modified)
	_self.vars = {
		'canvasId' : null,
		'res' : {},  // resources
		'ctx' : null // canvas context
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// PRIVATE FUNCTIONS

	_self.initializeImages = function() {
		_self.vars.res.pacmanLeft = new Array();
		for (var i=0; i<=4; i++) {
			_self.vars.res.pacmanLeft[i] = new Image();
			_self.vars.res.pacmanLeft[i].src = 'images/pacman_left_' + (i+1) + '.png';  
		}

		_self.vars.res.pacmanRight = new Array();
		for (var i=0; i<=4; i++) {
			_self.vars.res.pacmanRight[i] = new Image();
			_self.vars.res.pacmanRight[i].src = 'images/pacman_right_' + (i+1) + '.png';  
		}
	};

	///////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS VISIBLE FOR PUBLIC
	return {

		// INITIALIZE
		init: function(canvasId, width, height) {

			// create the canvas
			$('#' + canvasId).html(	"<div style='position: absolute; z-index: 3; top: 0; left: 0; height:" + height + "px; width:" + width + "px;'>" +
									"<canvas id='" + canvasId + "_canvas' width='" + width + "' height='" + height + "'>" +
									"This text is displayed if your browser does not support HTML5 Canvas." +
									"</canvas>" +
									"<div style='position: absolute; z-index: 2; top: 540px; left: 110px; width: 100px; height: 100px;' id='resultBox'></div>" +
									"</div>");

			$('#' + canvasId).css('position', 'relative');
			$('#' + canvasId).css('margin', '0px auto');
			$('#' + canvasId).css('width', width +'px');
			$('#' + canvasId).css('height', height +'px');
			// ^^^

			_self.initializeImages();

			// save the parameters for later
			_self.vars.width    = width;
			_self.vars.height   = height;
			_self.vars.canvasId = canvasId + "_canvas";
			// ^^^

			_self.vars.ctx = document.getElementById(_self.vars.canvasId).getContext('2d');
		},
		
		// CLEAR THE CANVAS (AND REPLACE IT WITH THE BACKGROUND COLOR)
		clear: function() {
			_self.vars.ctx.clearRect(0, 0, _self.vars.width, _self.vars.height);
		},

		// DRAW PACMAN'S CURRENT STATE ON THE SCREEN
		drawPacman: function(pacman) {
			var centerX = pacman.x();
			var centerY = pacman.y();
			var sizePx  = pacman.size() / 100 * _self.vars.width;

			var image;

			if (pacman.direction() == new Wimagguc.PacmanEntity().Direction.RIGHT) {
				image = _self.vars.res.pacmanRight[ pacman.anim_curr_phase() - 1 ];
			} else {
				image = _self.vars.res.pacmanLeft[ pacman.anim_curr_phase() - 1 ];
			}

			_self.vars.ctx.drawImage(image, Math.floor(centerX - sizePx/2), Math.floor(centerY - sizePx/2), sizePx, sizePx);
		},
		
		drawMagnetLine: function(mLine) {
			var x = mLine.x();
			var y = mLine.y();
			var w = mLine.vertical() ? 1 : mLine.length();
			var h = mLine.vertical() ? mLine.length() : 1;
			// _self.vars.ctx.fillRect(x, y, w, h);
		},
		
		drawDot: function(mDot) {
			var x = mDot.x();
			var y = mDot.y();
	        _self.vars.ctx.beginPath();
	        _self.vars.ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
	        _self.vars.ctx.fillStyle = "#cccccc";
	        _self.vars.ctx.fill();
	    },
       
       	showPoints: function(points) {
       		$('#resultBox').html(points);
       	},
       	
       	showWinner: function(winner) {
       		alert("The winner is: " + winner + "!");
       	}

	};

};

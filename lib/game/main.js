ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'game.entities.zombie',
	'game.levels.level0'
)
.defines(function(){

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),


	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.MOUSE1, 'fire' );
		this.loadLevel (LevelLevel0);
		ig.input.initMouse();
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();


		// Add your own drawing code here
		// var x = ig.system.width/2,
			// y = ig.system.height/2;

		// this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
// ig.main( '#canvas', MyGame, 30, 320*6, 64*20, 0.5 );
ig.main( '#canvas', MyGame, 30, 320*4, 240*3, 1 );


});

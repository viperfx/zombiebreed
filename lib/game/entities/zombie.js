ig.module(
    'game.entities.zombie'
)
.requires(
    'impact.entity'
)
.defines(function(){
// Create your own entity, subclassed from ig.Enitity
EntityZombie = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.ACTIVE,

    size: {x: 128, y: 128},
    health: 50,

    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/zombie.png', 128, 128 ),

    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.2, [0,1,2,3] );
        this.addAnim( 'jump', 0.1, [3,4,5] );

        // Call the parent constructor
        this.parent( x, y, settings );
    },

    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.

        if( ig.input.pressed('jump') ) {
            this.vel.y = -100;
            this.currentAnim = this.anims.jump.rewind();
        }else {
            this.currentAnim = this.anims.idle;
        }

        // Call the parent update() method to move the entity
        // according to its physics
        this.parent();
    }
});
});

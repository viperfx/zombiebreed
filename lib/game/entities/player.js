ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
// Create your own entity, subclassed from ig.Enitity
EntityPlayer= ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.ACTIVE,

    size: {x: 64, y: 64},
    health: 50,

    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/hero.png', 64, 64 ),

    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.5, [0] );
        this.addAnim( 'walk', 0.5, [1,2,3] );
        this.addAnim( 'shoot', 0.2, [4,5,0]);
        // this.addAnim( 'idle_nw', 0.2, [32,33,34,35] );
        // this.addAnim( 'idle_n', 0.2, [64,65,66,67] );
        // this.addAnim( 'idle_ne', 0.2, [96,97,98,99] );
        // this.addAnim( 'idle_e', 0.2, [128,129,130,131] );
        // this.addAnim( 'idle_se', 0.2, [160,161,162,163] );
        // this.addAnim( 'idle_s', 0.2, [192,193,194,195] );
        // this.addAnim( 'idle_sw', 0.2, [224,225,226,227] );
        // this.addAnim( 'walk', 0.2, [4,5,6,7,8,9,10,11]);
        // this.addAnim( 'jump', 0.1, [3,4,5] );

        // Call the parent constructor
        this.parent( x, y, settings );
    },

    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        // ig.show('mouse X', ig.input.mouse.x);
        // ig.show('mouse Y', ig.input.mouse.y);
        // ig.show('pos X', this.pos.x);
        // ig.show('pos Y', this.pos.y);
        this.angle = function() {
            return Math.atan2(
                (ig.input.mouse.y) - (this.pos.y + this.size.y/2),
                (ig.input.mouse.x) - (this.pos.x + this.size.x/2)
            );
        };
        if( ig.input.pressed('right') ) {
            this.vel.x = -100;
            this.currentAnim = this.anims.walk;
        }else if( ig.input.state('fire') ) {
            this.currentAnim = this.anims.shoot;
        }else {
            // this.mouseangle((this.angle()/(Math.PI/180)));
            this.currentAnim = this.anims.idle;
        }
        this.currentAnim.angle = this.angle();
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent();
    }
});
});

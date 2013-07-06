ig.module(
    'game.entities.bullet'
)
.requires(
    'impact.entity'
)
.defines(function(){
// Create your own entity, subclassed from ig.Enitity
EntityBullet = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.LITE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    size: {x: 32, y: 30},
    health: 50,

    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/bullet.png', 30, 31 ),

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        // Add animations for the animation sheet
        this.addAnim( 'single', 0.2, [33],true);
        this.currentAnim = this.anims.single;
        this.currentAnim.angle = this.angle;
        // Call the parent constructor

    },

    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        // Call the parent update() method to move the entity
        // according to its physics
        //this.move_toward_coord(ig.input.mouse.x, ig.input.mouse.y);
        this.parent();
    },
    check: function(other) {
        other.receiveDamage(5,this);
        this.kill();
    }
});
});

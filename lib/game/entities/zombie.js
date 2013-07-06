ig.module(
    'game.entities.zombie'
)
.requires(
    'impact.entity',
    'plusplus.helpers.utilsvector2'
)
.defines(function(){
// Create your own entity, subclassed from ig.Enitity
EntityZombie = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    // checkAgainst: ig.Entity.TYPE.A,
    size: {x: 64, y: 64},
    offset: {x:32, y:32},
    health: 50,

    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/zombie.png', 128, 128 ),

    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.2, [36,37,38,39] );
        this.addAnim( 'walk', 0.1, [184,185,186,187,188,189,190,191] );

        // Call the parent constructor
        this.parent( x, y, settings );
    },

    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        var target = ig.copy(ig.game.getEntityByName('target').pos);
        var vVel = ig.utilsvector2.subtract(target, this.pos);
        vVel = ig.utilsvector2.normalize(vVel);
        vVel = ig.utilsvector2.multiplyScalar(vVel, 75);
        this.vel = {x:vVel.x, y:vVel.y};
        this.currentAnim.angle = this.angleTo(ig.game.getEntityByName('target'));
        // this.vel = {x:10, y:10};
        this.currentAnim = this.anims.walk;
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent();
    }
});
});

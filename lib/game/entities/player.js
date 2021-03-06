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
    collides: ig.Entity.COLLIDES.PASSIVE,

    size: {x: 64, y: 64},
    // pivot: {x:18, y:31},
    health: 50,
    name: 'target',
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/hero.png', 64, 64 ),

    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.5, [0] );
        this.addAnim( 'walk', 0.5, [1,2,3] );
        this.addAnim( 'shoot', 1, [4,5]);

        // Call the parent constructor
        this.parent( x, y, settings );
    },

    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        this.angle = function() {
            return Math.atan2(
                (ig.input.mouse.y) - (this.pos.y + this.size.y/2),
                (ig.input.mouse.x) - (this.pos.x + this.size.x/2)
            );
        };
        if( ig.input.state('right') ) {
            this.vel.x = 100;
            this.currentAnim = this.anims.walk;
        }else if( ig.input.state('left') ) {
             this.vel.x = -100;
            this.currentAnim = this.anims.walk;
        }else if( ig.input.state('up') ) {
             this.vel.y = -100;
            this.currentAnim = this.anims.walk;
        }else if( ig.input.state('down') ) {
            this.vel.y = 100;
            this.currentAnim = this.anims.walk;
        }else {
            this.vel.x=0;
            this.vel.y=0;
            this.currentAnim = this.anims.idle;
        }
        if( ig.input.pressed('fire') ) {
            // x+25, y+12.5 for EAST.
            var bullet = ig.game.spawnEntity('EntityBullet', this.pos.x, this.pos.y, {
                vel: this.move_toward_coord(ig.input.mouse.x, ig.input.mouse.y, 300),
                angle: this.angle(),
                offset: {x:-5, y:-12.5}
            });
            this.currentAnim = this.anims.shoot;
        }

        this.currentAnim.pivot = {x:18, y:31};
        this.currentAnim.angle = this.angle();
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent();
    },
    move_toward_coord: function(x, y,bulletSpeed) {
        var distance_x = x - this.pos.x - this.size.x / 2;
        var distance_y = y - this.pos.y - this.size.y / 2;
        var speed = bulletSpeed;
        var velx = (distance_x > 1 ? 1 : -1) * speed * (Math.abs(distance_x) / (Math.abs(distance_x) + Math.abs(distance_y)));
        var vely = (distance_y > 1 ? 1 : -1) * speed * (Math.abs(distance_y) / (Math.abs(distance_x) + Math.abs(distance_y)));
        return {x:velx, y:vely};
    }
});
});

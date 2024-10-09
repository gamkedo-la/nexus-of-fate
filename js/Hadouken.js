// a fireball

var hadoukenSprite = new Image();
hadoukenSprite.src = "images/player_hadouken.png";
hadoukenSprite.onload = function() { this.loaded = true; }

const HADOUKEN_DAMAGE = 45; // slightly less than half damage
const HADOUKEN_SPEED = 0.75; // moves slow because it is very powerful and you only see it for one second

var hadouken = {
    x:-9999,
    y:-9999,
    speed:0,
    fire:function(x,y) {
        console.log("HADOUKEN FIRED at "+x+","+y);
        if (player.hadoukenSound) player.hadoukenSound.play();
        this.x = x;
        this.y = y;
        this.speed = HADOUKEN_SPEED;
    },
    update:function(dt) {
        this.x += this.speed * dt;

        // hitting robot?
        if (this.x > robot.x-50) {

            console.log("HADOUKEN HIT ROBOT!");
            fx.hadouken_hitFX(this.x-150,this.y-100);
            if (robot.robotHurtSound) robot.robotHurtSound.play();
            if (robot.punchHitSound) robot.punchHitSound.play();
            robot.health -= HADOUKEN_DAMAGE;
            this.x = -9999;
            this.y = -9999;
            this.speed = 0;

        }
    },
    draw:function() {
        if (!hadoukenSprite.loaded) return;
        drawBitmapCenteredAtLocationWithRotation(hadoukenSprite, this.x, this.y, 0);
    }
};

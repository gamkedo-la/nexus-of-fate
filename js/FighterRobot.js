// offset robot laser origin so it starts from the eyes
const LASER_SHOOT_OFFSETX = 0;
const LASER_SHOOT_OFFSETY = 64;

class FighterRobot extends Fighter {
  constructor(whichInput, imageSrcs, initialX = 2000, initialY = FLOOR_Y) {
    super(whichInput, imageSrcs, initialX, initialY);
    this.speed = 0;
    this.baseY = FLOOR_Y - 100;
    this.angle = 0;
    this.y = FLOOR_Y;
    this.AI = false;
	this.robot = true;
    this.thrustSound = new Audio('audio/RobotThrust.mp3');

    this.currentAnimation = ANIM_IDLE;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = false;
    this.retreatTime = 0; // Time when retreat started

    this.lasers = [];
    this.lastShotTime = 0;
    this.shotCooldown = 3; // Cooldown time in seconds
    
    this.canShootWhileRunning = true; // Boolean to control shooting
  }
  


  update(deltaTime) {
	let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distanceToPlayer = Math.hypot(dx, dy);
	
	let angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle) * this.speed;
    this.baseY += Math.sin(angle) * this.speed;

    this.angle += 0.05;
    this.y = this.baseY + Math.sin(this.angle) * 20;

    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width) this.x = canvas.width;
    if (this.y < 150) this.y = 150;
    if (this.y > canvas.height - 200) this.y = canvas.height - 200;

    this.lasers.forEach((laser) => {
        laser.update();

        // Check for collision with the opponent
        if (laser.collidesWith(this.opponent)) {
            this.opponent.health -= 1; // Decrease opponent's health by 1
            //screenshake(PLAYER_HIT_SCREENSHAKE_COUNT);
            laser.active = false; // Deactivate the laser
        }
    });
    
	 // Remove inactive lasers
    this.lasers = this.lasers.filter((laser) => laser.active);
	
	if(this.AI == true){
	   return; // avoid AI code below
	}
   
    if (this.opponent && this.opponent.health <= 0) {
        this.currentAnimation = ANIM_IDLE;
        this.speed = 0;
        return;
    }

    if (this.currentAnimation == ANIM_DAMAGE) {
        return;
    }

    if (this.animReturnToIdle && this.retreatTime > 0) {
        // Do nothing, just return to idle
    } else if (distanceToPlayer < AI_PREFERRED_DIST) {
        this.speed = -2;
        if (this.currentAnimation === ANIM_IDLE) {
            if (Math.random() < 0.5) {
                if (Math.random() < 0.5) {
                    this.punch();
					
                } else {
                    this.kick();
                }
            }
        }
    } else if (distanceToPlayer > AI_PREFERRED_DIST) {
        this.speed = 2;
        if (debugSoundVolume) {
            this.thrustSound.volume = 0.01;
            this.canShootWhileRunning = true;
        }
        this.thrustSound.play();
        this.currentAnimation = ANIM_IDLE;
    } else {
        this.speed = 0;
        this.canShootWhileRunning = false;
    }

    // Check if the player is in a running state and if enough time has passed since the last shot
    if (this.canShootWhileRunning && Date.now() - this.lastShotTime > this.shotCooldown * 1000) {
        this.shoot(dx, dy);
        this.lastShotTime = Date.now();
    }

    if (this.retreatTime > 0) {
        this.retreatTime--;
        if (this.animReturnToIdle) {
            this.speed = 0;
        } else {
            this.speed = -2;
        }
    }

   
}

  draw(context) {
    if(this.health > 0){
		   // add some jetpack fire
    fx.jetpackFX(this.x-32,this.y+100,Math.random()*2-1,Math.random()*8);
    fx.jetpackFX(this.x+8,this.y+100,Math.random()*2-1,Math.random()*8);
	}
 

    // draw the robot sprite
    super.draw(context);

    if(this.opponent.health <=0){
	 return;}else{
     this.lasers.forEach(laser => laser.draw());
	}
    

  }

  punch() {
	if(this.currentAnimation == ANIM_DAMAGE){
	   return;
	}
    this.currentAnimation = ANIM_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatTime = 40 + Math.random() * 50; 
  }

  kick() {
    if(this.currentAnimation == ANIM_DAMAGE){
	   return;
	}
    this.currentAnimation = ANIM_KICK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / KICK_ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatTime = 40 + Math.random() * 50; 
  }

  shoot(dx, dy) {
    let angle = Math.atan2(dy, dx);
    let laser = new Laser(this.x+LASER_SHOOT_OFFSETX, this.y+LASER_SHOOT_OFFSETY, angle);
    this.lasers.push(laser);
  }
}
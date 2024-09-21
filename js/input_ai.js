class Input_ai extends Fighter {
  constructor(whichInput, imageSrcs, initialX = 2000, initialY = FLOOR_Y) {
    super(whichInput, imageSrcs, initialX, initialY);
    this.speed = 2;
    this.baseY = FLOOR_Y - 100;
    this.angle = 0;
    this.y = FLOOR_Y;
    this.AI = true;
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
	  
    if (this.keys['l']) {
      this.punch();
    }

    if (this.keys['m']) {
      this.kick;
    }

    if (this.keys['n']) {
      this.beams;
    }
}

  draw(context) {
    
    // add some jetpack fire
    fx.jetpackFX(this.x-32,this.y+100,Math.random()*2-1,Math.random()*8);
    fx.jetpackFX(this.x+8,this.y+100,Math.random()*2-1,Math.random()*8);

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
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatTime = 40 + Math.random() * 50; 
  }
  
  beams(){
	  
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
	  
  }

  shoot(dx, dy) {
    let angle = Math.atan2(dy, dx);
    let laser = new Laser(this.x+LASER_SHOOT_OFFSETX, this.y+LASER_SHOOT_OFFSETY, angle);
    this.lasers.push(laser);
  }
}

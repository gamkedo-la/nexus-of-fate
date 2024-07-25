class Robot extends Fighter {
  constructor(whichInput, imageSrcs, initialX = 2000, initialY = FLOOR_Y) {
    super(whichInput, imageSrcs, initialX, initialY);
    this.speed = 2;
    this.baseY = FLOOR_Y - 100;
    this.angle = 0;
    this.y = FLOOR_Y;
    this.AI = true;
	this.thurstSound = new Audio('audio/RobotThrust.mp3');


    // Ensure these variables are initialized in the robot object
    this.angle = 0;
    this.baseY = this.y;
    this.speed = 0;
    this.currentAnimation = ANIM_IDLE;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = false;

  }

  update() {
    // Calculate the distance and direction to the player
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distanceToPlayer = Math.hypot(dx, dy);

	if(this.animReturnToIdle){
		// block changing animation while mid kick/punch
		this.speed = 0;
	}
    else if (distanceToPlayer < AI_TOO_CLOSE_DIST) {             // If the robot is very close to the player, stop moving

      // Move the robot away from the player       
      this.speed = -2;
      // Trigger random kick or punch animation
      if (this.currentAnimation === ANIM_IDLE) {
		if (Math.random() < 0.03) { // only sometimes attack 
			if (Math.random() < 0.5) { // which attack?
			  this.punch(); 
			} else {
			  this.kick();
			}
		}
      }
    } else {
      // Move the robot towards the player
      this.speed = 2;
	  if(debugSoundVolume){
		  this.thurstSound.volume = 0.01;
	  }
	  this.thurstSound.play();
      this.currentAnimation = ANIM_IDLE; // Reset to idle when moving towards the player
    }

    // Move the robot (unless speed is zero)
    let angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle) * this.speed;
    this.baseY += Math.sin(angle) * this.speed;

    // Vertical flying effect using a sinusoidal function
    this.angle += 0.05;
    this.y = this.baseY + Math.sin(this.angle) * 20;

    // Ensure the robot stays within the canvas boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width) this.x = canvas.width;
    if (this.y < 150) this.y = 150;
    if (this.y > canvas.height - 200) this.y = canvas.height - 200;
  }

  punch() {
    this.currentAnimation = ANIM_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
	console.log("Punch anim started");
  }

  kick() {
    this.currentAnimation = ANIM_KICK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    console.log("Kick anim started");

  }
}


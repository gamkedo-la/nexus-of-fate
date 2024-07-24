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

    this.frameCounts = {
      [ANIM_IDLE]: 58,
      [ANIM_PUNCH]: 11,
      [ANIM_KICK]: 19,
    };

    this.frameHeight = {
      [ANIM_IDLE]: 1700 * 0.2 * 1.5,
      [ANIM_PUNCH]: 0.2 * 1280,
      [ANIM_KICK]: 0.2 * 1400,
    };
  }

  update() {
    // Calculate the distance and direction to the player
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distanceToPlayer = Math.hypot(dx, dy);

    // If the robot is very close to the player, stop moving
    if (distanceToPlayer < AI_TOO_CLOSE_DIST) {
      // Move the robot away from the player
      this.speed = -2;
      // Trigger random kick or punch animation
      if (this.currentAnimation === ANIM_IDLE) {
        if (Math.random() < 0.5) {
          this.punch();
        } else {
          this.kick();
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
  }

  punch() {
    this.currentAnimation = ANIM_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
  }

  kick() {
    this.currentAnimation = ANIM_KICK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
  }
}


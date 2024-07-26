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
    this.retreatDistance = 0; // Initialize retreat distance

    this.lasers = []; // Array to hold lasers
    this.lastShotTime = 0;
    this.shotCooldown = 1; // Cooldown time in seconds
  }

  update(deltaTime) {
    // Calculate the distance and direction to the player
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distanceToPlayer = Math.hypot(dx, dy);

    if (this.animReturnToIdle) {
      // block changing animation while mid kick/punch
      this.speed = -2; // Move back during animation
      if (this.retreatDistance > 0) {
        let angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * this.speed;
        this.baseY -= Math.sin(angle) * this.speed;
        this.retreatDistance -= this.speed;
      } else {
        this.animReturnToIdle = false; // End retreat
      }
    } else if (distanceToPlayer < AI_TOO_CLOSE_DIST) {
      // If the robot is very close to the player, stop moving
      this.speed = -2;
      if (this.currentAnimation === ANIM_IDLE) {
        if (Math.random() < 0.03) { // only sometimes attack 
          if (Math.random() < 0.5) { // which attack?
            this.punch(); 
          } else {
            this.kick();
          }
        }
      }
    } else if (distanceToPlayer > AI_PREFERRED_DIST) { 
      // Move the robot towards the player
      this.speed = 2;
      if (debugSoundVolume) {
        this.thurstSound.volume = 0.01;
      }
      this.thurstSound.play();
      this.currentAnimation = ANIM_IDLE; // Reset to idle when moving towards the player
    } else {
      // The robot is in between AI_PREFERRED_DIST and AI_TOO_CLOSE_DIST
      this.speed = 0;
      // Shoot a laser if the cooldown has passed
      if (Date.now() - this.lastShotTime > this.shotCooldown * 1000) {
        this.shoot(dx, dy);
        this.lastShotTime = Date.now();
      }
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

    // Update lasers
    this.lasers.forEach(laser => laser.update());
    // Remove inactive lasers
    this.lasers = this.lasers.filter(laser => laser.active);
  }

  punch() {
    this.currentAnimation = ANIM_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatDistance = Math.random() * 100 + 50; // Set random retreat distance
    console.log("Punch anim started");
  }

  kick() {
    this.currentAnimation = ANIM_KICK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatDistance = Math.random() * 100 + 50; // Set random retreat distance
    console.log("Kick anim started");
  }

  shoot(dx, dy) {
    let angle = Math.atan2(dy, dx);
    let laser = new Laser(this.x, this.y, angle);
    this.lasers.push(laser);
    console.log("Laser shot");
  }
}

class Robot extends Fighter {
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
    this.retreatDistance = 0;

    this.lasers = [];
    this.lastShotTime = 0;
    this.shotCooldown = 1; // Cooldown time in seconds
  }

  update(deltaTime) {
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distanceToPlayer = Math.hypot(dx, dy);

    if (this.animReturnToIdle) {
      this.speed = -2;
      if (this.retreatDistance > 0) {
        let angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * this.speed;
        this.baseY -= Math.sin(angle) * this.speed;
        this.retreatDistance -= this.speed;
      } else {
        this.animReturnToIdle = false;
      }
    } else if (distanceToPlayer < AI_TOO_CLOSE_DIST) {
      this.speed = -2;
      if (this.currentAnimation === ANIM_IDLE) {
        if (Math.random() < 0.03) {
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
      }
      this.thrustSound.play();
      this.currentAnimation = ANIM_IDLE;
    } else {
      this.speed = 0;
    }

    if (Date.now() - this.lastShotTime > this.shotCooldown * 1000) {
      console.log("Shooting condition met");
      this.shoot(dx, dy);
      this.lastShotTime = Date.now();
    }

    let angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle) * this.speed;
    this.baseY += Math.sin(angle) * this.speed;

    this.angle += 0.05;
    this.y = this.baseY + Math.sin(this.angle) * 20;

    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width) this.x = canvas.width;
    if (this.y < 150) this.y = 150;
    if (this.y > canvas.height - 200) this.y = canvas.height - 200;

    this.lasers.forEach(laser => laser.update());
    this.lasers = this.lasers.filter(laser => laser.active);
  }

  draw(context) {
    // Call the draw method of the super class
    super.draw(context);

    // Draw the lasers
    this.lasers.forEach(laser => laser.draw(context));
  }

  punch() {
    this.currentAnimation = ANIM_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatDistance = Math.random() * 100 + 50;
    console.log("Punch anim started");
  }

  kick() {
    this.currentAnimation = ANIM_KICK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
    this.retreatDistance = Math.random() * 100 + 50;
    console.log("Kick anim started");
  }

  shoot(dx, dy) {
    let angle = Math.atan2(dy, dx);
    let laser = new Laser(this.x, this.y, angle);
    this.lasers.push(laser);
    console.log("Laser shot");
  }
}

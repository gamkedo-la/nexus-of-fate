// Ensure these variables are initialized in the robot object
robot.angle = 0;
robot.baseY = robot.y;
robot.speed = 0;
robot.currentAnimation = ANIM_IDLE;
robot.frameNum = 0;
robot.timeTillNextFrame = 1 / ANIM_FPS;
robot.animReturnToIdle = false;

robot.images = {
  [ANIM_IDLE]: new Image(),
  [ANIM_ROBOT_PUNCH]: new Image(),
  [ANIM_ROBOT_KICK]: new Image()
};

robot.images[ANIM_IDLE].src = imageSrcs[ANIM_IDLE];
robot.images[ANIM_ROBOT_PUNCH].src = imageSrcs[ANIM_WALK_FORWARD];
robot.images[ANIM_ROBOT_KICK].src = imageSrcs[ANIM_WALK_BACKWARD];

robot.frameCounts = {
  [ANIM_IDLE]: 58,
  [ANIM_ROBOT_PUNCH]: 12,
  [ANIM_ROBOT_KICK]: 39,
};

robot.frameHeight = {
  [ANIM_IDLE]: 1700 * 0.2 * 1.5,
  [ANIM_ROBOT_PUNCH]: 382.6,
  [ANIM_ROBOT_KICK]: 382.6,
};

function ai_update() {
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

robot.punch = function () {
  this.currentAnimation = ANIM_ROBOT_PUNCH;
  this.frameNum = 0;
  this.timeTillNextFrame = 1 / ANIM_FPS;
  this.animReturnToIdle = true;
};

robot.kick = function () {
  this.currentAnimation = ANIM_ROBOT_KICK;
  this.frameNum = 0;
  this.timeTillNextFrame = 1 / ANIM_FPS;
  this.animReturnToIdle = true;
};

function input_ai() {
  // currently unused.
  // this function used to control the AI with keypresses
  // and would update this.keys[] array
  // so it followed all the same fighter.js logic as the player
  // but since we've decided to have the robot use different logic
  // it made no sense to have AI control itself like a player
}

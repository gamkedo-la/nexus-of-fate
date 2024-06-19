const ANIM_FPS = 20; // how fast the animations play
const MOVE_SPEED = 10; // how fast the fighters move left and right
const JUMP_POWER = -10; // how much upward velocity jump gives you
const GRAVITY = 0.2; // how fast you accelerate while falling
const FLOOR_Y = 240; // lowest possible Y coordinate

const ANIM_IDLE = 'idle';
const ANIM_WALK_FORWARD = 'walk_forward';
const ANIM_WALK_BACKWARD = 'walk_backward';
const ANIM_CROUCH = 'crouch';
const ANIM_JUMP   = 'jump';


class Fighter {
  constructor(whichInput, imageSrcs, initialX, initialY) {
    this.keys = {};
    this.getInput = whichInput;
    this.images = {
      [ANIM_IDLE]: new Image(),
      [ANIM_WALK_FORWARD]: new Image(),
      [ANIM_WALK_BACKWARD]: new Image(),
      [ANIM_CROUCH]: new Image(),
	  [ANIM_JUMP]: new Image()
    };

    this.images[ANIM_IDLE].src = imageSrcs[ANIM_IDLE];
    this.images[ANIM_WALK_FORWARD].src = imageSrcs[ANIM_WALK_FORWARD];
    this.images[ANIM_WALK_BACKWARD].src = imageSrcs[ANIM_WALK_BACKWARD];
    this.images[ANIM_CROUCH].src = imageSrcs[ANIM_CROUCH];
	this.images[ANIM_JUMP].src = imageSrcs[ANIM_JUMP];


    // Frame counts for each animation
    this.frameCounts = {
      [ANIM_IDLE]: 58,
      [ANIM_WALK_FORWARD]: 12,
      [ANIM_WALK_BACKWARD]: 39,
      [ANIM_CROUCH]: 19,
	  [ANIM_JUMP]: 9
    };

    this.x = initialX;
    this.y = initialY;
    this.speedY = 0;
    this.currentAnimation = ANIM_IDLE;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.previousFrameTimestamp = performance.now() / 1000;

    this.frameHeight = 1913 * 0.2; // This should match the actual frame height
    this.frameWidth = 1125 * 0.2; // This should match the actual frame width

    this.opponent = null;
  }

  draw(context) {
    let now = performance.now() / 1000;
    let deltaTime = now - this.previousFrameTimestamp;
    this.previousFrameTimestamp = now;

    // Only update frame if enough time has passed
    this.timeTillNextFrame -= deltaTime;
    if (this.timeTillNextFrame <= 0) {
      this.frameNum++;
      this.frameNum %= this.frameCounts[this.currentAnimation];
      this.timeTillNextFrame += 1 / ANIM_FPS;
    }

    let image = this.images[this.currentAnimation];
    let frameW = this.frameWidth;
    let frameH = this.frameHeight;

    context.drawImage(image, 0, frameH * this.frameNum, frameW, frameH, this.x, this.y, frameW, frameH);
  }

  update(canvasWidth) {
    this.getInput();

    // Update the animation state based on movement
    if (this.keys['a']) {
      this.moveLeft();
    } else if (this.keys['d']) {
      this.moveRight();
    } else {
      if (this.currentAnimation !== ANIM_IDLE) {
        this.currentAnimation = ANIM_IDLE;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
      }
    }

    if (this.keys[' ']) {
      this.jump();
    }

    if (this.keys['s']) {
      this.crouch();
    }

    this.boundsCheck(canvasWidth);
  }

  boundsCheck(canvasWidth) {
    if (canvasWidth == undefined || canvasWidth <= 0) return;

    this.y += this.speedY;
    if (this.y > FLOOR_Y) {
      this.y = FLOOR_Y;
      this.speedY = 0;
    } else {
      this.speedY += GRAVITY;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.frameWidth > canvasWidth) {
      this.x = canvasWidth - this.frameWidth;
    }

    // prevent or reset if the fighters cross sides
    let thatsCloseEnoughX = this.frameWidth * 0.5;
    if (this.opponent === robot) {
      // this is the player
      // keep to left of opponent
      let maxX = this.opponent.x - thatsCloseEnoughX;
      if (this.x > maxX) {
        this.x = maxX;
      }
    } else {
      // this is the robot
      // keep to right of opponent
      let minX = this.opponent.x + thatsCloseEnoughX;
      if (this.x < minX) {
        this.x = minX;
      }
    }
  }

  moveLeft() {
    if (this.currentAnimation !== ANIM_WALK_BACKWARD) {
      this.currentAnimation = ANIM_WALK_BACKWARD;
      this.frameNum = 0;
      this.timeTillNextFrame = 1 / ANIM_FPS;
    }
    this.x -= MOVE_SPEED;
  }

  moveRight() {
    if (this.currentAnimation !== ANIM_WALK_FORWARD) {
      this.currentAnimation = ANIM_WALK_FORWARD;
      this.frameNum = 0;
      this.timeTillNextFrame = 1 / ANIM_FPS;
    }
    this.x += MOVE_SPEED;
  }

  jump() {
    if (this.y >= FLOOR_Y) {
     // this.speedY = JUMP_POWER;
	 this.currentAnimation = ANIM_JUMP;
	 this.frameNum = 0;
     this.timeTillNextFrame = 1 / ANIM_FPS;
    }
  }

  crouch() {
      this.currentAnimation = ANIM_CROUCH;
      this.frameNum = 0;
      this.timeTillNextFrame = 1 / ANIM_FPS;
  }

  getCurrentAnimationFrameCount() {
    return this.frameCounts[this.currentAnimation];
  }
}

function input_keyboard() {
  window.addEventListener('keydown', (event) => {
    player.keys[event.key] = true;
  });

  window.addEventListener('keyup', (event) => {
    player.keys[event.key] = false;
  });
}
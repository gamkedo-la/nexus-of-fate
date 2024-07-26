const AI_TOO_CLOSE_DIST = 220; // when to back up (if player walks into robot, it will back up)
const AI_PREFERRED_DIST = 260; // when to stop moving forward - the ideal target distance

const MOVE_SPEED = 10; // how fast the fighters move left and right
const JUMP_POWER = -10; // how much upward velocity jump gives you
const GRAVITY = 0.2; // how fast you accelerate while falling
const FLOOR_Y = 240; // lowest possible Y coordinate
const BODY_WIDTH = 170;

const ANIM_FPS = 24; // how fast the animations play

const ANIM_IDLE = 'idle';
const ANIM_WALK_FORWARD = 'walk_forward';
const ANIM_WALK_BACKWARD = 'walk_backward';
const ANIM_CROUCH = 'crouch';
const ANIM_JUMP = 'jump';
const ANIM_KICK = 'kick';
const ANIM_PUNCH = 'punch';
const ANIM_CROUCH_PUNCH = 'crouchPunch';
const ANIM_DEATH = 'die';
const ANIM_BLOCK = 'block';

class Fighter {
  constructor(whichInput, imageSrcs, initialX, initialY) {
    this.health = 100;
    this.keys = {};
    this.AI = false; // overriding from main outside this function, to help gate debug output
    this.getInput = whichInput;
    this.walkSound = new Audio('audio/playerWalkSound.mp3');
    this.jumpSound = new Audio('audio/playerJumpLaunch.mp3');

    this.images = {
      [ANIM_IDLE]: new Image(),
      [ANIM_WALK_FORWARD]: new Image(),
      [ANIM_WALK_BACKWARD]: new Image(),
      [ANIM_CROUCH]: new Image(),
      [ANIM_JUMP]: new Image(),
      [ANIM_KICK]: new Image(),
      [ANIM_PUNCH]: new Image(),
      [ANIM_DEATH]: new Image(),
      [ANIM_CROUCH_PUNCH]: new Image(),
      [ANIM_BLOCK]: new Image()
    };

    this.images[ANIM_IDLE].src = imageSrcs[ANIM_IDLE];
    this.images[ANIM_WALK_FORWARD].src = imageSrcs[ANIM_WALK_FORWARD];
    this.images[ANIM_WALK_BACKWARD].src = imageSrcs[ANIM_WALK_BACKWARD];
    this.images[ANIM_CROUCH].src = imageSrcs[ANIM_CROUCH];
    this.images[ANIM_JUMP].src = imageSrcs[ANIM_JUMP];
    this.images[ANIM_KICK].src = imageSrcs[ANIM_KICK];
    this.images[ANIM_PUNCH].src = imageSrcs[ANIM_PUNCH];
    this.images[ANIM_DEATH].src = imageSrcs[ANIM_DEATH];
    this.images[ANIM_CROUCH_PUNCH].src = imageSrcs[ANIM_PUNCH];
    this.images[ANIM_BLOCK].src = imageSrcs[ANIM_BLOCK];

    // Frame counts for each animation
    this.frameCounts = {
      [ANIM_IDLE]: 58,
      [ANIM_WALK_FORWARD]: 12,
      [ANIM_WALK_BACKWARD]: 39,
      [ANIM_CROUCH]: 19,
      [ANIM_JUMP]: 9,
      [ANIM_KICK]: 13,
      [ANIM_PUNCH]: 10,
      [ANIM_DEATH]: 7,
      [ANIM_BLOCK]: 4
    };

    this.frameHeight = { // scale dim times frameheight from export
      [ANIM_IDLE]: 383, // note: not locked to exact pixel multiples, probably should on export
      [ANIM_WALK_FORWARD]: 382.6,
      [ANIM_WALK_BACKWARD]: 382.6,
      [ANIM_CROUCH]: 2200 * 0.2,
      [ANIM_JUMP]: 407,
      [ANIM_KICK]: 1913 * 0.2,
      [ANIM_PUNCH]: 2126 * 0.2,
      [ANIM_DEATH]: 7,
      [ANIM_BLOCK]: 2274 * 0.2
    };

    this.frameHeightRobot = { // scale dim times frameheight from export
      [ANIM_IDLE]: 1700 * 0.2 * 1.5,
      [ANIM_WALK_FORWARD]: 382.6,
      [ANIM_WALK_BACKWARD]: 382.6,
      [ANIM_CROUCH]: 2200 * 0.2,
      [ANIM_JUMP]: 407,
      [ANIM_KICK]: 0.2 * 1.5 * 1264,
      [ANIM_PUNCH]: 0.2 * 1.5 * 1280,
      [ANIM_DEATH]: 7
    };

    this.frameCountsRobot = {
      [ANIM_IDLE]: 19,
      [ANIM_WALK_FORWARD]: 12,
      [ANIM_WALK_BACKWARD]: 39,
      [ANIM_CROUCH]: 19,
      [ANIM_JUMP]: 9,
      [ANIM_KICK]: 19,
      [ANIM_PUNCH]: 11,
      [ANIM_DEATH]: 7
    };

    this.x = initialX;
    this.y = initialY;
    this.speedY = 0;
    this.currentAnimation = ANIM_IDLE;
    this.frameNum = 0;
    this.animReturnToIdle = false;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.previousFrameTimestamp = performance.now() / 1000;

    this.opponent = null;
  }

  draw() {
    let now = performance.now() / 1000;
    let deltaTime = now - this.previousFrameTimestamp;
    this.previousFrameTimestamp = now;

    // Only update frame if enough time has passed
    if (this.currentAnimation != ANIM_JUMP) {
      this.timeTillNextFrame -= deltaTime;
      if (this.timeTillNextFrame <= 0) {
        this.frameNum++;
        this.timeTillNextFrame += 1 / ANIM_FPS;

        var frameCount;
        if (this.AI) {
          frameCount = this.frameCountsRobot[this.currentAnimation];
        } else {
          frameCount = this.frameCounts[this.currentAnimation];
        }

        if (this.animReturnToIdle && this.frameNum == frameCount) {
          this.animReturnToIdle = false;
          this.currentAnimation = ANIM_IDLE;
          this.frameNum = 0;
        } else {
          this.frameNum %= frameCount;
        }
      }
    } else {
      if (this.speedY < -8) {
        this.frameNum = 0;
      } else if (this.speedY < -5) {
        this.frameNum = 1;
      } else if (this.speedY < -2) {
        this.frameNum = 2;
      } else if (this.speedY < -0.5) {
        this.frameNum = 3;
      } else if (this.speedY < 0.5) {
        this.frameNum = 4;
      } else if (this.speedY < 2) {
        this.frameNum = 5;
      } else if (this.speedY < 5) {
        this.frameNum = 6;
      } else if (this.speedY < 8) {
        this.frameNum = 7;
      } else {
        this.frameNum = 8;
      }
    }

    if (this.currentAnimation < 0 || this.currentAnimation >= this.images.length) {
      console.log(" invalid animation frame " + this.currentAnimation + " AI? " + this.AI);
      return;
    }

    let image = this.images[this.currentAnimation];
    let frameW = image.width;
    let frameH = this.frameHeight[this.currentAnimation];
    if (this.AI) {
      frameH = this.frameHeightRobot[this.currentAnimation];
    }
    context.drawImage(image, 0, frameH * this.frameNum, frameW, frameH, this.x - frameW / 2, this.y, frameW, frameH);
  }

  update(canvasWidth) {
    this.getInput();

    // Update the animation state based on movement
    if (this.keys['a'] || this.keys['gamepad_left']) {
      this.moveLeft();
    } else if (this.keys['d'] || this.keys['gamepad_right']) {
      this.moveRight();
    } else if (this.y >= FLOOR_Y && this.speedY == 0) {
      if (this.currentAnimation == ANIM_CROUCH || this.currentAnimation == ANIM_BLOCK) {
        //prevent idle from preventing crouch
        if (this.frameNum == this.frameCounts[this.currentAnimation] - 1) {
          this.frameNum--;
          this.timeTillNextFrame = 100 / ANIM_FPS;

          // prevent looping
        }
      }
      else if (this.animReturnToIdle) {

        // don't let idle interrupt
      }
      else if (this.currentAnimation !== ANIM_IDLE) {
        this.currentAnimation = ANIM_IDLE;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
      }
    }

    if (this.keys[' '] || this.keys['gamepad_a_button']) {
      this.jump();
    }

    if (this.keys['s'] || this.keys['gamepad_down']) {
      this.crouch();
    }

    if (this.keys['k'] || this.keys['gamepad_b_button']) {
      this.kick();
    }

    if (this.keys['p'] || this.keys['gamepad_a_button']) {
      this.punch();
    }

    if (this.keys['z'] || this.keys['gamepad_x_button']) {
      this.block();
    }

    if ((this.keys['s'] && this.keys['p'])
      || (this.keys['gamepad_a_button'] && this.keys['gamepad_down'])) {
      this.crouchPunch();
    }

    if (this.health <= 0) {
      this.died();
    }

    this.boundsCheck(canvasWidth);
  }

  boundsCheck(canvasWidth) {
    if (canvasWidth == undefined || canvasWidth <= 0) return;

    // Apply gravity and floor constraint
    this.y += this.speedY;
    if (this.y > FLOOR_Y) {
      if (this.currentAnimation === ANIM_JUMP) {
        this.currentAnimation = ANIM_IDLE;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
      }
      this.y = FLOOR_Y;
      this.speedY = 0;
    } else {
      this.speedY += GRAVITY;
    }

    // Apply horizontal screen boundaries
    if (this.x < 80) {
      this.x = 80;
    }

    if (this.x + BODY_WIDTH > canvasWidth) {
      this.x = canvasWidth - BODY_WIDTH;
    }

    // Prevent or reset if the fighters cross sides
    let thatsCloseEnoughX = BODY_WIDTH * 0.5;
    if (this.opponent) {
      if (this.opponent === player) {
        // This is the robot, keep to the right of opponent
        let minX = this.opponent.x + thatsCloseEnoughX;
        if (this.x < minX) {
          this.x = Math.max(minX, 0); // Ensure the robot stays within the left screen boundary
        }
      } else {
        // This is the player, keep to the left of opponent
        let maxX = this.opponent.x - thatsCloseEnoughX;
        if (this.x > maxX) {
          this.x = Math.min(maxX, canvasWidth - BODY_WIDTH); // Ensure the player stays within the right screen boundary
        }
      }
    }
  }

  moveLeft() {
    if (this.currentAnimation !== ANIM_JUMP) {
      if (this.currentAnimation !== ANIM_WALK_BACKWARD) {
        this.currentAnimation = ANIM_WALK_BACKWARD;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
        this.walkSound.play();
      }
    }
    this.x -= MOVE_SPEED;
  }

  moveRight() {
    if (this.currentAnimation !== ANIM_JUMP) {
      if (this.currentAnimation !== ANIM_WALK_FORWARD) {
        this.currentAnimation = ANIM_WALK_FORWARD;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
        this.walkSound.play();
      }
    }
    this.x += MOVE_SPEED;
  }

  jump() {
    if (this.y >= FLOOR_Y && this.speedY === 0) {
      this.currentAnimation = ANIM_JUMP;
      this.frameNum = 0;
      this.timeTillNextFrame = 1 / ANIM_FPS;
      this.speedY = JUMP_POWER;
      this.jumpSound.play();
    }
  }

  crouch() {
    this.currentAnimation = ANIM_CROUCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
  }

  kick() {
    this.currentAnimation = ANIM_KICK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
  }

  punch() {
    this.currentAnimation = ANIM_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
    this.animReturnToIdle = true;
  }

  crouchPunch() {
    this.currentAnimation = ANIM_CROUCH_PUNCH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
  }

  died() {
    this.currentAnimation = ANIM_DEATH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
  }

  block() {
    this.currentAnimation = ANIM_BLOCK;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
  }

  getCurrentAnimationFrameCount() {
    return
  }
}

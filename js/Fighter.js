const AI_TOO_CLOSE_DIST = 250; // when to back up (if player walks into robot, it will back up)
const AI_PREFERRED_DIST = 260; // when to stop moving forward - the ideal target distance

const PUNCH_HIT_RANGE = 200; // if we punch and enemy is not blocking and we are this close, register as a hit
const KICK_HIT_RANGE = 250;

const MOVE_SPEED = 10; // how fast the fighters move left and right
const JUMP_POWER = -10; // how much upward velocity jump gives you
const GRAVITY = 0.2; // how fast you accelerate while falling
const FLOOR_Y = 240; // lowest possible Y coordinate
const BODY_WIDTH = 170;

const ANIM_FPS = 24; // how fast the animations play
const CROUCH_ANIM_FPS = 200;

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
	this.hurtSound = new Audio('audio/playerHurt.mp3');
	this.robotHurtSound = new Audio('audio/robotHurt.mp3');
    this.jumpSound = new Audio('audio/playerJumpLaunch.mp3');

    this.punchSound = new Audio('audio/punch.mp3');
    this.punchSound.volume = 0.5;
    this.punchHitSound = new Audio('audio/punchHit.mp3');
    this.kickSound = new Audio('audio/kick.mp3');
    this.kickSound.volume = 0.5;
    this.kickHitSound = new Audio('audio/kickHit.mp3');

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
    this.images[ANIM_CROUCH_PUNCH].src = imageSrcs[ANIM_CROUCH_PUNCH];
    this.images[ANIM_BLOCK].src = imageSrcs[ANIM_BLOCK];

    // Frame counts for each animation
    this.frameCounts = {
      [ANIM_IDLE]: 58,
      [ANIM_WALK_FORWARD]: 12,
      [ANIM_WALK_BACKWARD]: 39,
      [ANIM_CROUCH]: 19,
	  [ANIM_CROUCH_PUNCH]: 10,
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
	  [ANIM_CROUCH_PUNCH]: 1746 * 0.2,
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
	this.prevAnim = ANIM_IDLE;
	this.prevAnim = ANIM_IDLE;
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
  if (this.currentAnimation !== ANIM_JUMP) {
    this.timeTillNextFrame -= deltaTime;
    if (this.timeTillNextFrame <= 0) {
      this.frameNum++;
      this.timeTillNextFrame += 1 / ANIM_FPS;

      var frameCount = this.AI ? this.frameCountsRobot[this.currentAnimation] : this.frameCounts[this.currentAnimation];

      if (this.animReturnToIdle && this.frameNum === frameCount) {
        if (this.currentAnimation === ANIM_BLOCK || this.currentAnimation === ANIM_CROUCH) {
          this.frameNum = frameCount - 1;
        } else {
          this.animReturnToIdle = false;
          this.currentAnimation = ANIM_IDLE;
          this.frameNum = 0;
        }
      } else {
        this.frameNum %= frameCount;
      }
    }
  } else {
    // Logic to handle the jump animation frame progression
  }

  let image = this.images[this.currentAnimation];
  let frameW = image.width;
  let frameH = this.AI ? this.frameHeightRobot[this.currentAnimation] : this.frameHeight[this.currentAnimation];

  // Draw the base sprite
  context.drawImage(image, 0, frameH * this.frameNum, frameW, frameH, this.x - frameW / 2, this.y, frameW, frameH);

  // Apply red tint based on health
  let healthPercentage = this.health / 100;
  if (healthPercentage < 1) {
    context.save(); // Save the current state
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = `rgba(255, 0, 0, ${(1 - healthPercentage) * 0.5})`; // Adjust opacity based on health
    context.fillRect(this.x - frameW / 2, this.y, frameW, frameH);
    context.restore(); // Restore the state so subsequent drawings are not affected
  }
}
  update(canvasWidth) {
  this.prevAnim = this.currentAnimation;
    this.getInput();

    // Update the animation state based on movement
    if (this.keys['a'] || this.keys['gamepad_left']) {
      this.moveLeft();
    } else if (this.keys['d'] || this.keys['gamepad_right']) {
      this.moveRight();
    } else if (this.y >= FLOOR_Y && this.speedY == 0) {
	 
	  if (this.animReturnToIdle) {

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

    if (this.keys['k'] || this.keys['gamepad_b_button']) {
      this.startAnimIfNew(ANIM_KICK);
    }

    if (this.keys['p'] || this.keys['gamepad_a_button']) {
      this.startAnimIfNew(ANIM_PUNCH);
    }
    // keys below here can be held, remember to check for currentAnim when returnTOIdle is used
    if (this.keys['s'] || this.keys['gamepad_down']) {
      this.startAnimIfNew(ANIM_CROUCH);
    }
	else if(this.currentAnimation == ANIM_CROUCH){
		this.currentAnimation = ANIM_IDLE;
	}
	
    if (this.keys['z'] || this.keys['gamepad_x_button']) {
      this.startAnimIfNew(ANIM_BLOCK);
    }
	else if(this.currentAnimation == ANIM_BLOCK){
		this.currentAnimation = ANIM_IDLE;
	}

    if ((this.keys['s'] && this.keys['p'])
      || (this.keys['gamepad_a_button'] && this.keys['gamepad_down'])) {
      this.startAnimIfNew(ANIM_CROUCH_PUNCH);
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
    this.timeTillNextFrame = 1 / CROUCH_ANIM_FPS;
  }

  

  startAnimIfNew(newAnim) {
	if(this.currentAnimation != newAnim){
		this.currentAnimation = newAnim;
		this.frameNum = 0;
		this.timeTillNextFrame = 1 / ANIM_FPS;
		this.animReturnToIdle = true;
	}
  }


  died() {
    this.currentAnimation = ANIM_DEATH;
    this.frameNum = 0;
    this.timeTillNextFrame = 1 / ANIM_FPS;
  }

 

  getCurrentAnimationFrameCount() {
    return
  }

  check_collisions(myOpponent) {
    if (!myOpponent) return;
    let dist = Math.abs(this.x - myOpponent.x);
    let beingBlocked = myOpponent.currentAnimation == ANIM_BLOCK;

    if (this.currentAnimation == ANIM_PUNCH) {
      if (dist < PUNCH_HIT_RANGE) { // close enough?
        if (beingBlocked) {
          console.log("punch was blocked!");
          this.punchHitSound.play(); // block sound
        } else { // not blocked?
          myOpponent.health -= 1;
          console.log("punch hit! opponent health is now "+myOpponent.health);
          this.punchHitSound.play(); // impact sound
		  if (this.AI) {
			  this.robotHurtSound.play();
		  } else {
			  this.hurtSound.play();
		  }
        }
      } else {
        console.log("punch missed: out of range! distance="+dist.toFixed(1));
        this.punchSound.play(); // woosh
      }
    } // punch

    if(this.currentAnimation == ANIM_KICK){
		if (dist < KICK_HIT_RANGE) { // close enough?
            if (beingBlocked) {
            console.log("kick was blocked!");
            this.kickHitSound.play(); // play block sfx
            } else { // not blocked
            console.log("kick hit!");
            this.kickHitSound.play(); // play hit sfx
            this.kickSound.play(); // woosh
            myOpponent.health -= 1;
            }
        } else {
            console.log("kick missed: out of range! distance="+dist.toFixed(1));
            this.kickSound.play(); // woosh
        }
    } // kick

  } // check_collisions()

} // fighter class

const AI_TOO_CLOSE_DIST = 50; // when to back up (if player walks into robot, it will back up)
const AI_PREFERRED_DIST = 150; // when to stop moving forward - the ideal target distance

// offsets used for the hit/block fx particle location relative to player x,y:
const PLAYER_FIST_X = -60;
const PLAYER_FIST_Y = -30;
const PLAYER_FOOT_X = -20;
const PLAYER_FOOT_Y = 50;
const ROBOT_FIST_X = -260;
const ROBOT_FIST_Y = -20;
const ROBOT_FOOT_X = -220;
const ROBOT_FOOT_Y = 50;

const PUNCH_DAMAGE = 5;
const KICK_DAMAGE = 6;
const PUNCH_HIT_RANGE = 155; // if we punch and enemy is not blocking and we are this close, register as a hit
const KICK_HIT_RANGE = 156;

const MOVE_SPEED = 10; // how fast the fighters move left and right
const DASH_SPEED = 20; // how fast the fighters dash left and right
const JUMP_POWER = -5; // how much upward velocity jump gives you
const GRAVITY = 0.2; // how fast you accelerate while falling
const FLOOR_Y = 240; // lowest possible Y coordinate
const BODY_WIDTH = 170;
const PUNCH_ANIM_FPS = 24; // how fast the animations play
const ANIM_FPS = 24; // how fast the animations play
const KICK_ANIM_FPS = 12;
const CROUCH_ANIM_FPS = 30;
const ANIM_IDLE = 'idle';
const ANIM_WALK_FORWARD = 'walk_forward';
const ANIM_WALK_BACKWARD = 'walk_backward';
const ANIM_CROUCH = 'crouch';
const ANIM_JUMP = 'jump';
const ANIM_KICK = 'kick';
const ANIM_PUNCH = 'punch';
const ANIM_CROUCH_PUNCH = 'crouchPunch';
const ANIM_BLOCK = 'block';
const ANIM_COMBO = 'combo';
const ANIM_DAMAGE = 'damage';

const EDGE_BOUNDRY_PIXELS = 120;


function setThisLoaded() { this.loaded = true; } // used for image onload


class Fighter {
  constructor(whichInput, imageSrcs, initialX, initialY) {
    this.health = 100;
    this.power = 0;
    this.keys = {};
    this.width = 180;
    this.height = 400;
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
    this.playerDieSound = new Audio('audio/playerDie.mp3');
    this.robotDieSound = new Audio('audio/robotDie.mp3');

    this.images = {
      [ANIM_IDLE]: new Image(),
      [ANIM_WALK_FORWARD]: new Image(),
      [ANIM_WALK_BACKWARD]: new Image(),
      [ANIM_CROUCH]: new Image(),
      [ANIM_JUMP]: new Image(),
      [ANIM_KICK]: new Image(),
      [ANIM_PUNCH]: new Image(),
      [ANIM_CROUCH_PUNCH]: new Image(),
      [ANIM_BLOCK]: new Image(),
      [ANIM_COMBO]: new Image(),
      [ANIM_DAMAGE]: new Image(),
    };

    this.images[ANIM_IDLE].src = imageSrcs[ANIM_IDLE];
    this.images[ANIM_WALK_FORWARD].src = imageSrcs[ANIM_WALK_FORWARD];
    this.images[ANIM_WALK_BACKWARD].src = imageSrcs[ANIM_WALK_BACKWARD];
    this.images[ANIM_CROUCH].src = imageSrcs[ANIM_CROUCH];
    this.images[ANIM_JUMP].src = imageSrcs[ANIM_JUMP];
    this.images[ANIM_KICK].src = imageSrcs[ANIM_KICK];
    this.images[ANIM_PUNCH].src = imageSrcs[ANIM_PUNCH];
    this.images[ANIM_CROUCH_PUNCH].src = imageSrcs[ANIM_CROUCH_PUNCH];
    this.images[ANIM_BLOCK].src = imageSrcs[ANIM_BLOCK];
    this.images[ANIM_COMBO].src = imageSrcs[ANIM_COMBO];
    this.images[ANIM_DAMAGE].src = imageSrcs[ANIM_DAMAGE];

    // so we know when they are ready
    this.images[ANIM_IDLE].onload = setThisLoaded;
    this.images[ANIM_WALK_FORWARD].onload = setThisLoaded;
    this.images[ANIM_WALK_BACKWARD].onload = setThisLoaded;
    this.images[ANIM_CROUCH].onload = setThisLoaded;
    this.images[ANIM_JUMP].onload = setThisLoaded;
    this.images[ANIM_KICK].onload = setThisLoaded;
    this.images[ANIM_PUNCH].onload = setThisLoaded;
    this.images[ANIM_CROUCH_PUNCH].onload = setThisLoaded;
    this.images[ANIM_BLOCK].onload = setThisLoaded;
    this.images[ANIM_COMBO].onload = setThisLoaded;
    this.images[ANIM_DAMAGE].onload = setThisLoaded;



    // Frame counts for each animation
    this.frameCounts = {
      [ANIM_IDLE]: 58,
      [ANIM_WALK_FORWARD]: 12,
      [ANIM_WALK_BACKWARD]: 39,
      [ANIM_CROUCH]: 19,
      [ANIM_CROUCH_PUNCH]: 10,
      [ANIM_JUMP]: 9,
      [ANIM_KICK]: 4,
      [ANIM_PUNCH]: 10,
      [ANIM_BLOCK]: 4,
      [ANIM_COMBO]: 11,
      [ANIM_DAMAGE]: 4,

    };

    this.frameHeight = { // scale dim times frameheight from export
      [ANIM_IDLE]: 383, // note: not locked to exact pixel multiples, probably should on export
      [ANIM_WALK_FORWARD]: 382.6,
      [ANIM_WALK_BACKWARD]: 382.6,
      [ANIM_CROUCH]: 2200 * 0.2,
      [ANIM_CROUCH_PUNCH]: 2288 * 0.2,
      [ANIM_CROUCH_PUNCH]: 2288 * 0.2,
      [ANIM_JUMP]: 407,
      [ANIM_KICK]: 2000 * 0.2,
      [ANIM_PUNCH]: 2126 * 0.2,
      [ANIM_BLOCK]: 2274 * 0.2,
      [ANIM_COMBO]: 1913 * 0.2,
      [ANIM_DAMAGE]: 1980 * 0.2,

    };

    this.frameCountsRobot = {
      [ANIM_IDLE]: 19,
      [ANIM_WALK_FORWARD]: 12,
      [ANIM_WALK_BACKWARD]: 39,
      [ANIM_CROUCH]: 19,
      [ANIM_JUMP]: 9,
      [ANIM_KICK]: 19,
      [ANIM_PUNCH]: 11,
      [ANIM_DAMAGE]: 7
    }

    this.frameHeightRobot = { // scale dim times frameheight from export
      [ANIM_IDLE]: 1700 * 0.2 * 1.5,
      [ANIM_WALK_FORWARD]: 382.6,
      [ANIM_WALK_BACKWARD]: 382.6,
      [ANIM_CROUCH]: 2200 * 0.2,
      [ANIM_JUMP]: 407,
      [ANIM_KICK]: 0.2 * 1.5 * 1264,
      [ANIM_PUNCH]: 0.2 * 1.5 * 1280,
      [ANIM_DAMAGE]: 1284 * 0.2 * 1.5
    };

    ;

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
        if (this.currentAnimation == ANIM_CROUCH) {
          this.timeTillNextFrame = 1 / CROUCH_ANIM_FPS;
        } else {
          this.timeTillNextFrame += 1 / ANIM_FPS;
        }

        var frameCount = this.AI ? this.frameCountsRobot[this.currentAnimation] : this.frameCounts[this.currentAnimation];

        if (this.animReturnToIdle && this.frameNum === frameCount) {
          if (this.currentAnimation === ANIM_BLOCK || this.currentAnimation === ANIM_CROUCH) {
            this.frameNum = frameCount - 1;
          } else if (this.currentAnimation === ANIM_CROUCH_PUNCH) {
            this.currentAnimation = ANIM_CROUCH;
            frameCount = this.AI ? this.frameCountsRobot[this.currentAnimation] : this.frameCounts[this.currentAnimation];
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

    let image = this.images[this.currentAnimation];
    let frameW = image.width;
    let frameH = this.AI ? this.frameHeightRobot[this.currentAnimation] : this.frameHeight[this.currentAnimation];

    // Draw the base sprite

    if (this.health > 0) {
      if (image.loaded) { context.drawImage(image, 0, frameH * this.frameNum, frameW, frameH, this.x - frameW / 2, this.y, frameW, frameH) };

    }


  }
  update(canvasWidth) {
    this.prevAnim = this.currentAnimation;
    this.getInput();
    if (!this.AI && this.health <= 0) {
      fx.dieFX(this.x, this.y);
      return;
    }
    // Update the animation state based on movement
    if (this.keys['a'] || this.keys['gamepad_left']) {
    
      if (this.keys['shift']) {
        this.dashLeft();
      } else {
        this.moveLeft();
      }
    
    } else if (this.keys['d'] || this.keys['gamepad_right']) {
    
      if (this.keys['shift']) {
        this.dashRight();
      } else {
        this.moveRight();
      }

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

    if ((this.keys['s'] && this.keys['p'])
      || (this.keys['gamepad_a_button'] && this.keys['gamepad_down'])) {
      this.startAnimIfNew(ANIM_CROUCH_PUNCH);
    }

    if ((this.keys['n'] && this.keys['m'])
      || (this.keys['gamepad_a_button'] && this.keys['gamepad_down'])) {
      if (this.currentAnimation != ANIM_COMBO && player.power >= 100) {
        this.startAnimIfNew(ANIM_COMBO);
        player.power = 0;
      }
    }

    // keys below here can be held, remember to check for currentAnim when returnTOIdle is used
    else if (this.keys['s'] || this.keys['gamepad_down']) {
      if (this.currentAnimation != ANIM_CROUCH_PUNCH) {
        this.startAnimIfNew(ANIM_CROUCH);
      }

    }
    else if (this.currentAnimation == ANIM_CROUCH) {
      this.currentAnimation = ANIM_IDLE;
    }

    if (this.keys['z'] || this.keys['gamepad_x_button']) {
      this.startAnimIfNew(ANIM_BLOCK);
    }
    else if (this.currentAnimation == ANIM_BLOCK) {
      this.currentAnimation = ANIM_IDLE;
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
    if (this.x < EDGE_BOUNDRY_PIXELS) {
      this.x = EDGE_BOUNDRY_PIXELS;
    }

    if (this.x + BODY_WIDTH > canvasWidth - EDGE_BOUNDRY_PIXELS) {
      this.x = canvasWidth - EDGE_BOUNDRY_PIXELS - BODY_WIDTH;
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
    if (this.currentAnimation !== ANIM_JUMP && this.currentAnimation !== ANIM_DAMAGE) {
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
    if (this.currentAnimation !== ANIM_JUMP && this.currentAnimation !== ANIM_DAMAGE) {
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

  dashLeft() {
    console.log("Dash left");
    if (this.currentAnimation !== ANIM_JUMP && this.currentAnimation !== ANIM_DAMAGE) {
      if (this.currentAnimation !== ANIM_WALK_BACKWARD) {
        this.currentAnimation = ANIM_WALK_BACKWARD;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
        this.walkSound.play();
      }
    }
    this.x -= DASH_SPEED;
  }

  dashRight() {
    console.log("Dash right");
    if (this.currentAnimation !== ANIM_JUMP && this.currentAnimation !== ANIM_DAMAGE) {
      if (this.currentAnimation !== ANIM_WALK_FORWARD) {
        this.currentAnimation = ANIM_WALK_FORWARD;
        this.frameNum = 0;
        this.timeTillNextFrame = 1 / ANIM_FPS;
        this.walkSound.play();
      }
    }
    this.x += DASH_SPEED;
  }

  startAnimIfNew(newAnim) {
    if (this.currentAnimation != newAnim) {
      this.currentAnimation = newAnim;
      this.frameNum = 0;
      this.timeTillNextFrame = 1 / ANIM_FPS;
      this.animReturnToIdle = true;
    }
  }


  died() {
    if (this.isAI) {
      fx.dieFX(this.x, this.y);
      this.robotDieSound.play();
    } else {
      fx.dieFX(this.x, this.y);
      this.playerDieSound.play();
    }
  }

  getCurrentAnimationFrameCount() {
    return
  }

  check_collisions(myOpponent) {
    if (!myOpponent) return;
    //let dist = Math.abs(this.x - myOpponent.x);
    let dx = myOpponent.x - this.x;
    let dy = myOpponent.y - this.y;
    let dist = Math.hypot(dx, dy);

    let beingBlocked = myOpponent.currentAnimation == ANIM_BLOCK;

    // prevent an attack from hitting multiple times or playing >1 sound
    // by only checking collisions when the animation just changed!
    if (this.lastFrameAnimation != this.currentAnimation) {
    } else {
      return; // do nothing!
    }
    this.lastFrameAnimation = this.currentAnimation;

    if (this.currentAnimation == ANIM_PUNCH) {

      // particle fx for every punch including misses:
      if (this.isAI) fx.punchFX(this.x + ROBOT_FIST_X, this.y + ROBOT_FIST_Y); else fx.punchFX(this.x + PLAYER_FIST_X, this.y + PLAYER_FIST_Y);

      if (dist < PUNCH_HIT_RANGE) { // close enough?
        if (beingBlocked) {
          this.punchHitSound.play(); // block sound
          if (this.isAI) fx.blockFX(this.x + ROBOT_FIST_X, this.y + ROBOT_FIST_Y); else fx.blockFX(this.x + PLAYER_FIST_X, this.y + PLAYER_FIST_Y);
        } else { // not blocked?
          myOpponent.health -= PUNCH_DAMAGE;
          this.punchHitSound.play(); // impact sound
          if (myOpponent == player) {
            screenshake(PLAYER_HIT_SCREENSHAKE_COUNT);
          } else {
            screenshake(ROBOT_HIT_SCREENSHAKE_COUNT);
          }

          if (this.AI) {
            fx.hitFX(this.x + ROBOT_FIST_X, this.y + ROBOT_FIST_Y);
            this.robotHurtSound.play();
          } else {
            this.hurtSound.play();
            fx.hitFX(this.x + PLAYER_FIST_X, this.y + PLAYER_FIST_Y);
          }

          myOpponent.startAnimIfNew(ANIM_DAMAGE);
          myOpponent.timeTillNextFrame = 1 / PUNCH_ANIM_FPS;


        }
      } else {
        this.punchSound.play(); // woosh
      }
    } // punch

    if (this.currentAnimation == ANIM_KICK) {

      // particle fx for every kick including misses:
      if (this.isAI) fx.kickFX(this.x + ROBOT_FOOT_X, this.y + ROBOT_FOOT_Y); else fx.kickFX(this.x + PLAYER_FOOT_X, this.y + PLAYER_FOOT_Y);

      if (dist < KICK_HIT_RANGE) { // close enough?
        if (beingBlocked) {
          this.kickHitSound.play(); // play block sfx
          if (this.isAI) fx.blockFX(this.x + ROBOT_FOOT_X, this.y + ROBOT_FOOT_Y); else fx.blockFX(this.x + PLAYER_FOOT_X, this.y + PLAYER_FOOT_Y);

        } else { // not blocked
          myOpponent.health -= KICK_DAMAGE;
          if (myOpponent == player) {
            screenshake(PLAYER_HIT_SCREENSHAKE_COUNT);
            fx.hitFX(this.x + ROBOT_FOOT_X, this.y + ROBOT_FOOT_Y);
          } else {
            screenshake(ROBOT_HIT_SCREENSHAKE_COUNT);
            fx.hitFX(this.x + PLAYER_FOOT_X, this.y + PLAYER_FOOT_Y);
          }
          this.kickHitSound.play(); // play hit sfx
          this.kickSound.play(); // woosh
        }

        myOpponent.startAnimIfNew(ANIM_DAMAGE);
        myOpponent.timeTillNextFrame = 1 / KICK_ANIM_FPS;

      } else {
        this.kickSound.play(); // woosh
      }

    } // kick

  } // check_collisions()

} // fighter class

const ANIM_FPS = 20; // how fast the animations play
const MOVE_SPEED = 10; // how fast the fighters move left and right
const JUMP_POWER = -10; // how much upward velocity jump gives you
const GRAVITY = 0.2; // how fast you accelerate while falling
const FLOOR_Y = 240; // lowest possible Y coordinate

const ANIM_IDLE = 0;
const ANIM_WALK_FORWARD = 1;
const ANIM_WALK_BACKWARD = 2;



class Fighter {
  constructor(whichInput, imageSrcs, initialX, initialY) {
    this.keys = {};
    this.getInput = whichInput;
    this.imageSources = imageSrcs; // Object with image sources for different animations
    this.images = {};
    this.x = initialX;
    this.y = initialY;
    this.speed = MOVE_SPEED;
    this.speedY = 0;
    this.frameNum = 0;
    this.animationFPS = ANIM_FPS;
    this.timeTillNextFrame = 1 / this.animationFPS;
    this.previousFrameTimestamp = performance.now() / 1000;
    this.currentAnimation = ANIM_IDLE;
    this.isReady = false;

    // Preload images for each animation state
    let imagesLoaded = 0;
    const totalImages = Object.keys(this.imageSources).length;
    for (let anim in this.imageSources) {
      this.images[anim] = new Image();
      this.images[anim].src = this.imageSources[anim];
      this.images[anim].onload = () => {
        imagesLoaded++;
        console.log(`Image ${anim} loaded`);
        if (imagesLoaded === totalImages) {
          // All images are loaded
          console.log('All images loaded');
          this.isReady = true;
        }
      };
    }

    // Define frame ranges and total frames for each animation state
    this.animations = {
      [ANIM_IDLE]: { start: 0, end: 58, frameCount: 59 },
      [ANIM_WALK_FORWARD]: { start: 0, end: 14, frameCount: 15 },
      [ANIM_WALK_BACKWARD]: { start: 0, end: 38, frameCount: 39 }
    };

    this.frameHeight = 1913 * 0.2; // This should match the actual frame height
  }

  draw() {
    if (!this.isReady) return;

    let now = performance.now() / 1000;
    let deltaTime = now - this.previousFrameTimestamp;
    this.previousFrameTimestamp = now;

    this.timeTillNextFrame -= deltaTime;
    if (this.timeTillNextFrame <= 0) {
      this.frameNum++;
      let animation = this.animations[this.currentAnimation];
      if (this.frameNum > animation.end) this.frameNum = animation.start;
      this.timeTillNextFrame = 1 / this.animationFPS;
    }

    let image = this.images[this.currentAnimation];
    if (!image.complete) {
      console.log('Image not complete', this.currentAnimation);
      return;
    }
    let frameW = image.width; // Assume each frame is full width
    let frameH = this.frameHeight;

    context.drawImage(image, 0, frameH * this.frameNum, frameW, frameH, this.x, this.y, frameW, frameH);
  }

  update(canvasWidth) {
    this.getInput();

    if (this.keys['a']) {
      this.moveLeft();
    } else if (this.keys['d']) {
      this.moveRight();
    } else {
      this.currentAnimation = ANIM_IDLE;
      this.frameNum = this.animations[this.currentAnimation].start; // Reset to start frame of idle
    }

    if (this.keys[' ']) {
      this.jump();
    }

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
    if (this.images[this.currentAnimation].width && this.x + this.images[this.currentAnimation].width > canvasWidth) {
      this.x = canvasWidth - this.images[this.currentAnimation].width;
    }
  }

  moveLeft() {
    this.x -= this.speed;
    this.currentAnimation = ANIM_WALK_BACKWARD;
    this.frameNum = this.animations[this.currentAnimation].start; // Reset animation frame
  }

  moveRight() {
    this.x += this.speed;
    this.currentAnimation = ANIM_WALK_FORWARD;
    this.frameNum = this.animations[this.currentAnimation].start; // Reset animation frame
  }

  jump() {
    if (this.y >= FLOOR_Y) {
      this.speedY = JUMP_POWER;
    }
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

window.onload = function() {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');

  const player = new Fighter(input_keyboard, {
    [ANIM_IDLE]: 'images/player_idle.png',
    [ANIM_WALK_FORWARD]: 'images/player_walk.png',
    [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png'
  }, PLAYER_START_X, PLAYER_START_Y);

  function draw() {
    if (player.isReady) {
      player.update(canvas.width);
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      player.draw(context);
    }

    requestAnimationFrame(draw);
  }

  draw();
};
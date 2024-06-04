const ANIM_FPS = 20; // how fast the animations play
const ANIM_FRAMECOUNT = 12; // how many frames in the spritesheet
const MOVE_SPEED = 10; // how fast the fighters move left and right
const JUMP_POWER = -10; // how much upward velocity jump gives you
const GRAVITY = 0.2; // how fast you accelerate while falling
const FLOOR_Y = 240; // lowest possible Y coordinate

class Fighter {

  constructor(whichInput, imageSrc, initialX, initialY) {
    this.keys = {};
    this.getInput = whichInput;
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
    this.speed = MOVE_SPEED;
    this.speedY = 0;
    this.frameNum = 0;
    this.frameCount = ANIM_FRAMECOUNT; 
    this.animationFPS = ANIM_FPS;
    this.timeTillNextFrame = 0;
    this.previousFrameTimestamp = 0;
  }

  draw() {

    // measure the elapsed time since last frame
    let now = performance.now() / 1000;
    let deltaTime = now - this.previousFrameTimestamp;
    this.previousFrameTimestamp = now;
    
    // change to the next frame if it is time
    this.timeTillNextFrame -= deltaTime;
    //console.log("frameNum="+this.frameNum+" deltaTime="+deltaTime.toFixed(2)+" timeTillNextFrame="+this.timeTillNextFrame.toFixed(2));
    if (this.timeTillNextFrame <= 0) {
      this.frameNum++;
      if (this.frameNum >= this.frameCount) this.frameNum = 0;
      this.timeTillNextFrame = 1 / this.animationFPS;
    }
    
    var frameW = this.image.width;
    var frameH = 1913 * 0.2;

    context.drawImage(this.image, 0, frameH * this.frameNum, frameW, frameH,
      this.x, this.y, frameW, frameH);
  }

  update(canvasWidth) {
    
    // can be input_keyboard, input_ai, etc
    this.getInput(); // update this.keys[]

    if (this.keys['a']) {
      this.moveLeft();
    }
    if (this.keys['d']) {
      this.moveRight();
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

    // Bound the fighter within the canvas
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.image.width && this.x + this.image.width > canvasWidth) {
      this.x = canvasWidth - this.image.width;
    }
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    if (this.y >= FLOOR_Y) {
      this.speedY = JUMP_POWER;
    }
  }
  
}
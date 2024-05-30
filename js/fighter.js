class Fighter {

  constructor(whichInput, imageSrc, initialX, initialY, speed) {
    this.keys = {};
    this.getInput = whichInput;
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
    this.speedY = 0;
    this.frameNum = 0;
    this.frameWait = 3;
    // the .png is 12 frames long but in the current art
    // it seems to loop best if we skip the last 5 frames
    // FIXME! set back to 12 when the animation is updated
    this.frameCount = 7; 
  }

  draw() {
    var frameW = this.image.width;
    var frameH = 1913 * 0.2;
    if (this.frameWait-- < 0) {
      this.frameNum++;
      if (this.frameNum >= this.frameCount) {
        this.frameNum = 0;
      }
      this.frameWait = 3;
    }
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
      this.speedY = -10;
    }
  }
  
}
class Robot {
  constructor(imageSrc, initialX, initialY) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
    this.speed = 10; 
  }

  draw(context) {
    if (context) {
      context.drawImage(this.image, this.x, this.y);
    } else {
      console.log("Context not provided for drawing the robot.");
    }
  }

  update(keys, canvasWidth) {
    if (keys['arrowleft']) {
      this.x -= this.speed;
    }
    if (keys['arrowright']) {
      this.x += this.speed;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.image.width > canvasWidth) {
      this.x = canvasWidth - this.image.width;
    }
  }
}
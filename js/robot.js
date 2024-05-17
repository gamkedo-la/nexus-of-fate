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
  
   update(keys) {
    if (keys['ArrowLeft']) {
      this.x -= this.speed;
    }
    if (keys['ArrowRight']) {
      this.x += this.speed;
    }
  }
}
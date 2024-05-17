class Robot {
  constructor(imageSrc, initialX, initialY) {
    this.image = new Image();
  
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
  }

  draw(context) {
    if (context) {
      context.drawImage(this.image, this.x, this.y);
    } else {
      console.log("Context not provided for drawing the robot.");
    }
  }
}
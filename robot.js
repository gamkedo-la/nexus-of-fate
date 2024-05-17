class Robot {
  constructor(imageSrc, initialX, initialY) {
    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
  }

  draw(context) {
    if (context) {
      context.drawImage(this.image, this.x, this.y);
    } else {
      console.error("Context not provided for drawing the robot.");
    }
  }
}
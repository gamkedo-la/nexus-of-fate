class Robot {
  constructor(imageSrc, initialX, initialY) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}
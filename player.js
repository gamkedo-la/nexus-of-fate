class Player {
  constructor(imageSrc, initialX, initialY, speed, jumpHeight, jumpDistance, jumpSpeed, gravity) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
    this.jumpHeight = jumpHeight;
    this.jumpDistance = jumpDistance;
    this.jumpSpeed = jumpSpeed;
    this.gravity = gravity;
    this.jumping = false;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}
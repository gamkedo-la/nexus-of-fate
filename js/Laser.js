class Laser {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 10;
    this.length = 20;
    this.active = true;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Deactivate the laser if it goes off screen
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.active = false;
    }
  }

  draw(context) {
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
    context.stroke();
  }
}
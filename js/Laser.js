class Laser {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 10;
    this.active = true;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Deactivate laser if it goes out of bounds
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.active = false;
    }
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + Math.cos(this.angle) * 20, this.y + Math.sin(this.angle) * 20);
    context.strokeStyle = 'red';
    context.lineWidth = 3;
    context.stroke();
  }
}

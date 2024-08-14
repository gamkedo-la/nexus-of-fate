const LASER_SPEED = 16; // was 35; slower speed so you can see it and duck in time
const LASER_LENGTH = 20; // note: sprite is not stretched, only red line is

var laserSprite = new Image();
laserSprite.src = "images/laser_bolt.png";
laserSprite.onload = function() { this.loaded=true; }

class Laser {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = LASER_SPEED;
    this.length = LASER_LENGTH;
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

  draw() {
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
    context.stroke();

    if (laserSprite.loaded) drawBitmapCenteredAtLocationWithRotation(laserSprite,this.x,this.y,this.angle);

  }
}
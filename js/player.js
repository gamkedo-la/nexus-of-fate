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
	this.frameNum = 0;
	this.frameWait = 3;
	this.frameCount = 19;
  }

  draw(context) {
	var frameW = this.image.width;
	var frameH =  1913 * 0.2;
	if(this.frameWait-- < 0){
		this.frameNum++;
		if(this.frameNum >= this.frameCount){
			this.frameNum = 0;			
		}
		this.frameWait = 3;
	}
    context.drawImage(this.image,0,frameH * this.frameNum,frameW,frameH,
			this.x, this.y,frameW,frameH);
  }
  
   update(keys) {
    if (keys['a'] || keys['A']) {
      this.moveLeft();
    }
    if (keys['d'] || keys['D']) {
      this.moveRight();
    }
  }

  moveLeft() {
    if (!this.jumping || this.allowAirControl) {
      this.x -= this.speed;
    }
  }

  moveRight() {
    if (!this.jumping || this.allowAirControl) {
      this.x += this.speed;
    }
  }
  
  jump() {
    if (!this.jumping) {
      this.jumping = true;
      var originalX = this.x;
      var originalY = this.y;
      var jumpStep = 0;
      var jumpInterval = setInterval(() => {
        jumpStep++;
        var jumpHeightOffset = Math.sin((Math.PI * jumpStep) / this.jumpDistance);
        this.x = originalX + (jumpStep * this.speed); 
        this.y = originalY - (this.jumpHeight * jumpHeightOffset); 
        if (jumpStep >= this.jumpDistance / this.speed) { 
          clearInterval(jumpInterval);
          this.jumping = false;
        }
      }, this.jumpSpeed);
    }
  }
}
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
}
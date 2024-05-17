class Player {
  constructor(imageSrc, initialX, initialY, speed) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
	this.speedY = 0;
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
	this.y += this.speedY;
	if(this.y > FLOOR_Y){
		this.y = FLOOR_Y;
		this.speedY = 0;
	} else{
		this.speedY += GRAVITY;
	}
  }

  moveLeft() {
	this.x -= this.speed;
  }

  moveRight() {
	this.x += this.speed;
  }
  
  jump() {
	  
	  if(this.y >= FLOOR_Y){
		  this.speedY = -10;
	  }
   
  }
}
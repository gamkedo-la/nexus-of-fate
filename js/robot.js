function robot_AI(robotkeys) {
    
    // keep doing whatever we were doing
    if (Math.random() > 0.1) return; 
    
    // select a new key to hold down for a while
    let choice = Math.random();
    if (choice < 0.11) {
        //console.log("robot is going to move left!");
        robotkeys['a'] = true;
        robotkeys['d'] = false;
    }
    else if (choice < 0.2) {
        //console.log("robot is going to move right!");
        robotkeys['a'] = false;
        robotkeys['d'] = true;
    } else { // 80% of the time:
        //console.log("robot is going to stand idle!");
        robotkeys['a'] = false;
        robotkeys['d'] = false;
    }
}

// currently unused - see notes in main.js line 10
class Robot {
  constructor(imageSrc, initialX, initialY) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = initialX;
    this.y = initialY;
    this.speed = 10; 
  }

  draw(context) {
    if (context) {
      context.drawImage(this.image, this.x, this.y);
    } else {
      console.log("Context not provided for drawing the robot.");
    }
  }

  update(keys, canvasWidth) {
    if (keys['arrowleft']) {
      this.x -= this.speed;
    }
    if (keys['arrowright']) {
      this.x += this.speed;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.image.width > canvasWidth) {
      this.x = canvasWidth - this.image.width;
    }
  }
}
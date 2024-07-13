function input_ai() {
  // Random movement for robot with smoothing and flying effect
robot.speed = 2;
robot.direction = 1; // 1 for forward, -1 for backward
robot.framesToChangeDirection = 0;
robot.baseY = FLOOR_Y - 100; // Adjust the base Y position for flying effect
robot.angle = 0;
robot.update = function(canvasWidth) {
    if (this.framesToChangeDirection <= 0) {
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.framesToChangeDirection = Math.floor(Math.random() * 60) + 30; // Change direction every 30 to 90 frames
    } else {
        this.framesToChangeDirection--;
    }

    this.x += this.direction * this.speed;

    // Vertical flying effect using a sinusoidal function
    this.angle += 0.05;
    this.y = this.baseY + Math.sin(this.angle) * 20;

    // Ensure the robot stays within the canvas boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > canvasWidth) this.x = canvasWidth;

    // Call the original update logic, if any
    // this.originalUpdate(canvasWidth); // Uncomment if there was an original update method
};

  
}
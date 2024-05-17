class RobotMovement {
  constructor(robot) {
    this.robot = robot;
    this.speed = 10; 
  }

  update(keys) {
    if (keys['ArrowLeft']) {
      this.robot.x -= this.speed;
    }
    if (keys['ArrowRight']) {
      this.robot.x += this.speed;
    }
  }
}
class RobotMovement {
  constructor(robot) {
    this.robot = robot;
    this.speed = 10; // Example speed for the robot
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
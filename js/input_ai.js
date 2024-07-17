function input_ai() {
    // Movement and flying effect for the robot
    robot.speed = 2;
    robot.baseY = FLOOR_Y - 100; // Adjust the base Y position for flying effect
    robot.angle = 0;

    robot.update = function(canvasWidth, player) {
        // Calculate the distance and direction to the player
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let distanceToPlayer = Math.hypot(dx, dy);

        // If the robot is very close to the player, stop moving
        if (distanceToPlayer < 10) { // 10 is the threshold distance, adjust as needed
            this.speed = 0;
        } else {
            this.speed = 2;

            // Normalize direction to get unit vector
            let directionX = dx / distanceToPlayer;
            let directionY = dy / distanceToPlayer;

            // Move the robot towards the player
            this.x += directionX * this.speed;
            this.baseY += directionY * this.speed; // Adjust baseY for vertical movement
        }

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
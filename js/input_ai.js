const AI_TOO_CLOSE_DIST = 250;

// this function becomes robot.update()
function ai_update() {

    // Calculate the distance and direction to the player
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distanceToPlayer = Math.hypot(dx, dy);

    //console.log("distance to player: " + distanceToPlayer.toFixed(1));
    
    // If the robot is very close to the player, stop moving
    if (distanceToPlayer < AI_TOO_CLOSE_DIST) {
        // Move the robot away from the player
        this.speed = -2; // if this is zero we just stop
        // but when the robot just stops, player gets trapped
        // in an region that always shrinks
    } else {
        // Move the robot towards the player
        this.speed = 2;
    }
    
    // move the robot (unless speed is zero)
    let angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle)*this.speed;
    this.baseY += Math.sin(angle)*this.speed;

    // Vertical flying effect using a sinusoidal function
    this.angle += 0.05;
    this.y = this.baseY + Math.sin(this.angle) * 20;

    // Ensure the robot stays within the canvas boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width) this.x = canvas.width;
}







function input_ai() {
    // currently unused.
    // this function used to control the AI with keypresses
    // and would update this.keys[] array
    // so it followed all the same fighter.js logic as the player
    // but since we've decided to have the robot use different logic
    // it made no sense to have AI control itself like a player
}


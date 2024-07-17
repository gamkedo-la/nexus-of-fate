var fightRoundNumber = 1;
var fightRoundMax = 3;
var fightDurationSeconds = 90;
var fightTimeRemaining = fightDurationSeconds;
var frameTimestamp = performance.now();
var previousTimestamp = frameTimestamp;
var deltaTime = 0; // seconds since previous frame

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const mainMenu = new MainMenu(context);

const player = new Fighter(input_keyboard, {
    [ANIM_IDLE]: 'images/player_idle.png',
    [ANIM_WALK_FORWARD]: 'images/player_walk.png',
    [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png',
    [ANIM_CROUCH]: 'images/player_crouch.png',
    [ANIM_JUMP]: 'images/player_jump.png',
    [ANIM_KICK]: 'images/player_kick.png',
    [ANIM_PUNCH]: 'images/player_punch.png',
    [ANIM_CROUCH_PUNCH]: 'images/player_punch.png',
    [ANIM_DEATH]: 'images/player_death.png',
    [ANIM_BLOCK]: 'images/player_block.png'
}, 100, FLOOR_Y);

const robot = new Fighter(input_ai, {
    [ANIM_IDLE]: 'images/robot_idle.png',
}, 2000, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;
player.AI = false;
robot.AI = true;

// Initialize robot position
robot.y = FLOOR_Y; // Initial Y position

// Movement and flying effect for the robot
robot.speed = 2;
robot.baseY = FLOOR_Y - 100; // Adjust the base Y position for flying effect
robot.angle = 0;

robot.update = function(canvasWidth, playerX, playerY) {
    // Calculate the distance and direction to the player
    let dx = playerX - robot.x;
    let dy = playerY - robot.y;
    let distanceToPlayer = Math.hypot(dx, dy);

    // If the robot is very close to the player, stop moving
    if (distanceToPlayer < 10) { // 10 is the threshold distance, adjust as needed
        robot.speed = 0;
    } else {
        robot.speed = 2;

        // Normalize direction to get unit vector
        let directionX = dx / distanceToPlayer;
        let directionY = dy / distanceToPlayer;

        // Move the robot towards the player
        robot.x += directionX * robot.speed;
        robot.baseY += directionY * robot.speed; // Adjust baseY for vertical movement
    }

    // Vertical flying effect using a sinusoidal function
    robot.angle += 0.05;
    robot.y = robot.baseY + Math.sin(robot.angle) * 20;

    // Ensure the robot stays within the canvas boundaries
    if (robot.x < 0) robot.x = 0;
    if (robot.x > canvasWidth) robot.x = canvasWidth;

    // Call the original update logic, if any
    // robot.originalUpdate(canvasWidth); // Uncomment if there was an original update method
};

window.onload = function() {
   (function draw() {
        frameTimestamp = performance.now();
        deltaTime = frameTimestamp - previousTimestamp;
        previousTimestamp = frameTimestamp;

        if (!mainMenu.show()) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            fightTimeRemaining -= deltaTime / 1000;
            if (fightTimeRemaining <= 0) {
                fightTimeRemaining = 0;
                // TODO: change rounds, reset health, end fight, etc
            }

            background.draw();
            fog.draw();
            healthBar.draw();
            player.update(canvas.width);
            robot.update(canvas.width, player.x, player.y);
            player.draw();
            robot.draw();
        }

        requestAnimationFrame(draw);
   })();
};
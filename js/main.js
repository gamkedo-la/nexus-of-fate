var fightRoundNumber = 1;
var fightRoundMax = 3;
var fightDurationSeconds = 90;
var fightTimeRemaining = fightDurationSeconds;
var frameTimestamp = performance.now();
var previousTimestamp = frameTimestamp;
var deltaTime = 0; // seconds since previous frame

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

var mainMenuImage = document.createElement("img"); // create element for main menu background
mainMenuImage.src = "images/mainmenu95.png"; // attach source for main menu
let onMainMenu = true;

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

window.onload = function() {
    // Load Main Menu Title Art
    context.drawImage(mainMenuImage, 0, 0); // load image for main menu
    addEventListener("click", (event) => {
        if (userIsOnStartText(event)) {
            onMainMenu = false;
            draw();
        }
    });

    // Cursor Styling when over Start Text
    addEventListener("mousemove", (event) => {
        if (userIsOnStartText(event) && onMainMenu) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    });

 function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    frameTimestamp = performance.now();
    deltaTime = frameTimestamp - previousTimestamp;
    previousTimestamp = frameTimestamp;
    fightTimeRemaining -= deltaTime/1000;
    if (fightTimeRemaining <= 0) {
        fightTimeRemaining = 0;
        // TODO: change rounds, reset health, end fight, etc
    }
    
    background.draw();
    fog.draw();
    healthBar.draw();
    player.update(canvas.width);
    robot.update(canvas.width);
    player.draw();
    robot.draw();
    requestAnimationFrame(draw);
}

};

function userIsOnStartText(mouseClick) {
    // current Start text: clientX(610-900); clientY(500-600)
    return (mouseClick.clientX >= 610 && mouseClick.clientX <= 900 &&
        mouseClick.clientY >= 500 && mouseClick.clientY <= 600);
}
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

const player = new Player(input_keyboard, {
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

const robot = new Robot(input_ai, {
  [ANIM_IDLE]: 'images/robot_idle.png', 
  [ANIM_KICK]: 'images/robot_kick.png',
  [ANIM_PUNCH]: 'images/robot_punch.png',

}, 2000, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;

window.onload = function () {
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
      check_gamepad();
      player.update(canvas.width);
      robot.update();
      player.draw();
      robot.draw();
    }

    requestAnimationFrame(draw);
  })();
};

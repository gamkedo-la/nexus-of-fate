var fightRoundNumber = 1;
var fightRoundMax = 3;
var fightDurationSeconds = 90;
var fightTimeRemaining = fightDurationSeconds;
var frameTimestamp = performance.now();
var previousTimestamp = frameTimestamp;
var deltaTime = 0; // seconds since previous frame
var debugSoundVolume = true;

var roundStarted = false;
var roundStartCountdownTick = 120;
var roundStartCountdown = 3;

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const mainMenu = new MainMenu(canvas);

const player = new Player(input_keyboard, {
  [ANIM_IDLE]: 'images/player_idle.png',
  [ANIM_WALK_FORWARD]: 'images/player_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png',
  [ANIM_CROUCH]: 'images/player_crouch.png',
  [ANIM_JUMP]: 'images/player_jump.png',
  [ANIM_KICK]: 'images/player_kick.png',
  [ANIM_PUNCH]: 'images/player_punch.png',
  [ANIM_CROUCH_PUNCH]: 'images/crouch_punch.png',
  [ANIM_DEATH]: 'images/player_death.png',
  [ANIM_BLOCK]: 'images/player_block.png',
  [ANIM_COMBO]: 'images/player_combo.png',
  [ANIM_DAMAGE]: 'images/player_damage.png',


}, 100, FLOOR_Y);

const robot = new FighterRobot(input_ai, {
  [ANIM_IDLE]: 'images/robot_idle.png',
  [ANIM_KICK]: 'images/robot_kick.png',
  [ANIM_PUNCH]: 'images/robot_punch.png',
  [ANIM_DAMAGE]: 'images/robot_damage.png'


}, 2000, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;

window.onload = function () {
  (function draw() {
    frameTimestamp = performance.now();
    deltaTime = frameTimestamp - previousTimestamp;
    previousTimestamp = frameTimestamp;

    if (!mainMenu.show()) {

      updateScreenshake();

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (roundStarted) {
        fightTimeRemaining -= deltaTime / 1000;
        if (fightTimeRemaining <= 0) {
          fightTimeRemaining = 0;
          // TODO: change rounds, reset health, end fight, etc
        }

        check_gamepad();
        player.update(canvas.width);
        robot.update();
        powerBar.update(deltaTime);
        player.check_collisions(robot);
        robot.check_collisions(player);
        fx.update();
      }
      else {
        
        if (!music_is_playing) { music.play(); music_is_playing = true; }
        
        if (roundStartCountdownTick < 0) {
          roundStarted = true;
        }
        else {
          roundStartCountdownTick--;
          if (roundStartCountdownTick % 30 == 0) {
            roundStartCountdown--;
          }
        }
      }

      background.draw();

      // 3, 2, 1, FIGHT!
      if (roundStartCountdownTick > 0) {
        const fontSize = 100;
        context.font = `${fontSize}px Tohoma bold`;
        context.fillStyle = "white";
        var drawn = roundStartCountdown > 0 ? roundStartCountdown : "FIGHT!";
        context.fillText(drawn, canvas.width / 2 - context.measureText(drawn).width / 2, canvas.height / 2);
      }

      fog.draw();
      healthBar.draw();
      fx.draw();
      player.draw();
      robot.draw();
      powerBar.draw();

    }
    requestAnimationFrame(draw);
  })();
};

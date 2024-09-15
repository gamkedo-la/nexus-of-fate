const ROUND_START_TIME = 90;
const FRAME_DELAY_BEFORE_RESET = 150;
var resetRoundTimer = -1;
var fightRoundNumber = 1;
var fightRoundMax = 3;
var fightDurationSeconds = ROUND_START_TIME;
var fightTimeRemaining = fightDurationSeconds;
var frameTimestamp = performance.now();
var previousTimestamp = frameTimestamp;
var deltaTime = 0; // seconds since previous frame
var debugSoundVolume = true;

var roundStarted = false;
var roundStartCountdownTick = 120;
var roundStartCountdown = 3;
var roundStartCountdownSound = new Audio("audio/3-2-1-fight.mp3");

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const mainMenu = new MainMenu(canvas);
const PLAYER_START_X = 100;
const ROBOT_START_X = 2000;
const player = new Player(input_keyboard, {
  [ANIM_IDLE]: 'images/player_idle.png',
  [ANIM_WALK_FORWARD]: 'images/player_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png',
  [ANIM_CROUCH]: 'images/player_crouch.png',
  [ANIM_JUMP]: 'images/player_jump.png',
  [ANIM_KICK]: 'images/player_kick.png',
  [ANIM_PUNCH]: 'images/player_punch.png',
  [ANIM_CROUCH_PUNCH]: 'images/crouch_punch.png',
  [ANIM_BLOCK]: 'images/player_block.png',
  [ANIM_COMBO]: 'images/player_combo.png',
  [ANIM_DAMAGE]: 'images/player_damage.png',
}, PLAYER_START_X, FLOOR_Y);

const robot = new FighterRobot(input_ai, {
  [ANIM_IDLE]: 'images/robot_idle.png',
  [ANIM_KICK]: 'images/robot_kick.png',
  [ANIM_PUNCH]: 'images/robot_punch.png',
  [ANIM_DAMAGE]: 'images/robot_damage.png'
}, ROBOT_START_X, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;

function startRoundEndTimer() {
  if (resetRoundTimer <= 0) {
    resetRoundTimer = FRAME_DELAY_BEFORE_RESET;
  }
}

function advanceRound () {
  fightTimeRemaining = ROUND_START_TIME;
  // TODO: change rounds, reset health, end fight, etc
  robot.health = MAX_HEALTH;
  player.health = MAX_HEALTH;
  player.x = PLAYER_START_X;
  robot.x = ROBOT_START_X;
  resetRoundTimer = -1;
  fightRoundNumber +=1;
  console.log("Round" + fightRoundNumber);
  if (fightRoundNumber == fightRoundMax) {
    console.log("Reset Game");
  }
}

window.onload = function () {
	
 // Helps it not blur from the scaling:
	context.mozImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;
	context.msImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;
	
  (function draw() {
    frameTimestamp = performance.now();
    deltaTime = frameTimestamp - previousTimestamp;
    previousTimestamp = frameTimestamp;

    if (!mainMenu.show()) {

      updateScreenshake();

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (roundStarted) {
        if(resetRoundTimer >=0) {
          resetRoundTimer--;
          if(resetRoundTimer == 0){
            advanceRound();
          }
        }
        if (player.health > 0 && robot.health > 0) { 
          fightTimeRemaining -= deltaTime / 1000;
          if (fightTimeRemaining <= 0) {
            fightTimeRemaining = 0;
            startRoundEndTimer();
          }
          
        }
        if ( player.health < 0 || robot.health < 0) {
          startRoundEndTimer();
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
        
       // if (INTRO_music_is_playing) { INTRO_music.pause(); INTRO_music_is_playing = false; } 
      //  if (!music_is_playing) { music.play(); music_is_playing = true; }
        
        if (roundStartCountdownTick < 0) {
          roundStarted = true;
        }
        else {
          
          // 3... 2... 1... FIGHT!
          if (roundStartCountdown==3) roundStartCountdownSound.play();

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

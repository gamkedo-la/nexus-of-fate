var canvas, context, player, robot;

const PLAYER_START_X = 52 ;
const PLAYER_START_Y = FLOOR_Y ;
const OPPONENT_START_X = 600;
const OPPONENT_START_Y = FLOOR_Y;

window.onload = function() {

  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');
  
  player = new Fighter(input_keyboard, {
    [ANIM_IDLE]: 'images/player_idle.png',
    [ANIM_WALK_FORWARD]: 'images/player_walk.png',
    [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png'
  }, PLAYER_START_X, PLAYER_START_Y);
  
  robot = new Fighter(input_ai, 'images/robot_walk.png', OPPONENT_START_X, OPPONENT_START_Y);

  function draw() {
    
    player.update();
    robot.update();

    background.draw();
    player.draw();
    robot.draw();

    requestAnimationFrame(draw);
  }

  draw();
};
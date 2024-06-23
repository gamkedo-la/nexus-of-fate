 const canvas = document.getElementById('myCanvas');
 const context = canvas.getContext('2d');
  
  const player = new Fighter(input_keyboard, {
  [ANIM_IDLE]: 'images/player_idle.png',
  [ANIM_WALK_FORWARD]: 'images/player_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png',
  [ANIM_CROUCH]: 'images/player_crouch.png',
  [ANIM_JUMP]: 'images/player_jump.png',
  [ANIM_KICK]: 'images/player_jump.png',
  [ANIM_PUNCH]: 'images/player_punch.png',
  [ANIM_CROUCH_PUNCH]: 'images/player_punch.png',
  [ANIM_DEATH]: 'images/player_death.png'






}, 100, FLOOR_Y);

const robot = new Fighter(input_ai, {
  [ANIM_IDLE]: 'images/robot_idle.png',
  [ANIM_WALK_FORWARD]: 'images/robot_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/robot_walk.png',
  [ANIM_JUMP]: 'images/player_jump.png'
}, 300, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;
player.AI = false;
robot.AI = true;

window.onload = function() {
 
  
  function draw() {
    player.update(canvas.width);
    robot.update(canvas.width);
    //context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	background.draw();
    player.draw();
    robot.draw();
    requestAnimationFrame(draw);
  }

  draw();
};
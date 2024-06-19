const player = new Fighter(input_keyboard, {
  [ANIM_IDLE]: 'images/player_idle.png',
  [ANIM_WALK_FORWARD]: 'images/player_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png',
  [ANIM_CROUCH]: 'images/player_crouch.png',
  [ANIM_JUMP]: 'images/player_jump.png',
  [ANIM_KICK]: 'images/player_jump.png',
  [ANIM_PUNCH]: 'images/player_punch.png',
  [ANIM_CROUCH_PUNCH]: 'images/player_punch.png'





}, 100, FLOOR_Y);

const robot = new Fighter(input_ai, {
  [ANIM_IDLE]: 'images/robot_idle.png',
  [ANIM_WALK_FORWARD]: 'images/robot_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/robot_walk.png'
}, 300, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;

window.onload = function() {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');
  
  function draw() {
    player.update(canvas.width);
    robot.update(canvas.width);
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    player.draw(context);
    robot.draw(context);
    requestAnimationFrame(draw);
  }

  draw();
};
var canvas, context, player, robot;

window.onload = function() {

  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');
  
  player = new Fighter(input_keyboard, 'images/player_walk.png', 52, FLOOR_Y, MOVE_SPEED);
  robot = new Fighter(input_ai, 'images/robot_walk.png', 600, FLOOR_Y, MOVE_SPEED);

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
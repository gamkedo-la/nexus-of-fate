var canvas, context, player, robot;
const GRAVITY = 0.2;
const FLOOR_Y = 240;

window.onload = function() {

  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');
  player = new Fighter(input_keyboard, 'images/player_walk.png', 52, FLOOR_Y, 12);
  robot = new Fighter(input_ai, 'images/robot_walk.png', 600, FLOOR_Y, 10);

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
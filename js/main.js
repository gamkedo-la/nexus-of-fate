const GRAVITY = 0.2;
const FLOOR_Y = 240;

window.onload = function() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  var player = new Player('images/player_walk.png', 52, FLOOR_Y, 10);
  
  // mcfunkypants recommendation:
  // (feel free to ignore! =)
  
  // discard the robot class and make the robot a kind of
  // player with AI instead if keyboard input.
  // this way we don't have to duplicate TONS
  // of code from playerjs to robot.js,
  // it will save pain and suffering if both entities
  // are the same class follow the same rules.
  // this would result in half as many bugs!
  // (because the game source code will be half the size!!!)
  
  // old way: feel free to put back if you prefer
  // var robot = new Robot('images/robot_test.png', 600, FLOOR_Y);

  // let the robot be a kind of player
  var robot = new Player('images/robot_walk.png', 600, FLOOR_Y);

  var keys = {};

  window.addEventListener('keydown', function(e) {
    keys[e.key.toLowerCase()] = true;

    if (e.key === ' ') {
      player.jump();
    }
  });

  window.addEventListener('keyup', function(e) {
    keys[e.key.toLowerCase()] = false;
  });

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#deb887"; 
    context.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.7);

    context.fillStyle = "darkblue"; 
    context.fillRect(0, 0, canvas.width, canvas.height * 0.3); 

    context.beginPath();
    context.arc(canvas.width * 0.8, canvas.height * 0.2, 50, 0, 2 * Math.PI); 
    context.fillStyle = "white"; 
    context.fill();
    context.closePath();

    player.update(keys, canvas.width);
    robot.update(keys, canvas.width);

    player.draw(context);
    robot.draw(context);

    requestAnimationFrame(draw);
  }

  draw();
};
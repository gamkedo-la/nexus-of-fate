const GRAVITY = 0.2;
const FLOOR_Y = 242;

window.onload = function() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  var player = new Player('images/player_combo.png', 50, FLOOR_Y, 10);
  var robot = new Robot('images/robot_test.png',600, FLOOR_Y);

  var keys = {};

  window.addEventListener('keydown', function(e) {
    keys[e.key.toLowerCase()] = true;
    
    if (e.key.toLowerCase() === ' ') {
      player.jump();
    }


  });

  window.addEventListener('keyup', function(e) {
    keys[e.key.toLowerCase()] = false;
  });

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#deb887"; 
    context.fillRect(0, canvas.height * 0.9, canvas.width, canvas.height * 0.6);

    context.fillStyle = "darkblue"; 
    context.fillRect(0, 0, canvas.width, canvas.height * 0.5); 

    context.beginPath();
    context.arc(canvas.width * 0.8, canvas.height * 0.2, 50, 0, 2 * Math.PI); 
    context.fillStyle = "white"; 
    context.fill();
    context.closePath();

    player.update(keys);
	robot.update(keys);

    player.draw(context);
    robot.draw(context);

    requestAnimationFrame(draw);
  }

  draw();
};
window.onload = function() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  var player = new Player('Player.png', 50, 242, 10, 1500, 100, 5, 2);
  var robot = new Robot('Robot.png', canvas.width - 150, 242);
  var playerMovement = new PlayerMovement(player);
  var playerJump = new PlayerJump(player, canvas);

  var keys = {};

  window.addEventListener('keydown', function(e) {
    keys[e.key.toLowerCase()] = true;
    
    if (e.key.toLowerCase() === ' ') {
      playerJump.jump();
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
    context.fillRect(0, 0, canvas.width, 20 * 0.5); 

    context.beginPath();
    context.arc(canvas.width * 0.8, canvas.height * 0.2, 50, 0, 2 * Math.PI); 
    context.fillStyle = "white"; 
    context.fill();
    context.closePath();

    playerMovement.update(keys);

    player.draw(context);
    robot.draw(context);

    requestAnimationFrame(draw);
  }

  draw();
};
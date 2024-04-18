window.onload = function() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  var player = new Player('Player.png', 50, 242, 10, 200, 50, 5, 2);
  var robot = new Robot('robot.png', canvas.width - 150, 242);

  var playerMovement = new PlayerMovement(player);
  var robotMovement = new RobotMovement(robot);
  var playerJump = new PlayerJump(player, canvas);

  var keys = {};

  window.addEventListener('keydown', function(event) {
    keys[event.key] = true;
    if (event.key === ' ' && !playerJump.jumping) { 
      playerJump.jump();
    }
  });

  window.addEventListener('keyup', function(event) {
    keys[event.key] = false;
  });

  function update() {
    playerMovement.update(keys);
    robotMovement.update(keys);

    if (player.y < 242) {
      player.y += player.gravity;
    } else {
      player.y = 242; 
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    robot.draw(context);

    requestAnimationFrame(update);
  }

  player.image.onload = function() {
    robot.image.onload = function() {
      update();
    };
  };
};
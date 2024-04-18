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
    if (event.key === ' ' && !playerJump.jumping) { // Check if spacebar is pressed and not already jumping
      playerJump.jump();
    }
  });

  window.addEventListener('keyup', function(event) {
    keys[event.key] = false;
  });

  function update() {
    playerMovement.update(keys);
    robotMovement.update(keys);

    // Apply gravity to bring the player back to the ground
    if (player.y < 242) {
      player.y += player.gravity;
    } else {
      player.y = 242; // Ensure the player is exactly at the ground level
    }

    // Redraw the images
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    robot.draw(context);

    // Call update again on the next frame
    requestAnimationFrame(update);
  }

  player.image.onload = function() {
    robot.image.onload = function() {
      // Start the game loop
      update();
    };
  };
};
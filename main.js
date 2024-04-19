window.onload = function() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  var player = new Player('Player.png', 50, 242, 10, 1500, 100, 5, 2);
  var robot = new Robot('robot.png', canvas.width - 150, 242);

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    player.draw(context);
    robot.draw(context);

    requestAnimationFrame(draw);
  }

  draw();
};
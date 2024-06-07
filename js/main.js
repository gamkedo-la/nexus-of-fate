window.onload = function() {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');

  const player = new Fighter(input_keyboard, {
    [ANIM_IDLE]: 'images/player_idle.png',
    [ANIM_WALK_FORWARD]: 'images/player_walk.png',
    [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png'
  }, 100, FLOOR_Y);

  function draw() {
    player.update(canvas.width);
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    player.draw(context);
    requestAnimationFrame(draw);
  }

  draw();
};
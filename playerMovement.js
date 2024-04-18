class PlayerMovement {
  constructor(player) {
    this.player = player;
  }

  update(keys) {
    if (keys['a'] || keys['A']) {
      if (!this.player.jumping) { // Only allow horizontal movement if not jumping
        this.player.x -= this.player.speed; // Move player left
      }
    }
    if (keys['d'] || keys['D']) {
      if (!this.player.jumping) { // Only allow horizontal movement if not jumping
        this.player.x += this.player.speed; // Move player right
      }
    }
  }
}
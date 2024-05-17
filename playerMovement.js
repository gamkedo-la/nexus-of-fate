class PlayerMovement {
  constructor(player) {
    this.player = player;
  }

  update(keys) {
    if (keys['a'] || keys['A']) {
      this.moveLeft();
    }
    if (keys['d'] || keys['D']) {
      this.moveRight();
    }
  }

  moveLeft() {
    if (!this.player.jumping || this.allowAirControl) {
      this.player.x -= this.player.speed;
    }
  }

  moveRight() {
    if (!this.player.jumping || this.allowAirControl) {
      this.player.x += this.player.speed;
    }
  }
}
class PlayerMovement {
  constructor(player) {
    this.player = player;
  }

  update(keys) {
    if (keys['a'] || keys['A']) {
      if (!this.player.jumping) { 
        this.player.x -= this.player.speed; 
      }
    }
    if (keys['d'] || keys['D']) {
      if (!this.player.jumping) { 
        this.player.x += this.player.speed; 
      }
    }
  }
}
class PlayerJump {
  constructor(player, canvas) {
    this.player = player;
    this.canvas = canvas;
    this.jumping = false;
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      var originalX = this.player.x;
      var originalY = this.player.y;
      var jumpStep = 0;
      var jumpInterval = setInterval(() => {
        jumpStep++;
        var jumpHeightOffset = Math.sin((Math.PI * jumpStep) / this.player.jumpDistance);
        this.player.x = originalX + (jumpStep * this.player.speed); // Horizontal movement
        this.player.y = originalY - (this.player.jumpHeight * jumpHeightOffset); // Vertical movement
        if (jumpStep >= this.player.jumpDistance / this.player.speed) { // Divide by speed to adjust timing
          clearInterval(jumpInterval);
          this.jumping = false;
        }
      }, this.player.jumpSpeed);
    }
  }
}
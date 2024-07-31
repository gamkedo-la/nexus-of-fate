var bgImage1, bgImage5, bgImage6, cloudImage, fogImage, leftBorderImage, rightBorderImage, healthbarBackground, powerbarBackground;

var background = {
    draw: function() {
        if (!bgImage1) { 
            bgImage1 = new Image();
            bgImage1.src = "images/background1.png";
            bgImage1.onload = function() { this.loaded = true; }
        }
        if (!bgImage5) { 
            bgImage5 = new Image();
            bgImage5.src = "images/background5.png";
            bgImage5.onload = function() { this.loaded = true; }
        }
        if (!bgImage6) { 
            bgImage6 = new Image();
            bgImage6.src = "images/background6.png";
            bgImage6.onload = function() { this.loaded = true; }
        }
        if (!cloudImage) { 
            cloudImage = new Image();
            cloudImage.src = "images/clouds.png";
            cloudImage.onload = function() { this.loaded = true; }
        }
        if (!leftBorderImage) { 
            leftBorderImage = new Image();
            leftBorderImage.src = "images/debris-left.png";
            leftBorderImage.onload = function() { this.loaded = true; }
        }
        if (!rightBorderImage) { 
            rightBorderImage = new Image();
            rightBorderImage.src = "images/debris-right.png";
            rightBorderImage.onload = function() { this.loaded = true; }
        }

        if (bgImage1.loaded) context.drawImage(bgImage1, -player.x / 7, 0);
        context.globalAlpha = 0.1;
        if (cloudImage.loaded) context.drawImage(cloudImage, Math.sin(performance.now() / 32000) * 1000 - 1000 - player.x / 7, 0);
        context.globalAlpha = 1;
        if (bgImage5.loaded) context.drawImage(bgImage5, -player.x / 3, 0);
        if (bgImage6.loaded) context.drawImage(bgImage6, -player.x / 2.5, 0);

        if (leftBorderImage.loaded) context.drawImage(leftBorderImage, -player.x / 2.5 - 400, canvas.height - 640);
        if (rightBorderImage.loaded) context.drawImage(rightBorderImage, -player.x / 2.5 + 1500, canvas.height - 270);
    }
};

var fog = { 
    draw: function() {
        if (!fogImage) { 
            fogImage = new Image();
            fogImage.src = "images/fog.png";
            fogImage.onload = function() { this.loaded = true; }
        }

        if (fogImage.loaded) {
            context.drawImage(fogImage, Math.sin(performance.now() / 64000) * 1000 - 1000 - player.x, canvas.height - 250 + Math.sin(performance.now() / 33000) * 100);
            context.drawImage(fogImage, Math.sin(performance.now() / 88000) * -1234 - 1000 - player.x, canvas.height - 200 + Math.sin(performance.now() / 66000) * -100);
            context.drawImage(fogImage, Math.sin(performance.now() / 99000) * 1000 - 1000 - player.x, canvas.height - 150 + Math.sin(performance.now() / 99000) * -100);
        }
    }
};

var healthBar = {
    width: 200,
    height: 25,
    padding: 50,

    draw: function() {
        if (!healthbarBackground) {
            healthbarBackground = new Image();
            healthbarBackground.src = "images/healthbarBackground.png";
            healthbarBackground.onload = function() { this.loaded = true; }
        }

        if (!powerbarBackground) {
            powerbarBackground = new Image();
            powerbarBackground.src = "images/powerbarBackground.png";
            powerbarBackground.onload = function() { this.loaded = true; }
        }

        // Draw GUI header overlay
        if (healthbarBackground.loaded) context.drawImage(healthbarBackground, 0, 0);

        // Draw player health bar background
        context.fillStyle = "black";
        context.fillRect(this.padding, this.padding, this.width, this.height);

        // Draw player health bar filled with blue
        context.fillStyle = "blue";
        context.fillRect(this.padding + 2, this.padding + 2, (this.width - 4) * (player.health / 100), this.height - 4);

        // Draw robot health bar background
        context.fillStyle = "black";
        context.fillRect(canvas.width - this.width - this.padding, this.padding, this.width, this.height);

        // Draw robot health bar filled with red
        context.fillStyle = "red";
        context.fillRect(canvas.width - this.width - this.padding + 2, this.padding + 2, (this.width - 4) * (robot.health / 100), this.height - 4);

        // Draw player power bar background
        context.fillStyle = "grey";
        context.fillRect(this.padding + 350, this.padding  + this.height - 27, this.width, this.height);

        // Draw player power bar filled with green
        context.fillStyle = "green";
        context.fillRect(this.padding + 2, this.padding + this.height, (this.width - 4) * (player.power / 100), this.height - 4);

        // Round number and timer
        context.font = "20px Tohoma bold";
        context.fillStyle = "white";
        context.fillText(fightRoundNumber + " of " + fightRoundMax, 720, 40);
        context.fillText(fightTimeRemaining.toFixed(2) + "s", 720, 84);
    }
};
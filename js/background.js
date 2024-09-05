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

        if (bgImage1.loaded) context.drawImage(bgImage1, -50, 0);
        context.globalAlpha = 0.05;
        if (cloudImage.loaded) context.drawImage(cloudImage, Math.sin(performance.now() / 32000) * 500 - 500 - player.x / 7, 0);
        context.globalAlpha = 1;
        if (bgImage5.loaded) context.drawImage(bgImage5, -player.x / 10, 75);
        if (bgImage6.loaded) context.drawImage(bgImage6, -player.x / 2.5, 0);

        if (leftBorderImage.loaded) context.drawImage(leftBorderImage, -player.x / 2.5 + 35, canvas.height - 220);
        if (rightBorderImage.loaded) context.drawImage(rightBorderImage, -player.x / 2.5 + 1000, canvas.height - 150);
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
            context.drawImage(fogImage, Math.sin(performance.now() / 14000) * 500 - 500 - player.x, canvas.height - 225 + Math.sin(performance.now() / 8000) * 50);
            context.drawImage(fogImage, Math.sin(performance.now() / 28000) * -634 - 500 - player.x, canvas.height - 200 + Math.sin(performance.now() / 13000) * -50);
            context.drawImage(fogImage, Math.sin(performance.now() / 29000) * 500 - 500 - player.x, canvas.height - 175 + Math.sin(performance.now() / 29000) * -50);
        }
    }
};

var healthBar = {
    width: 160,
    height: 15,
    padding: 30,

    draw: function() {
        if (!healthbarBackground) {
            healthbarBackground = new Image();
            healthbarBackground.src = "images/healthbarBackground.png";
            healthbarBackground.onload = function() { this.loaded = true; }
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

       
        // Round number and timer
        context.font = "20px Tohoma bold";
        context.fillStyle = "white";
        context.fillText(fightRoundNumber + " of " + fightRoundMax, 475, 31);
        context.fillText(fightTimeRemaining.toFixed(0), 490, 62);
		
		if(player.health <=0){
			context.font = "60px Tohoma bold";
			context.fillStyle = "red";
			context.fillText(" ROBOT WINS ", 105, canvas.height / 2);
			
			context.font = "20px Tohoma bold";
			context.fillStyle = "white";
			context.fillText(" round doesn't yet reset, please refresh ", 105, canvas.height / 2 + 80);
			
		}
		else if(robot.health <= 0){
			context.font = "60px Tohoma bold";
			context.fillStyle = "lime";
			context.fillText(" PLAYER WINS ", 305, canvas.height / 2);
			context.font = "20px Tohoma bold";
			context.fillStyle = "white";
			context.fillText(" round doesn't yet reset, please refresh ", 305, canvas.height / 2 + 80);
		}
    }
};

var powerBar = {
    width: 160,
    height: 10,
    padding: 35,

    draw: function() {
		var cornerX = this.padding + 200;
		var cornerY = this.padding + this.height - 15;
        // Draw player power bar background
        context.fillStyle = "grey";
        context.fillRect(cornerX, cornerY, this.width, this.height);

        // Draw player power bar filled with green
        context.fillStyle = "green";
        context.fillRect(cornerX, cornerY, (this.width) * (player.power / 100), this.height);
    },

    update: function(deltaTime) {
        // Increase player power gradually over time
        if (player.power < 100) {
            player.power += deltaTime * 0.01; // Adjust the 0.01 to control the speed of power increase
            if (player.power > 100) {
                player.power = 100; // Ensure the power doesn't exceed 100
            }
        }
    }
};
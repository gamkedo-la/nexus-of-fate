var bgImage1,bgImage5,bgImage6,cloudImage;

var background = {
    draw : function() {

        if (!bgImage1) { 
            bgImage1 = new Image();
            bgImage1.src="images/background1.png";
            bgImage1.onload = function() { this.loaded=true; }
        }
        if (!bgImage5) { 
            bgImage5 = new Image();
            bgImage5.src="images/background5.png";
            bgImage5.onload = function() { this.loaded=true; }
        }
        if (!bgImage6) { 
            bgImage6 = new Image();
            bgImage6.src="images/background6.png";
            bgImage6.onload = function() { this.loaded=true; }
        }
        if (!cloudImage) { 
            cloudImage = new Image();
            cloudImage.src="images/clouds.png";
            cloudImage.onload = function() { this.loaded=true; }
        }

        if (bgImage1.loaded) context.drawImage(bgImage1,-player.x/7,0);
        context.globalAlpha = 0.1;
        if (cloudImage.loaded) context.drawImage(cloudImage,Math.sin(performance.now()/32000)*1000-1000-player.x/7,0);
        context.globalAlpha = 1;
        if (bgImage5.loaded) context.drawImage(bgImage5,-player.x/3,0);
        if (bgImage6.loaded) context.drawImage(bgImage6,-player.x/2.5,0);
    }
}


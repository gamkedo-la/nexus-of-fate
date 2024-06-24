var bgImage1,bgImage5,bgImage6;

var background = {
    draw : function() {
        /*
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#deb887"; 
        context.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.7);
        context.fillStyle = "darkblue"; 
        context.fillRect(0, 0, canvas.width, canvas.height * 0.3); 
        context.beginPath();
        context.arc(canvas.width * 0.8, canvas.height * 0.2, 50, 0, 2 * Math.PI); 
        context.fillStyle = "white"; 
        context.fill();
        context.closePath();
        */
        
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

        if (bgImage1 && bgImage1.loaded) context.drawImage(bgImage1,-player.x/7,0);
      
        if (bgImage5 && bgImage5.loaded) context.drawImage(bgImage5,-player.x/3,0);
        // FOREGROUND: should be drawn AFTER the player sprites if it overlaps
        if (bgImage6 && bgImage6.loaded) context.drawImage(bgImage6,-player.x/2.5,0);
    }
}


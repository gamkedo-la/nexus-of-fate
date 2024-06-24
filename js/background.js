var bgImage1,bgImage2,bgImage3,bgImage4;

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
        if (!bgImage2) { 
            bgImage2 = new Image();
            bgImage2.src="images/background2.png";
            bgImage2.onload = function() { this.loaded=true; }
        }
        if (!bgImage3) { 
            bgImage3 = new Image();
            bgImage3.src="images/background3.png";
            bgImage3.onload = function() { this.loaded=true; }
        }
        if (!bgImage4) { 
            bgImage4 = new Image();
            bgImage4.src="images/background4.png";
            bgImage4.onload = function() { this.loaded=true; }
        }

        if (bgImage1 && bgImage1.loaded) context.drawImage(bgImage1,-player.x/7,0);
        if (bgImage2 && bgImage2.loaded) context.drawImage(bgImage2,-player.x/6,0);
        if (bgImage3 && bgImage3.loaded) context.drawImage(bgImage3,-player.x/5,0);
        if (bgImage4 && bgImage4.loaded) context.drawImage(bgImage4,-player.x/4,0);
    }
}


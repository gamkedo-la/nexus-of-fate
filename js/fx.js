// simple hit particles

var fx = {

    draw: function() {

        // first time inits
        if (!this.particles) {
            console.log("initializing particles...");
            this.particles = [];
            this.imgPuff = new Image();
            this.imgPuff.onload = function() { this.loaded=true; }
            this.imgPuff.src = "images/fxPuff.png";
            this.imgSpark = new Image();
            this.imgSpark.onload = function() { this.loaded=true; }
            this.imgSpark.src = "images/fxSpark.png";
        }

        // only draw if the images are ready to use
        if (!this.imgSpark.loaded) return;
        if (!this.imgPuff.loaded) return;

        for (p of this.particles) {
            // draw p
        }
    },

    update: function() {
        for (p of this.particles) {
            // move / fade p
        }
    },

    // used by blocks
    impactFX: function(x,y,vx,vy) {
        console.log("spawning an impactFX at "+x+","+y);
    },

    // successful kicks and punches
    hitFX: function(x,y,vx,vy) {
        console.log("spawning a hitFX at "+x+","+y);
    },

    // little puff of dust
    jumpFX: function(x,y,vx,vy) {
        console.log("spawning a jumpFX at "+x+","+y);
    },

    // glowing eyes
    laserFX: function(x,y,vx,vy) {
        console.log("spawning a laserFX at "+x+","+y);
    },

    // blood or stars?
    dieFX: function(x,y,vx,vy) {
        console.log("spawning a dieFX at "+x+","+y);
    },

}


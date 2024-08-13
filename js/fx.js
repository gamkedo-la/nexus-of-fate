// simple hit particles

var fx = {

    ready:false,
    particles:null,

    draw: function() {
        // first time inits
        if (!this.ready) {
            console.log("initializing particles...");
            this.particles = [];
            this.imgPuff = new Image();
            this.imgPuff.onload = function() { this.loaded=true; }
            this.imgPuff.src = "images/impactFX.png";
            this.imgSpark = new Image();
            this.imgSpark.onload = function() { this.loaded=true; }
            this.imgSpark.src = "images/hitFX.png";
            this.imgDust = new Image();
            this.imgDust.onload = function() { this.loaded=true; }
            this.imgDust.src = "images/jumpFX.png";
            this.ready=true;
        }

        // only draw if the images are ready to use
        if (!this.imgSpark.loaded) return;
        if (!this.imgPuff.loaded) return;
        if (!this.imgDust.loaded) return;

        for (let i=0; i<this.particles.length; i++) {
            let p = this.particles[i];
            let alpha = 1 - (p.age / p.life);
            context.globalAlpha = alpha;
            context.drawImage(p.img,p.x,p.y);
            context.globalAlpha = 1;
        }
    }, // draw()

    update: function() {
        for (let i=0; i<this.particles.length; i++) {
            let p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.age += 1 / 60; // fixme: use deltatime?
            if (p.age > p.life) this.particles.splice(i,1);
        }
    }, // update()

    // used by blocks
    impactFX: function(x=0,y=0,vx=0,vy=0) {
        console.log("spawning an impactFX at "+x+","+y);
        var p = {x:x,y:y,vx:vx,vy:vy,age:0,life:1,img:this.imgPuff};
        this.particles.push(p);
    },

    // successful kicks and punches
    hitFX: function(x=0,y=0,vx=0,vy=0) {
        console.log("spawning a hitFX at "+x+","+y);
        var p = {x:x,y:y,vx:vx,vy:vy,age:0,life:0.3,img:this.imgSpark};
        this.particles.push(p);
    },

    // little puff of dust
    jumpFX: function(x,y,vx,vy) {
        console.log("spawning a jumpFX at "+x+","+y);
        var p = {x:x,y:y,vx:vx,vy:vy,age:0,life:1,img:this.imgDust};
        this.particles.push(p);
    },

    // glowing eyes
    laserFX: function(x,y,vx,vy) {
        console.log("spawning a laserFX at "+x+","+y);
        var p = {x:x,y:y,vx:vx,vy:vy,age:0,life:1,img:this.imgSpark};
        this.particles.push(p);
    },

    // blood or stars?
    dieFX: function(x,y,vx,vy) {
        console.log("spawning a dieFX at "+x+","+y);
        for (let n=0; n<20; n++) {
            var p = {x:x+Math.random()*100-50,y:y+Math.random()*100-50,vx:vx+Math.random()*10-5,vy:vy+Math.random()*10-5,age:0,life:1+Math.random()*5,img:this.imgPuff};
            this.particles.push(p);
        }
    },

    mainMenuFX: function() {
        if (!this.ready) return;
        for (let n=0; n<25; n++) {
            var p = {
                age:0,
                life:Math.random()*1,
                img:this.imgPuff,
                x:Math.random()*1500-100,
                y:Math.random()*100+600,
                vx:Math.random()*4-2,
                vy:Math.random()*-3
            };
            this.particles.push(p);
        }
    }

}


// this function becomes Fighter.getInput()
// and likes to update this.keys[]
function input_ai() {
    
    // always let go of jump after a single frame
    this.keys[' '] = false;
    
    // keep doing whatever we were doing before
    if (Math.random() > 0.1) return; 
    
    // select a new key to hold down for a while
    let choice = Math.random();
    if (choice < 0.07) {
        //console.log("ai is going to move left!");
        this.keys['a'] = true;
        this.keys['d'] = false;
        this.keys[' '] = (Math.random() < 0.1);
    }
    else if (choice < 0.2) {
        //console.log("ai is going to move right!");
        this.keys['a'] = false;
        this.keys['d'] = true;
        this.keys[' '] = (Math.random() < 0.1);
    } else if (choice < 0.21) {
        //console.log("ai might as well jump JUMP ... might as well jump!");
        this.keys['a'] = false;
        this.keys['d'] = false;
        this.keys[' '] = true;
    } else { // 80% of the time:
        //console.log("ai is going to stand idle!");
        this.keys['a'] = false;
        this.keys['d'] = false;
        this.keys[' '] = false;
    }
}

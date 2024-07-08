function input_ai() {
    // always let go of jump after a single frame
    this.keys[' '] = false;

    // keep doing whatever we were doing before
    if (Math.random() > 0.1) return; 

    // Select a new key to hold down for a while - AI will only stand idle
    this.keys['a'] = false;
    this.keys['d'] = false;
    this.keys[' '] = false;
}
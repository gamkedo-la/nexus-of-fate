// this function becomes Fighter.getInput()
// and likes to update this.keys[]
function input_keyboard() {
    // make the fighter getInput funct
    this.keys = keyboardstate;
}

// during keyboard events we lose track of "this." so we use:
var keyboardstate = {}; // used privately in this file only

window.addEventListener('keydown', function(e) {
    keyboardstate[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', function(e) {
    keyboardstate[e.key.toLowerCase()] = false;
});


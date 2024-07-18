// this function becomes Fighter.getInput()
// and likes to update this.keys[]
function check_gamepad() {
    
    // is a gamepad connected?
    if (!navigator.getGamepads) return;
    let gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;
    // pretend to be special keys
    player.keys['gamepad_left'] = gamepad.axes[0] < 0.1;
    player.keys['gamepad_right'] = gamepad.axes[0] > 0.1;
    player.keys['gamepad_up'] = gamepad.axes[1] < 0.1;
    player.keys['gamepad_down'] = gamepad.axes[1] > 0.1;
    player.keys['gamepad_a_button'] = gamepad.buttons[0].value > 0.1;
    player.keys['gamepad_b_button'] = gamepad.buttons[1].value > 0.1;
    player.keys['gamepad_x_button'] = gamepad.buttons[2].value > 0.1;
    player.keys['gamepad_y_button'] = gamepad.buttons[3].value > 0.1;

}
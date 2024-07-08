const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

var mainMenuImage = document.createElement("img"); // create element for main menu background
mainMenuImage.src = "images/mainmenu95.png"; // attach source for main menu
let onMainMenu = true;
  
const player = new Fighter(input_keyboard, {
  [ANIM_IDLE]: 'images/player_idle.png',
  [ANIM_WALK_FORWARD]: 'images/player_walk.png',
  [ANIM_WALK_BACKWARD]: 'images/player_walkbackwards.png',
  [ANIM_CROUCH]: 'images/player_crouch.png',
  [ANIM_JUMP]: 'images/player_jump.png',
  [ANIM_KICK]: 'images/player_jump.png',
  [ANIM_PUNCH]: 'images/player_punch.png',
  [ANIM_CROUCH_PUNCH]: 'images/player_punch.png',
  [ANIM_DEATH]: 'images/player_death.png'






}, 100, FLOOR_Y);

const robot = new Fighter(input_ai, {
  [ANIM_IDLE]: 'images/robot_idle.png',

}, 300, FLOOR_Y);

player.opponent = robot;
robot.opponent = player;
player.AI = false;
robot.AI = true;

window.onload = function() {
  // Load Main Menu Title Art
  context.drawImage(mainMenuImage, 0, 0); // load image for main menu
  addEventListener("click", (event) => {
    if(userIsOnStartText(event)){
      onMainMenu = false;
      draw();
    }
  });

  // Cursor Styling when over Start Text
  addEventListener("mousemove", (event) => {
    // console.log(event.clientX)
    if(userIsOnStartText(event) && onMainMenu){
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  });

  function draw() {
    player.update(canvas.width);
    robot.update(canvas.width);
	background.draw();
    player.draw();
    robot.draw();
    fog.draw();
    requestAnimationFrame(draw);
  }
};

function userIsOnStartText(mouseClick) {
  // console.log("clicked ", event.clientX, ":", event.clientY);
  // current Start text: clientX(610-900); clientY(500-600)
  return (mouseClick.clientX >= 610 && mouseClick.clientX <= 900 && 
  mouseClick.clientY >= 500 && mouseClick.clientY <= 600);
}
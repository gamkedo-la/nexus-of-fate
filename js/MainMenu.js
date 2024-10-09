class MainMenu {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
    this.hoveringButton = 0;
    this.mainMenuImage = document.createElement("img");
    this.mainMenuImage.src = "images/MainMenuScreen.png";
    this.onMainMenu = true;

    function userIsOnStartText(mouseClick) {
      // current Start text: clientX(610-900); clientY(500-600)
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 250 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 260 && mouseClick.clientY <= rect.top + 290);
    }
	
	function userIsOnStartText2Player(mouseClick) {
      // current Start text: clientX(610-900); clientY(500-600)
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 250 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 360 && mouseClick.clientY <= rect.top + 391);
    }

    window.addEventListener("click", (event) => {

      if (userIsOnStartText(event)) {
		robot.AI = true;
        this.onMainMenu = false;
		console.log("Gameplay music");
		INTRO_music.pause();
		INTRO_music.currentTime = 0;
		music.play();
        fx.clear(); // remove smoke particles
      } else if (userIsOnStartText2Player(event)) {
		robot.AI = false;
        this.onMainMenu = false;
		console.log("Gameplay music");
		INTRO_music.pause();
		INTRO_music.currentTime = 0;
		music.play();
        fx.clear(); // remove smoke particles
      } else {
		 
        // clicked empty space - trigger intro music if it was unable to autostart
        if (this.onMainMenu) {
            console.log("clicked empty space on title screen: start intro music!");
            INTRO_music.play(); INTRO_music_is_playing = true;
        }
      }
	  
    });

    // Cursor Styling when over Start Text
    window.addEventListener("mousemove", (event) => {
      if (userIsOnStartText(event) && this.onMainMenu) {
        this.hoveringButton=1;
        document.body.style.cursor = "pointer";
      } else if (userIsOnStartText2Player(event) && this.onMainMenu) {
        this.hoveringButton=2;
        document.body.style.cursor = "pointer";
      } else{
        this.hoveringButton=0;
        document.body.style.cursor = "default";
      }
    });

  }

  show() {
    if (this.onMainMenu) {
      this.context.drawImage(this.mainMenuImage, 0, 0); // load image for main menu
      fx.draw();
      fx.update();
      fx.mainMenuFX();
      fx.mainMenuHoverFX(this.hoveringButton);      
    }
    else {
      // gets called every frame so if we clear here all future particles vanish
      // fx.clear();
    }

    return this.onMainMenu;
  }
}

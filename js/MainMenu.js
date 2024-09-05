class MainMenu {
  constructor(canvas) {
    this.context = canvas.getContext("2d");

    this.mainMenuImage = document.createElement("img");
    this.mainMenuImage.src = "images/MainMenuScreen.png";
    this.onMainMenu = true;

    function userIsOnStartText(mouseClick) {
      // current Start text: clientX(610-900); clientY(500-600)
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 250 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 400 && mouseClick.clientY <= rect.top + 500);
    }

    window.addEventListener("click", (event) => {

      if (userIsOnStartText(event)) {
        this.onMainMenu = false;
        fx.clear(); // remove smoke particles
      } else {
        // clicked empty space - trigger intro music if it was unable to autostart
        console.log("clicked empty space on title screen: start intro music!");
        INTRO_music.play(); INTRO_music_is_playing = true;
      }
    });

    // Cursor Styling when over Start Text
    window.addEventListener("mousemove", (event) => {
      if (userIsOnStartText(event) && this.onMainMenu) {
        this.hoveringButton=true;
        document.body.style.cursor = "pointer";
      } else {
        this.hoveringButton=false;
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
      if (this.hoveringButton) fx.mainMenuHoverFX();      
    }
    else {
      // gets called every frame so if we clear here all future particles vanish
      // fx.clear();
    }

    return this.onMainMenu;
  }
}

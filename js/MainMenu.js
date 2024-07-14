class MainMenu {
  constructor(context) {
      this.context = context;

      this.mainMenuImage = document.createElement("img");
      this.mainMenuImage.src = "images/mainmenu95.png";
      this.onMainMenu = true;

      function userIsOnStartText(mouseClick) {
          // current Start text: clientX(610-900); clientY(500-600)
          return (mouseClick.clientX >= 610 && mouseClick.clientX <= 900 &&
              mouseClick.clientY >= 500 && mouseClick.clientY <= 600);
      }

      window.addEventListener("click", (event) => {
          if (userIsOnStartText(event)) {
              this.onMainMenu = false;
          }
      });

      // Cursor Styling when over Start Text
      window.addEventListener("mousemove", (event) => {
          if (userIsOnStartText(event) && this.onMainMenu) {
              document.body.style.cursor = "pointer";
          } else {
              document.body.style.cursor = "default";
          }
      });

  }

  show() {
    if (this.onMainMenu) {
        this.context.drawImage(this.mainMenuImage, 0, 0); // load image for main menu
    }

    return this.onMainMenu;
  }
}

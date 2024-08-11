class MainMenu {
  constructor(canvas) {
    this.context = canvas.getContext("2d");

    this.mainMenuImage = document.createElement("img");
    this.mainMenuImage.src = "images/MainMenuScreen.png";
    this.onMainMenu = true;

    function userIsOnStartText(mouseClick) {
      // current Start text: clientX(610-900); clientY(500-600)
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 610 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 500 && mouseClick.clientY <= rect.top + 600);
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

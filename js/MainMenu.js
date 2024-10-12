class MainMenu {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
    this.hoveringButton = 0;
    this.mainMenuImage = document.createElement("img");
    this.mainMenuImage.src = "images/MainMenuScreen.png";
    this.onMainMenu = true;
    this.showCredits = false;

    function userIsOnStartText(mouseClick) {
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 250 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 260 && mouseClick.clientY <= rect.top + 290);
    }
	
	 function userIsOnStartText2Player(mouseClick) {
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 250 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 360 && mouseClick.clientY <= rect.top + 390);
    }

    function userIsOnStartTextCredits(mouseClick) {
      var rect = canvas.getBoundingClientRect();

      return (mouseClick.clientX >= rect.left + 250 && mouseClick.clientX <= rect.left + 900 &&
        mouseClick.clientY >= rect.top + 460 && mouseClick.clientY <= rect.top + 490);
    }

    window.addEventListener("click", (event) => {
      if(this.showCredits) {
        this.showCredits=false;
        return;
      }

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
      } else if (userIsOnStartTextCredits(event)) {
        this.showCredits = true;
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
      } else if (userIsOnStartTextCredits(event) && this.onMainMenu) {
        this.hoveringButton=3;
        document.body.style.cursor = "pointer";
      } else{
        this.hoveringButton=0;
        document.body.style.cursor = "default";
      }
    });

  }

  show() {
    if (this.onMainMenu) {
      if(this.showCredits) {
        drawCredits()
      } else {
        this.context.drawImage(this.mainMenuImage, 0, 0); // draw image for main menu
        fx.draw();
        fx.update();
        fx.mainMenuFX();
        fx.mainMenuHoverFX(this.hoveringButton);
      }
    }
    else {
      // gets called every frame so if we clear here all future particles vanish
      // fx.clear();
    }

    return this.onMainMenu;
  }
}

function drawCredits() {
  context.fillStyle="black";
  context.fillRect(0,0,canvas.width,canvas.height);
  var lineX = 40;
  var lineY = 43;
  var creditsSize = 22;
  var lineSkip = creditsSize+12;
  context.globalAlpha = 1;
  context.fillStyle = "rgba(220,220,220,1)";
  var wasFont = context.font;
  context.font = creditsSize+"px Arial";
  for(var i=0;i<this.creditsList.length;i++) {
      context.fillText(this.creditsList[i],lineX,lineY+=lineSkip);
  }
  context.font = wasFont;
}

var creditsList=[
"Syed Daniyal Ali: Project lead, core gameplay, combat code, animation system, player and robot sprites / animations, hit functionality, movement abilities, sky, robot laser and jetpack features, two-player control support, charge bars, game resizing, assorted asset integration and bug fixes",
"Christer \"McFunkypants\" Kaitila: Robot AI, environment city/street/parallax, fog, debris, UI styling, health, gamepad support, sound hookups, damage tuning, menu particles, laser sprite, screenshake, dark music, fireball voice/sprite  ",
"Vaan Hope Khani: Sounds (walk, jump, land, jump kick, jetpack, hurt, launch, finish, robot variant), round reset with delay",
"Cindy Andrade: Intro music, title art",
"Randy Tan Shaoxian: Dash, round start timer, window resize mouse coordinate fix, menu and character code refactoring, tweaks for Linux support",
"Jason Timms: Character collision, preventing crossing of sides",
"Chris DeLeon: Sprite animation fix, variable frame height support, jump glitch solved"," ",
"                                             == CLICK ANYWHERE TO GO BACK =="];

function lineWrapCredits() {
    const newCut = [];
    var maxLineChar = 96;
    var findEnd;

    for(let i = 0; i < this.creditsList.length; i++) {
      const currentLine = this.creditsList[i];
      for(let j = 0; j < currentLine.length; j++) {
        /*const aChar = currentLine[j];
        if(aChar === ":") {
          if(i !== 0) {
            newCut.push("\n");
          }
          newCut.push(currentLine.substring(0, j + 1));
          newCut.push(currentLine.substring(j + 2, currentLine.length));
          break;
        } else*/ if(j === currentLine.length - 1) {
          if((i === 0) || (i >= this.creditsList.length - 2)) {
            newCut.push(currentLine);
          } else {
            newCut.push(currentLine.substring(0, currentLine.length));
          }
        }
      }
    }

    const newerCut = [];
    for(var i=0;i<newCut.length;i++) {
      while(newCut[i].length > 0) {
        findEnd = maxLineChar;
        if(newCut[i].length > maxLineChar) {
          for(var ii=findEnd;ii>0;ii--) {
            if(newCut[i].charAt(ii) == " ") {
              findEnd=ii;
              break;
            }
          }
        }
        newerCut.push(newCut[i].substring(0, findEnd));
        newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
      }
    }

    this.creditsList = newerCut;
  }
lineWrapCredits();
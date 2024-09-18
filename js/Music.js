var music_is_playing = false;
var music = new Audio('audio/dark_theme_by_mcfunkypants.mp3');
music.volume = 0.5;
music.loop = true;

var INTRO_music_is_playing = false;
var INTRO_music = new Audio('audio/intro_Music_Sample_By_Cindy_Andrade.mp3');
INTRO_music.volume = 0.5;
INTRO_music.loop = true;
console.log("autostarting intro music...");
try {
     INTRO_music.play();
     INTRO_music_is_playing = true;
} catch(e) {
    console.log("intro music unable to autostart locally (but on itch.io this should work ok)");
    INTRO_music_is_playing = false;
}


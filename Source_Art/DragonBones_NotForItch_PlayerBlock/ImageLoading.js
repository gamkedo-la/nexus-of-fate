var baseName = "Armature-animtion";
frameLabel = ["0","1","2","3"];
var animFrames = frameLabel.length;

var dirText = ["0"];
var animFacings = dirText.length;

var animPics = [];

var picsToLoad = 0;

var canvas, canvasContext;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
}

function loadingDoneSoStartGame() {
  var scaleBy = 0.2;
  var dimW = 2584;
  var dimH = 2573;
  var scaleW = dimW * scaleBy;
  var scaleH = dimH * scaleBy;
  scaleH = Math.floor(scaleH) + 1;
  console.log("FrameHeight" + scaleH);
  var cornerX = 1914;
  var cornerY = 1445;
  canvas.width = scaleW*animFacings;
  canvas.height = scaleH*animFrames;

  for(var i=0;i<animFacings;i++) {
    for(var ii=0;ii<animFrames;ii++) {
      console.log(i+" _ "+ii);
      canvasContext.drawImage(animPics[ frameIndex(i,ii) ],
	  cornerX, cornerY,dimW,dimH,
        scaleW*i,scaleH*ii, scaleW,scaleH);
		
      
    }
  }
}

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  console.log(picsToLoad);
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src=fileName;
}

function loadImageForAnimCode(animCode, fileName) {
  animPics[animCode] = document.createElement("img");
  beginLoadingImage(animPics[animCode],fileName);
}

function frameIndex(facing, anim) {
  return facing + anim*animFacings;
}

function loadImages() {

  var imageList = [
    ];

  for(var i=0;i<animFacings;i++) {
    for(var ii=0;ii<animFrames;ii++) {
      var filename = baseName+dirText[i]+"_"+frameLabel[ii]+".png";
      console.log(filename);
      imageList.push(
        {animType:frameIndex(i,ii), theFile:filename});
    }
  }

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    loadImageForAnimCode(imageList[i].animType, imageList[i].theFile);
  } // end of for imageList

} // end of function loadImages

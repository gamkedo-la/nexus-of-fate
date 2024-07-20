class Player extends Fighter {
  constructor(whichInput, imageSrcs, initialX = 100, initialY = FLOOR_Y) {
    super(whichInput, imageSrcs, initialX, initialY);
    this.AI = false; // overriding from main outside this function, to help gate debug output
  }
}

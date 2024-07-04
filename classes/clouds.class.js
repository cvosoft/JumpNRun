class Cloud extends MovableObject {
  x = 0;
  y = 405;
  scaleFactor = 0.375;

  constructor(imagePath, startX, cnt) {
    super().setImage(imagePath);
    this.x = startX;
    this.animate(startX);
  }

  animate(startX) {
    setInterval(() => this.moveClouds(startX), 60/1000);
  }

  moveClouds(startX) {
    this.x -= 0.015;

    //console.log(`Wolke ${cnt} (StartX: ${startX}): ${this.x} - ${startX - 720}`);

    if (this.x < startX - 720) {
      this.x = startX;
    }
  }
}

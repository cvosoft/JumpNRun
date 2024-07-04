class Cloud extends MovableObject {
  x = 0;
  y = 405;
  scaleFactor = 0.375;

  constructor(imagePath, startX, cnt) {
    super().setImage(imagePath);
    this.x = startX;
    this.animate(startX, cnt);
  }

  animate(startX, cnt) {
    let myInterval = setInterval(() => this.moveClouds(startX, cnt), 100);
  }

  moveClouds(startX, cnt) {
    this.x -= 20;

    console.log(`Wolke ${cnt} (StartX: ${startX}): ${this.x} - ${startX - 720}`);

    if (this.x < startX - 720) {
      //this.x = startX;
      //clearInterval(this.myInterval);
      //console.log("fdsf");
      this.x = startX;
    }
  }
}

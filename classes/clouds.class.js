class Cloud extends MovableObject {
  x = 0;
  y = 405;
  scaleFactor = 0.375;
  speed = 0.015;

  constructor(imagePath, startX, cnt) {
    super().setImage(imagePath);
    this.x = startX;
    this.animate(startX);
  }

  animate(startX) {
    setInterval(() => this.moveClouds(startX), fps);
  }

  moveClouds(startX) {
    this.x -= this.speed;
    if (this.x < startX - 720) {
      this.x = startX;
    }
  }
}

class Background extends MovableObject {
  scaleFactor = 0.375; // macht aus 1920:1080 -> 720:405
  x = 0;
  y = 405;

  constructor(imagePath, x) {
    super().setImage(imagePath);
    this.x = x;
  }
}

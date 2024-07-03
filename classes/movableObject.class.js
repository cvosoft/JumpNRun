class MovableObject {
  x = 20;
  y = 355; // gilt für alles auf dem Boden
  img;
  scaleFactor = 0.175;

  setImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    console.log("Moving left");
  }
}

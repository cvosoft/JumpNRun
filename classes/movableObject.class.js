class MovableObject {
  x = 20;
  y = 355; // gilt für alles auf dem Boden
  img;
  scaleFactor = 0.175;
  imageCache = {};
  otherDirection = false;

  setImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  setImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    console.log("Moving left");
  }
}

class MovableObject {
  x = 20;
  y = 355; // gilt für alles auf dem Boden
  img;
  scaleFactor = 0.175;
  imageCache = {};
  otherDirection = false;
  direction = "left";

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

  isColliding(obj) {
    //return obj.x >= this.x && obj.x <= (this.x + this.img.naturalWidth * this.scaleFactor);
    //return obj.x > this.x > obj.x + obj.img.naturalWidth * obj.scaleFactor;
    return this.inRange(obj.x, this.x, this.x + this.img.naturalWidth*this.scaleFactor*0.7);
  }

  inRange(x, min, max) {
    return x >= min && x <= max;
  }
}

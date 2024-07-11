class MovableObject {
  x = 20;
  y = 355; // gilt für alles auf dem Boden
  img;
  scaleFactor = 0.175;
  imageCache = {};
  mirrorImages = false;
  direction = "right";
  speedY = 1;
  acceleration = 0.05;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
      }
    }, fps);
  }

  isAboveGround() {
    return this.y < 360;
  }

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
    return this.inRange(obj.x, this.x, this.x + this.img.naturalWidth * this.scaleFactor * 0.7);
  }

  inRange(x, min, max) {
    return x >= min && x <= max;
  }

  moveChickenLeft(interval) {
    let i = this.currentImage % this.IMAGES_WALK.length;
    let path = this.IMAGES_WALK[i];
    this.img = this.imageCache[path];
    this.currentImage++;

    this.x -= this.speed;
    if (this.x < 0) {
      clearInterval(interval);
      this.interval = setInterval(() => this.moveChickenRight(this.interval), fps);
      this.direction = "left";
    }
  }

  moveChickenRight(interval) {
    let i = this.currentImage % this.IMAGES_WALK.length;
    let path = this.IMAGES_WALK[i];
    this.img = this.imageCache[path];
    this.currentImage++;

    this.x += this.speed;
    if (this.x > 720) {
      clearInterval(interval);
      this.interval = setInterval(() => this.moveChickenLeft(this.interval), fps);
      this.direction = "right";
    }
  }

  moveChickenAfterColision(oldInterval) {
    clearInterval(oldInterval);
    if ((this.direction = "right")) {
      this.interval = setInterval(() => this.moveChickenRight(this.interval), fps);
      this.direction = "left";
    } else {
      this.interval = setInterval(() => this.moveChickenLeft(this.interval), fps);
      this.direction = "right";
    }
  }
}

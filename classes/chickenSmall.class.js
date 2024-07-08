class ChickenSmall extends MovableObject {
  speed = Math.random() * 2;
  interval;
  direction = "right";

  IMAGES_WALK = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  currentImage = 0;

  constructor() {
    super().setImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.setImages(this.IMAGES_WALK);
    this.x = 720 * 3 + Math.random() * 500;
    this.interval = setInterval(() => this.moveChickenLeft(this.interval), fps);
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

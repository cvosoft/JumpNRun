class Chicken extends MovableObject {
  speed = Math.random();
  interval;

  constructor() {
    super().setImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 720 + Math.random() * 500;
    this.interval = setInterval(() => this.moveChickenLeft(this.interval), fps);
  }

  moveChickenLeft(interval) {
    this.x -= this.speed;
    if (this.x < 0) {
      clearInterval(interval);
      this.interval = setInterval(() => this.moveChickenRight(this.interval), fps);
      this.otherDirection = true;
    }
  }

  moveChickenRight(interval) {
    this.x += this.speed;
    if (this.x > 720) {
      clearInterval(interval);
      this.interval = setInterval(() => this.moveChickenLeft(this.interval), fps);
      this.otherDirection = false;
    }
  }
}

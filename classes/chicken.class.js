class Chicken extends MovableObject {
  speed = .5;
  interval;
  direction = "right";

  IMAGES_WALK = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  currentImage = 0;

  constructor() {
    super().setImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.animateWalking();
    this.x = 720 + Math.random() * 500;
    this.interval = setInterval(() => this.moveLeft(this.interval), fps);
  }
}

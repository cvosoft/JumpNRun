class ChickenBig extends MovableObject {
  speed = Math.random() * 1;
  y = 365;
  interval;

  IMAGES_WALK = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  currentImage = 0;


  constructor() {
    super().setImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.animateWalking();
    this.x = 5 * 720;
    this.interval = setInterval(() => this.moveLeft(this.interval), fps);
  }
}

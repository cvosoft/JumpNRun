class ChickenBig extends MovableObject {
  speed = Math.random() * 2;
  y = 365;

  IMAGES_WALK = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  currentImage = 0;

  constructor() {
    super().setImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.setImages(this.IMAGES_WALK);
    this.x = 720 * 3 + Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveChickenLeft();
      let i = this.currentImage % this.IMAGES_WALK.length;
      let path = this.IMAGES_WALK[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }
}

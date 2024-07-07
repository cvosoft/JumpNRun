class Character extends MovableObject {
  x = 80;
  y = 360;
  direction = "right";
  world;

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_WALK = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  currentImage = 0;

  constructor() {
    super().setImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.setImages(this.IMAGES_IDLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      //this.x += 10;
      if (this.world.keyboard.RIGHT) {
        this.x += 10;
        this.currentImage = 0;
        let i = this.currentImage % this.IMAGES_WALK.length;
        let path = this.IMAGES_WALK[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else if (this.world.keyboard.LEFT) {
        this.x -= 10;
      } else {
        let i = this.currentImage % this.IMAGES_IDLE.length;
        let path = this.IMAGES_IDLE[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 150);
  }

  jump() {}
}

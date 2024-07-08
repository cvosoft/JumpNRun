class Character extends MovableObject {
  x = 80;
  y = 360;
  speed = 10;
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


  IMAGES_JUMP = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ]


  currentImage = 0;

  constructor() {
    super().setImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.setImages(this.IMAGES_IDLE);
    this.setImages(this.IMAGES_WALK);
    this.setImages(this.IMAGES_JUMP);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.direction = "right";
        this.x += this.speed;
        let i = this.currentImage % this.IMAGES_WALK.length;
        let path = this.IMAGES_WALK[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else if (this.world.keyboard.LEFT) {
        this.direction = "left";
        this.x -= this.speed;
        let i = this.currentImage % this.IMAGES_WALK.length;
        let path = this.IMAGES_WALK[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else if (this.world.keyboard.UP) {
        this.y -= this.speed;
        let i = this.currentImage % this.IMAGES_WALK.length;
        let path = this.IMAGES_JUMP[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let i = this.currentImage % this.IMAGES_IDLE.length;
        let path = this.IMAGES_IDLE[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {}
}

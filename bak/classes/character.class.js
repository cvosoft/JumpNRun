class Character extends MovableObject {
  x = 0;
  y = 360;
  //y = 200;
  speed = 1;
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
  ];

  IMAGES_IDLE2 = [];
  IMAGES_WALK2 = [];
  IMAGES_JUMP2 = [];
  reps = 10;
  walking_sound = new Audio("./audio/walking.wav");

  currentImage = 0;

  constructor() {
    super().setImage("./img/2_character_pepe/1_idle/idle/I-1.png");

    this.applyGravity();

    this.IMAGES_IDLE.forEach((element) => {
      for (let index = 0; index < this.reps; index++) {
        this.IMAGES_IDLE2.push(element);
      }
    });

    this.IMAGES_WALK.forEach((element) => {
      for (let index = 0; index < this.reps; index++) {
        this.IMAGES_WALK2.push(element);
      }
    });

    this.IMAGES_JUMP.forEach((element) => {
      for (let index = 0; index < this.reps; index++) {
        this.IMAGES_JUMP2.push(element);
      }
    });

    this.setImages(this.IMAGES_IDLE2);
    this.setImages(this.IMAGES_WALK2);
    this.setImages(this.IMAGES_JUMP2);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT) {
        this.direction = "right";
        this.walking_sound.play();
        if (this.x < this.world.level.level_end_x) {
          this.x += this.speed;
        }
        let i = this.currentImage % this.IMAGES_WALK2.length;
        let path = this.IMAGES_WALK2[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else if (this.world.keyboard.LEFT) {
        this.direction = "left";
        this.walking_sound.play();
        if (this.x > 0) {
          this.x -= this.speed;
        }
        let i = this.currentImage % this.IMAGES_WALK2.length;
        let path = this.IMAGES_WALK2[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let i = this.currentImage % this.IMAGES_IDLE2.length;
        let path = this.IMAGES_IDLE2[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }

      if (this.world.keyboard.UP || this.isAboveGround()) {
        this.y -= this.speedY;
        let i = this.currentImage % this.IMAGES_JUMP2.length;
        let path = this.IMAGES_JUMP2[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }

      this.world.camera_x = -this.x + 100;
    }, fps);
  }

  jump() {}
}

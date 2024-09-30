class Character extends MovableObject {
    x = 120;
    y = 370;

    scaleFactor;
    energy;

    lastHit = 0;

    speed = 10;

    collectedBottles = 0;
    collectedCoins = 0;
    lives;

    img_counter = 0;

    offset = {
        top: 130,//130,
        bottom: 15, //145,
        left: 30, //30,
        right: 80, //80,
    }
    offsetFactor;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    walking_sound = new Audio('./audio/walking.wav');
    jumping_sound = new Audio('./audio/jump8bit.mp3');
    longidle_sound = new Audio('./audio/snoring2.mp3');
    isHurt_sound = new Audio('./audio/autsch.mp3');
    isDead_sound = new Audio('./audio/pepe_death2.mp3');

    constructor(lives, energy, collectedBottles, collectedCoins) {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.lives = lives;
        this.energy = energy;
        this.collectedBottles = collectedBottles;
        this.collectedCoins = collectedCoins;
        this.scaleFactor = 0.275 / 2 * this.energy;
        this.offsetFactor = 0.5 * this.energy;


        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();

    }

    animate() {
        this.standingTimeStamp = new Date().getTime();
        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x + 720) {
                this.longidle_sound.pause();
                this.moveRight();
                this.otherDirection = false;
                this.standingTimeStamp = new Date().getTime();
            }
            else if (this.world.keyboard.LEFT && this.x > 0) {
                this.longidle_sound.pause();
                this.moveLeft();
                this.otherDirection = true;
                this.standingTimeStamp = new Date().getTime();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.longidle_sound.pause();
                this.jump(30);
                this.jumping_sound.play();
                this.standingTimeStamp = new Date().getTime();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60); // quasi speed!

        setInterval(() => {
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_IDLE);

            if (this.isLongIdle() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_LONGIDLE);
                this.longidle_sound.play();
            }

            if (this.isDead()) {

                this.playAnimation(this.IMAGES_DEAD);
                this.img_counter++;

                this.isDead_sound.play();
                //console.log("tot");

                //restart level
                //this.lives--;
                // wenn animation durchgelaufen
                if (this.img_counter > 3) {
                    this.lives--;
                    if (this.lives >= 1) {
                        clearAllIntervals();
                        clearAllSounds();
                        startGame(world.level_no, this.lives, 1, 0, 0);
                    } else {
                        world.gameOver = true;
                        clearAllIntervals();
                        clearAllSounds();
                    }
                }

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                //console.log("pepe is hurt");
                this.isHurt_sound.play();
            }
            else if (this.isAboveGround()) {

                if (this.currentImage > 3 && this.speedY >= 0) {
                    this.currentImage = 3;
                } else if (this.currentImage > 4 && this.speedY < 0 && this.speedY > -20) {
                    this.currentImage = 4;
                } else if (this.currentImage > this.IMAGES_JUMPING.length && this.speedY < 0) {
                    this.currentImage = this.IMAGES_JUMPING.length;
                }

                this.playAnimation(this.IMAGES_JUMPING);

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // walk animaton
                    this.playAnimation(this.IMAGES_WALKING);
                    this.walking_sound.play();

                }
            }
        }, 125);
    }






}
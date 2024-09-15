class SmallChicken extends MovableObject {


    x = 2500 + Math.random() * 500;
    y = 365;
    scaleFactor = 0.375;
    speedY = 20;

    speed = 0.15 + Math.random() * 0.5;

    death_sound = new Audio('./audio/chicken.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.jump(30);
        }, 3000);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
    }

}
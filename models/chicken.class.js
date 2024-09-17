class Chicken extends MovableObject {


    x = 1000 + Math.random() * 500;
    y = 365;
    scaleFactor = 0.375;

    isDead = false;

    speed = 0.15 + Math.random() * 0.5;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    death_sound = new Audio('./audio/chicken.mp3');

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.animate();
    }


    animate() {

        let interval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)


        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING)
            } else {
                clearInterval(interval);
                this.playAnimation(this.IMAGE_DEAD)
            }
        }, 200);
    }

}
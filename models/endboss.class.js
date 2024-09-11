class Endboss extends MovableObject {

    scaleFactor = 0.375;
    y = -60;
    x = 4000;
    speed = .5;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    constructor() {
        //super().loadImage(this.IMAGES_WALKING[0]);
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {


        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
    }

}
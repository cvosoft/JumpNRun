class Bottle extends MovableObject {
    x;
    y = 360;
    scaleFactor = 0.2;
    collect_sound = new Audio('./audio/bottle.mp3');

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(x) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 1500);
    }
}
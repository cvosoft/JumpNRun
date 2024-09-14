class Bottle extends MovableObject {

    x;
    y = 360;
    scaleFactor = 0.2;


    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(x) {
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 1500);
    }

}
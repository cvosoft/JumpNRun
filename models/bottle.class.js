class Bottle extends MovableObject {

    x;
    y = 300;
    scaleFactor = 0.2;


    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
    }

}
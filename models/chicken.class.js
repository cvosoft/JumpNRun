class Chicken extends MovableObject {

    x = 200 + Math.random() * 500;

    y = 360;
    height = 60;
    width = 80;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }

}
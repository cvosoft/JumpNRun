class Coin extends MovableObject {

    x;
    y;
    scaleFactor = 0.375; 


    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }

}
class Coin extends MovableObject {

    x;
    y;
    scaleFactor = 0.375;


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200);

    }

}
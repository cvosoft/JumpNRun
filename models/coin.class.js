class Coin extends MovableObject {
    x;
    y;
    scaleFactor = 0.375;
    collect_sound = new Audio('./audio/cash.mp3');

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200);
    }
}
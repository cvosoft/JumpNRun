class BonusItem extends MovableObject {

    x;
    y;
    scaleFactor = 0.5;

    collect_sound = new Audio('./audio/bonusitem.mp3');

    IMAGE = [
        'img/HP_Debuff.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;

    }

}
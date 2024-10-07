class LivesStatus extends DrawableObject {
    x = 20;
    y = 55;
    scaleFactor = 0.275;
    img = 'img/7_statusbars/3_icons/icon_health.png';

    constructor() {
        super().loadImage(this.img);
    }
}


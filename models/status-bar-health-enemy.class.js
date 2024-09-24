class StatusBarHealthEnemy extends DrawableObject {

    x = 500;
    y = 60;
    //width = 200;
    //height = 60;
    scaleFactor = 0.35;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png', // 0
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png', // 1 
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png', // 2
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png', // 3
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png', // 4
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png', // 5

    ];

    percentage;

    constructor() {
        super().loadImage(this.IMAGES[5]);
        this.loadImages(this.IMAGES);
        this.setPercentage(5);
    }

    setPercentage(percentage) { //wert zwischen 5 und 0
        this.percentage = percentage;
        let path = this.IMAGES[this.percentage];
        this.img = this.imageCache[path];
    }

    // resolveImageIndex() {
    //     if (this.percentage == 5) {
    //         return 5;
    //     } else if (this.percentage > 4) {
    //         return 4;
    //     } else if (this.percentage > 3) {
    //         return 3;
    //     } else if (this.percentage > 2) {
    //         return 2;
    //     } else if (this.percentage > 1) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }




}


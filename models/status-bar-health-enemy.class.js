class StatusBarHealthEnemy extends DrawableObject {
    x = 500;
    y = 60;
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

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.percentage];
        this.img = this.imageCache[path];
    }
}


class StatusBarHealth extends DrawableObject {

    x = 20;
    y =  50;
    //width = 200;
    //height = 60;
    scaleFactor = 0.35;

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png', // 5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage > 4) {
            return 4;
        } else if (this.percentage > 3) {
            return 3;
        } else if (this.percentage > 2) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }

    }


}


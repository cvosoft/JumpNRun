class BackgroundObject extends MovableObject {

    width = 720;
    height = 405;


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 405 - this.height; // 480-400 = 80

    }

}
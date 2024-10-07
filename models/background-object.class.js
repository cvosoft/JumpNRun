class BackgroundObject extends MovableObject {
    y = 405;
    scaleFactor = 0.375;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
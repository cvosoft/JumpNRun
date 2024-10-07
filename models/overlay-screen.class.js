class OverlayScreen extends DrawableObject {
    x = 0;
    y = 405;
    scaleFactor = 0.375;

    constructor(image, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(image);
    }
}
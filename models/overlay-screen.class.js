class OverlayScreen extends DrawableObject {

    x = 0;
    y = 405;
    //width = 720;
    //height = 405;
    scaleFactor = 0.375; // macht aus 1920 -> 720


    constructor(image, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(image);
    }

}
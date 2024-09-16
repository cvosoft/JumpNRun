class OverlayScreen extends DrawableObject {

    y = 405;
    x = 0;
    //width = 720;
    //height = 405;
    scaleFactor = 0.375; // macht aus 1920 -> 720
    

    constructor(image) {
        super().loadImage(image);
    }

}
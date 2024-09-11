class BackgroundObject extends MovableObject {

    y = 405;
    //width = 720;
    //height = 405;
    scaleFactor = 0.375; // macht aus 1920 -> 720


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }

}
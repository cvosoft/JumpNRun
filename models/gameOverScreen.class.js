class GameOverScreen extends DrawableObject {

    y = 405;
    x = 0;
    //width = 720;
    //height = 405;
    scaleFactor = 0.375; // macht aus 1920 -> 720
    img = "img/9_intro_outro_screens/game_over/game over!.png"


    constructor() {
        super().loadImage(this.img);
    }

}
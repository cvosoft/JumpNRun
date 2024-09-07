class Cloud extends MovableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 405;


    //

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    animate() {
        this.moveLeft();

    }




}
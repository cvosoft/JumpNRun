class Cloud extends MovableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 405;
    speed = .1;


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }

}
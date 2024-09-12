class Cloud extends MovableObject {
 
    x;
    y = 405;
    scaleFactor = 0.375;
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
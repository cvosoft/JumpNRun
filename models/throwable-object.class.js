class ThrowableObject extends MovableObject {

    x;
    y;
    scaleFactor = 0.2;


    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATE[0]);
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.speedY = 40;
        this.applyGravity();
        this.animate();
    }



    checkHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            world.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {

                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {

                        let index = world.level.enemies.indexOf(enemy);
                        world.level.enemies[index].death_sound.play();
                        world.level.enemies.splice(index, 1);
                    } else if (enemy instanceof Endboss) {
                        let index = world.level.enemies.indexOf(enemy);
                        world.level.enemies[index].energy--;

                    }


                }
            })
        })
    }


    animate() {

        setInterval(() => {
            this.x += 30;
            this.checkHitEnemy();
        }, 60)


        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE)
        }, 50);

    }
}
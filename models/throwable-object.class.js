class ThrowableObject extends MovableObject {

    x;
    y;
    scaleFactor = 0.2;
    otherDirection;
    onFloor = false;
    broken = false;

    throwSound = new Audio('./audio/throw.mp3');
    clirrSound = new Audio('./audio/clirr.mp3');


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
        this.otherDirection = world.character.otherDirection;

        if (!gameSoundFX) {
            this.throwSound.volume = 0;
            this.clirrSound.volume = 0;
        }

    }


    checkOnFloor() {
        if (this.y > 360) {
            this.onFloor = true;
        };
    }


    checkHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            world.throwableObjects.forEach((bottle) => {


                if (bottle.isColliding(enemy) && !bottle.broken && !bottle.onFloor) {

                    if (gameSoundFX) { bottle.clirrSound.play(); }


                    // remove?
                    //let index = world.throwableObjects.indexOf(bottle);
                    //world.throwableObjects.splice(index, 1);


                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                        let index = world.level.enemies.indexOf(enemy);
                        if (gameSoundFX) { world.level.enemies[index].death_sound.play(); }
                        world.level.enemies.splice(index, 1);
                        bottle.broken = true;


                    } else if (enemy instanceof Endboss) {
                        // nur wenn der nicht gerade schon getroffen wurde
                        let index = world.level.enemies.indexOf(enemy);

                        bottle.broken = true;



                        world.level.enemies[index].hit();


                        world.StatusBarHealthEnemy.setPercentage(world.level.enemies[index].energy);


                    }



                }
            })
        })
    }


    animate() {

        setInterval(() => {

            this.checkOnFloor();

            if (!this.onFloor) {

                if (this.otherDirection == false) {
                    this.x += 30;
                } else {
                    this.x -= 30;
                }
                this.checkHitEnemy();

            }

        }, 60)


        let interval = setInterval(() => {
            if (!this.onFloor) {
                this.playAnimation(this.IMAGES_ROTATE)
            }
            else if (this.broken || this.onFloor) {

                this.playAnimation(this.IMAGES_SPLASH);

                if (this.currentImage > 5) {
                    clearInterval(interval);
                }

            }
        }, 50);

    }
}
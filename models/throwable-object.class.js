class ThrowableObject extends MovableObject {
    x;
    y;
    scaleFactor = 0.2;
    otherDirection;
    broken = false;
    throwSound = new Audio('./audio/throw.mp3');
    clirrSound = new Audio('./audio/clirr.mp3');
    imgCounter = 0;

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
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        this.otherDirection = world.character.otherDirection;
    }

    /**
     * function to remove a thrown bottle from the canvas
     * @param {} bottle 
     */
    removeBottleFromGame(bottle) {
        bottle.broken = true;
        playSoundFX(bottle.clirrSound);
        this.playAnimation(this.IMAGES_SPLASH);
        let index = world.throwableObjects.indexOf(bottle);
        setTimeout(() => world.throwableObjects.splice(index, 1), 100);
    }

    /**
     * function to check if a bottle landed on the ground
     */
    checkHitGround() {
        world.throwableObjects.forEach((bottle) => {
            if (bottle.y == 370 && bottle.speedY < 0) {
                this.removeBottleFromGame(bottle);
            }
        });
    }

    /**
     * function to check if a bottle hit an enemy
     */
    checkHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            world.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.broken) {
                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                        let index = world.level.enemies.indexOf(enemy);
                        playSoundFX(world.level.enemies[index].death_sound);
                        world.level.enemies[index].energy--;
                    } else if (enemy instanceof Endboss) {
                        let index = world.level.enemies.indexOf(enemy);
                        world.level.enemies[index].hit();
                        world.StatusBarHealthEnemy.setPercentage(world.level.enemies[index].energy);
                    }
                    this.removeBottleFromGame(bottle);
                }
            })
        })
    }

    /**
     * animation function for the throwable bottes
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATE)
                if (this.otherDirection == false) {
                    this.x += 30;
                } else {
                    this.x -= 30;
                }
                this.checkHitEnemy();
            }
            this.checkHitGround();
        }, 50)
    }
}
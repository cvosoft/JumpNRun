class Endboss extends MovableObject {

    scaleFactor = 0.375;
    y = 400;
    x = 4000;
    speed = .5;
    energy = 5;
    isDead = false;
    lastHit = 0;

    actualImage;


    death_sound = new Audio('./audio/death_endboss.mp3');
    hurt_sound = new Audio('./audio/chicken_cry.mp3');

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    animate() {


        let walkInterval = setInterval(() => {
            this.moveLeft();
        }, 60)


        let interval = setInterval(() => {
            this.speed = 0.5;
            this.playAnimation(this.IMAGES_WALKING);
            if (this.x < world.character.x + 300) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed += 1;
            }
            else if (this.x < world.character.x + 350) {
                this.playAnimation(this.IMAGES_ALERT);
                this.speed = 0;
            }

            if (this.energy <= 0) {
                this.actualImage = this.currentImage;
                this.isDead = true;
                clearInterval(walkInterval);
                this.playAnimation(this.IMAGES_DEAD);

                //if (this.currentImage > 20) {
                //    clearInterval(interval);
                //}


            }

            if (this.isHurt()) {
                this.hurt_sound.play();
                this.playAnimation(this.IMAGES_HURT);

            }

        }, 150);
    }

}
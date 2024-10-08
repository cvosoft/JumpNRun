class Endboss extends MovableObject {
    scaleFactor = 0.375;
    y = 400;
    x = 4000;
    speed = .5;
    energy = 5;
    lastHit = 0;
    death_sound = new Audio('./audio/death_endboss.mp3');
    hurt_sound = new Audio('./audio/chicken_cry.mp3');
    img_counter = 0;

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

    /**
     * function how to handle animation when endboss is dead
     */
    handleEndbossDead(walkInterval, interval) {
        clearInterval(walkInterval);
        this.img_counter++;
        this.playAnimation(this.IMAGES_DEAD);
        playSoundFX(this.death_sound);
        if (this.img_counter >= 3) {
            this.loadImage(this.IMAGES_DEAD[2]);
            clearInterval(interval);
        }
    }

    /**
    * function how to handle animation when endboss is hurt
    */
    handleEndbossHurt() {
        playSoundFX(this.hurt_sound);
        this.playAnimation(this.IMAGES_HURT);
        this.speed += 2;
    }

    /**
    * function how to handle animation when endboss is alert
    */
    handleEndbossAlert() {
        this.playAnimation(this.IMAGES_ALERT);
        this.speed = 0;
    }

    /**
     * animation function for the endboss
     */
    animate() {
        let walkInterval = setInterval(() => { this.moveLeft(); }, 60)
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.x < world.character.x + 300) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed += 1;
            } else if (this.x < world.character.x + 350) { this.handleEndbossAlert() }
            if (this.isHurt()) { this.handleEndbossHurt(); }
            if (this.isDead()) { this.handleEndbossDead(walkInterval, interval); }
        }, 150);
    }
}
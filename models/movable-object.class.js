class MovableObject extends DrawableObject {

    speed = 0.15;


    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    energy;

    lastHit;

    standingTimeStamp;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }



    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 370) {
                    this.y = 370;
                }
            }
        }, 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // always fall
            return true;
        } else {
            return this.y < 370;   //50; // start y des charakters
        }
    }


    jump(speedY) {
        this.currentImage = 0;
        this.speedY = speedY;
    }



    isJumpingOn(mo) {
        //console.log(Math.round(this.y - 15));
        return this.x + 65 >= mo.x &&
            this.x + this.img.naturalWidth * this.scaleFactor - 130 <= mo.x + mo.img.naturalWidth * mo.scaleFactor &&
            this.y - 15 <= (mo.y - mo.img.naturalHeight * mo.scaleFactor) + 50 &&
            this.y - 15 >= (mo.y - mo.img.naturalHeight * mo.scaleFactor) - 50
    }



    isColliding(mo) {
        this.width = this.img.naturalWidth * this.scaleFactor;
        this.height = this.img.naturalHeight * this.scaleFactor;
        mo.width = mo.img.naturalWidth * mo.scaleFactor;
        mo.height = mo.img.naturalHeight * mo.scaleFactor;

        //y1: links UNTEN!
        //y2 : links oben, also links unten MINUS height
        return this.x + this.width - this.offset.right > mo.x - mo.offset.left &&  // x2_ch > x1_mo
            this.y - this.offset.bottom > mo.y - mo.height + mo.offset.top && // y1_ch > y2_mo 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // x1_ch < x2_mo
            this.y - this.height + this.offset.top < mo.y - mo.offset.top; // y2_ch > y1_mo
    }


    hit() {
        //this.energy -= 5;
        // egal wer ... speichern
        this.lastHit = new Date().getTime();
        if (this.energy > 0) {
            this.energy--;
        }

        if (this.energy > 0) {
            if (this instanceof Character) { // nur pepe darf schrumpfen
                this.scaleFactor = this.scaleFactor / 2;
            }
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    isHurt() {     
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isLongIdle() {
        let timepassed = new Date().getTime() - this.standingTimeStamp; // difference in ms
        timepassed = timepassed / 1000;
        //console.log(timepassed);

        return timepassed > 10;
    }

}
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

    offsetFactor = 1;

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
        return this.y < 370;
    }

    jump(speedY) {
        this.currentImage = 0;
        this.speedY = speedY;
    }

    isJumpingOn(mo) {
        return this.y <= (mo.y - mo.img.naturalHeight * mo.scaleFactor) + 50 &&
            this.y >= (mo.y - mo.img.naturalHeight * mo.scaleFactor) - 50
    }

    isColliding(mo) {
        this.width = this.img.naturalWidth * this.scaleFactor;
        this.height = this.img.naturalHeight * this.scaleFactor;
        mo.width = mo.img.naturalWidth * mo.scaleFactor;
        mo.height = mo.img.naturalHeight * mo.scaleFactor;

        return this.x + this.width - this.offset.right * this.offsetFactor > mo.x - mo.offset.left * mo.offsetFactor &&  // x2_ch > x1_mo
            this.y - this.offset.bottom * this.offsetFactor > mo.y - mo.height + mo.offset.top * mo.offsetFactor && // y1_ch > y2_mo 
            this.x + this.offset.left * this.offsetFactor < mo.x + mo.width - mo.offset.right * mo.offsetFactor && // x1_ch < x2_mo
            this.y - this.height + this.offset.top * this.offsetFactor < mo.y - mo.offset.top * mo.offsetFactor; // y2_ch > y1_mo
    }

    hit() {
        this.lastHit = new Date().getTime();
        if (this.energy > 0) {
            this.energy--;
        }
        if (this.energy > 0) {
            if (this instanceof Character) {
                this.scaleFactor = this.scaleFactor / 2;
                this.offsetFactor = this.offsetFactor / 2;
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
        return timepassed > 10;
    }
}
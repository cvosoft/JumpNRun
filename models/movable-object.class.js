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

    /**
     * function to move an object to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * function to move an object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * function to play an repeated animation from the given images
     * @param {} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * function to apply gravity to objects
     */
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

    /**
     * function to check if an object is above the ground
     * @returns true/false
     */
    isAboveGround() {
        return this.y < 370;
    }

    /**
     * function to calculate a jump of an objectt
     * @param {} speedY 
     */
    jump(speedY) {
        this.currentImage = 0;
        this.speedY = speedY;
    }

    /**
     * function to check if an object is above another object
     * @param {*} mo 
     * @returns true/false
     */
    isJumpingOn(mo) {
        return this.y <= (mo.y - mo.img.naturalHeight * mo.scaleFactor) + 50 &&
            this.y >= (mo.y - mo.img.naturalHeight * mo.scaleFactor) - 50
    }

    /**
     * function to check if two objects are colliding
     * @param {*} mo 
     * @returns true/false 
     */
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

    /**
     * function to calculate the action when an object is hit
     */
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

    /**
     * function to check if an object is dead
     * @returns true/false
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * function to check if an object is hurt
     * @returns true/false
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * function to check if an object has not been moved for a time of 10 seconds
     * @returns true/false
     */
    isLongIdle() {
        let timepassed = new Date().getTime() - this.standingTimeStamp; // difference in ms
        timepassed = timepassed / 1000;
        return timepassed > 10;
    }
}
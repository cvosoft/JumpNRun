class MovableObject extends DrawableObject {

    speed = 0.15;


    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    //energy = 100;
    energy = 2;
    lastHit = 0;

    standingTimeStamp;





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





    // Formel zur Kollisionsberechnung
    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height
    // }

    isColliding(mo) {
        return this.x + this.img.naturalWidth * this.scaleFactor >= mo.x &&
            this.x <= (mo.x + mo.img.naturalWidth * mo.scaleFactor) &&
            this.y + this.img.naturalHeight * this.scaleFactor >= mo.y &&
            this.y <= mo.y + mo.img.naturalHeight * mo.scaleFactor
    }

    // isJumpingOn(mo) {
    //     return  this.x + this.img.naturalWidth * this.scaleFactor >= mo.x &&
    //             this.x <= (mo.x + mo.img.naturalWidth * mo.scaleFactor) &&
    //             this.y - this.img.naturalHeight * this.scaleFactor + this.img.naturalHeight * this.scaleFactor >= mo.y - mo.img.naturalHeight * mo.scaleFactor
    // }

    isJumpingOn(mo) {
        //console.log(Math.round(this.y - 15));
        return this.x + 65 >= mo.x &&
            this.x + this.img.naturalWidth * this.scaleFactor - 130 <= mo.x + mo.img.naturalWidth * mo.scaleFactor &&
            this.y - 15 <= (mo.y - mo.img.naturalHeight * mo.scaleFactor) + 50 &&
            this.y - 15 >= (mo.y - mo.img.naturalHeight * mo.scaleFactor) - 50
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isCollidingNew(mo) {
        return (this.x + this.width) >= mo.x &&
            this.x <= (mo.x + mo.width) &&
            (this.y + this.offsetY + this.height) >= mo.y &&
            (this.y + this.offsetY) <= (mo.Y + mo.height) &&
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        //this.energy -= 5;
        this.energy -= 1;
        if (this.energy > 0) {
            this.scaleFactor = this.scaleFactor / 2;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
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
class MovableObject extends DrawableObject {

    speed = 0.15;


    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;





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
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // always fall
            return true;
        } else {
            return this.y < 120; // start y des charakters
        }
    }


    jump() {
        this.currentImage = 0;
        this.speedY = 30;
    }




    // Formel zur Kollisionsberechnung
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
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
        this.energy -= 5;
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

}
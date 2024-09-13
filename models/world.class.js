class World {

    character = new Character();

    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    //StatusBarHealth = new StatusBarHealth();
    //StatusBarCoin = new StatusBarCoin();
    //StatusBarBottle = new StatusBarBottle();
    CoinStatus = new CoinStatus();
    BottleStatus = new BottleStatus();
    LivesStatus = new LivesStatus();

    throwableObjects = [];

    gameMusic = new Audio('./audio/intromusic.mp3');

    fps = 60;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "white";
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        //this.gameMusic.loop = true;
        //this.gameMusic.play();

    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkKillsByJumpingOn();
            this.checkThrowObjects();
            this.checkCollectionOfBottles();
            this.checkCollectionOfCoins();
            this.checkCollisions();
        }, 1000 / 60);
    }




    checkCollectionOfBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                //console.log("flasche!");
                //remove from screen
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                //update counter
                this.character.collectedBottles += 1;
            }
        });
    }

    checkCollectionOfCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                //console.log("coin!");
                //remove from screen
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                //update counter
                this.character.collectedCoins += 1;
            }
        });
    }

    checkKillsByJumpingOn() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy)) {
                console.log("treffer!");
                if (this.keyboard.SPACE) {
                    this.character.jump(40);
                }
                else {
                    this.character.jump(20);
                }
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                //death animation
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                //this.StatusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles -= 1;
        }
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        // fixed objects:
        //this.addToMap(this.StatusBarHealth);
        //this.addToMap(this.StatusBarCoin);
        //this.addToMap(this.StatusBarBottle);
        this.addToMap(this.CoinStatus);
        this.ctx.fillText(this.character.collectedCoins, 265, 48);
        this.addToMap(this.BottleStatus);
        this.ctx.fillText(this.character.collectedBottles, 165, 48);
        this.addToMap(this.LivesStatus);
        this.ctx.fillText(this.character.lives, 65, 48);

        // character
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        // draw() immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        //this.ctx.translate(mo.width, 0);
        this.ctx.translate(mo.img.naturalWidth * mo.scaleFactor, 0);
        this.ctx.scale(-1, 1);
        mo.x = -mo.x;
    }

    flipImageBack(mo) {
        mo.x = -mo.x;
        this.ctx.restore();
    }

}
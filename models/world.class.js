class World {

    level;
    level_no;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    //StatusBarHealth = new StatusBarHealth();
    //StatusBarCoin = new StatusBarCoin();
    //StatusBarBottle = new StatusBarBottle();
    StatusBarHealthEnemy = new StatusBarHealthEnemy();
    CoinStatus = new CoinStatus();
    BottleStatus = new BottleStatus();
    LivesStatus = new LivesStatus();

    throwableObjects = [];

    gameMusic = new Audio('./audio/intromusic.mp3');

    fps = 60;

    lastThrow = 0;

    gameOver = false;
    win = false;

    gameOverImg = "img/9_intro_outro_screens/game_over/game over!.png";
    winImg = "img/9_intro_outro_screens/win/win_1.png";

    fullscreen = false;


    constructor(canvas, keyboard, level_no, lives) {

        this.character = new Character(lives);

        this.gameoverscreen = new OverlayScreen(this.gameOverImg);
        this.winscreen = new OverlayScreen(this.winImg);

        this.ctx = canvas.getContext('2d');
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "white";

        // level init
        switch (level_no) {
            case 1:
                initLevel1();
                this.level = level1;
                break;

            case 2:
                initLevel2();
                this.level = level2;
                break;
            case 3:
                initLevel3();
                this.level = level3;
                break;
        }


        //this.level = level;
        this.level_no = level_no;
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
            this.checkThrowObjects();
            this.checkCollectionOfBottles();
            this.checkCollectionOfCoins();
            this.checkCollisions();
            this.checkIsDead();
            this.checkToggleFullscreen();
            this.checkLevelComplete();
        }, 1000 / 10);

    }


    checkLevelComplete() {
        if (this.level.enemies == 0) {
            clearAllIntervals();
            this.level_no++;

            if (this.level_no <= 3) {
                startGame(this.level_no, this.character.lives);
            }
            else {
                this.win = true;
                clearAllIntervals();
            }
        }
    }



    checkToggleFullscreen() {
        if (this.keyboard.F) {
            if (!this.fullscreen) {
                this.canvas.requestFullscreen();
                this.fullscreen = true;
            } else {
                document.exitFullscreen();
                this.fullscreen = false;
            }
        }
    }


    checkIsDead() {
        if (world.character.isDead()) {
            //2 sekunden pause
            //wait(2000);

            //animation?


            world.character.lives--;

            // neustart aktuelles level
            if (world.character.lives >= 1) {
                startGame(this.level_no, this.character.lives)
            } else {

                this.gameOver = true;
                clearAllIntervals();



            }

        }
    }

    checkCollectionOfBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                //console.log("flasche!");
                //remove from screen
                let index = this.level.bottles.indexOf(bottle);
                this.level.bottles[index].collect_sound.play();
                this.level.bottles.splice(index, 1);
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
                let index = this.level.coins.indexOf(coin);
                this.level.coins[index].collect_sound.play();
                this.level.coins.splice(index, 1);
                //update counter
                this.character.collectedCoins += 1;
            }
        });
    }



    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy)) {
                console.log("treffer!");
                if (this.keyboard.SPACE) {
                    this.character.jump(40);
                    this.character.jumping_sound.play();
                }
                else {
                    this.character.jump(20);
                }
                //death sound+ remove
                let index = this.level.enemies.indexOf(enemy);
                this.level.enemies[index].death_sound.play();
                this.level.enemies.splice(index, 1);



                //death animation
            }

            else if (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy)) {
                this.character.hit();
                //this.StatusBarHealth.setPercentage(this.character.energy);


            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            let actualThrow = new Date().getTime() / 1000; // [s]
            if (actualThrow - this.lastThrow > 0.5) { // nur alle 0,5s werfen können
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.lastThrow = actualThrow;
                this.throwableObjects.push(bottle);
                this.character.collectedBottles -= 1;
            }
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
        this.ctx.fillText(`Level: ${this.level_no}`, 80, this.canvas.height);
        this.ctx.translate(-this.camera_x, 0);



        // fixed objects:
        //this.addToMap(this.StatusBarHealth);
        //this.addToMap(this.StatusBarCoin);
        //this.addToMap(this.StatusBarBottle);
        this.addToMap(this.StatusBarHealthEnemy);
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


        // game over screen
        if (this.gameOver) {
            this.addToMap(this.gameoverscreen);
        }
        // win screen
        if (this.win) {
            this.addToMap(this.winscreen);
        }


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
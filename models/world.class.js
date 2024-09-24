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
    levelComplete = new Audio('./audio/level_complete.mp3');
    gameWonMusic = new Audio('./audio/gameWon.mp3');
    gameOverSound = new Audio('./audio/gameOver.mp3');

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
            this.checkCollectionOfBonusItems();
            this.checkCollisions();
            //this.checkIsDead();
            this.checkToggleFullscreen();
            this.checkLevelComplete();
        }, 1000 / 10);

    }


    checkLevelComplete() {
        //if (this.level.enemies == 0) {
        if (this.character.x >= this.level.level_end_x + 720) {
            clearAllSounds();
            clearAllIntervals();
            this.levelComplete.play();

            this.level_no++;

            if (this.level_no <= 3) {
                startGame(this.level_no, this.character.lives);
            }
            else {
                this.win = true;
                this.gameWonMusic.play();
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
            wait(2000);

            //animation?


            world.character.lives--;

            // neustart aktuelles level
            if (world.character.lives >= 1) {
                clearAllIntervals();
                clearAllSounds();
                startGame(this.level_no, this.character.lives)
            } else {

                this.gameOver = true;
                clearAllIntervals();
                clearAllSounds();



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


    checkCollectionOfBonusItems() {
        this.level.bonusItems.forEach((item) => {
            if (this.character.isColliding(item)) {
                //console.log("flasche!");
                //remove from screen
                let index = this.level.bonusItems.indexOf(item);
                this.level.bonusItems[index].collect_sound.play();
                this.level.bonusItems.splice(index, 1);

                if (this.character.energy == 1) {
                    this.character.energy += 1;
                    this.character.scaleFactor *= 2;
                }
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
            if (this.character.isJumpingOn(enemy) && !enemy.isDead) {
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
                this.level.enemies[index].isDead = true;
                //this.level.enemies.splice(index, 1);



                //death animation
            }

            else if (this.character.isColliding(enemy) && !enemy.isDead && !this.character.isJumpingOn(enemy)) {
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
                bottle.throwSound.play();
                this.lastThrow = actualThrow;
                this.throwableObjects.push(bottle);
                this.character.collectedBottles -= 1;
            }
        }
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(this.camera_x, 0);
        } else { this.ctx.translate(-this.level.level_end_x + 100, 0); }


        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.bonusItems);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.font = "30px serif";
        this.ctx.fillText(`Level: ${this.level_no}`, 80, this.canvas.height - 10);


        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(-this.camera_x, 0);
        } else { this.ctx.translate(this.level.level_end_x - 100, 0); }


        // fixed objects:
        //this.addToMap(this.StatusBarHealth);
        //this.addToMap(this.StatusBarCoin);
        //this.addToMap(this.StatusBarBottle);


        if (this.level.enemies[this.level.enemies.length - 1].x < this.character.x + 450) {
            this.addToMap(this.StatusBarHealthEnemy);
        }

        this.ctx.font = "50px serif";
        this.addToMap(this.CoinStatus);
        this.ctx.fillText(this.character.collectedCoins, 265, 48);
        this.addToMap(this.BottleStatus);
        this.ctx.fillText(this.character.collectedBottles, 165, 48);
        this.addToMap(this.LivesStatus);
        this.ctx.fillText(this.character.lives, 65, 48);

        // character
        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(this.camera_x, 0);
        } else { this.ctx.translate(-this.level.level_end_x + 100, 0); }

        this.addToMap(this.character);

        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(-this.camera_x, 0);
        } else { this.ctx.translate(this.level.level_end_x - 100, 0); }


        // game over screen
        if (this.gameOver) {
            gameRunning = false;
            this.addToMap(this.gameoverscreen);
            this.gameOverSound.play();
            setTimeout(() => {
                this.gameOverSound.pause();
            }, 1000);
            if (this.keyboard.SPACE) {
                this.gameOver = false;
                this.win = false;
                gameRunning = false;
                clearAllIntervals();
                //clearAllSounds();

                init();
            }

        }
        // win screen
        if (this.win) {
            this.addToMap(this.winscreen);
            if (this.keyboard.SPACE) {
                this.gameOver = false;
                this.win = false;
                gameRunning = false;
                clearAllIntervals();
                //clearAllSounds();
                this.gameWonMusic.pause();
                init();
            }
        }


        // draw() immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            if (gameRunning) {
                self.draw()
            }
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
        //mo.drawFrame(this.ctx); -> for debugging

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
class World {
    level;
    level_no;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    StatusBarHealthEnemy = new StatusBarHealthEnemy();
    CoinStatus = new CoinStatus();
    BottleStatus = new BottleStatus();
    LivesStatus = new LivesStatus();
    throwableObjects = [];
    lastThrow = 0;
    gameMusic = new Audio('./audio/intromusic.mp3');
    levelComplete = new Audio('./audio/level_complete.mp3');
    gameWonMusic = new Audio('./audio/gameWon.mp3');
    gameOverSound = new Audio('./audio/gameOver.mp3');
    gameOver = false;
    win = false;
    gameOverImg = "img/9_intro_outro_screens/game_over/game over!.png";
    winImg = "img/9_intro_outro_screens/win/win_1.png";
    fullscreen = false;

    constructor(canvas, keyboard, level_no, lives, energy, collectedBottles, collectedCoins) {
        this.character = new Character(lives, energy, collectedBottles, collectedCoins);
        this.gameoverscreen = new OverlayScreen(this.gameOverImg, 0, 405);
        this.winscreen = new OverlayScreen(this.winImg, 720 / 4, 405 / 2);
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "white";
        this.levelinit(level_no);
        this.level_no = level_no;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runFastIntervals();
        this.runSlowIntervals();
        setGameMusic(this);
    }

    /**
     * function to initialize a level
     * @param {} level_no 
     */
    levelinit(level_no) {
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
    }

    /**
     * function to make the world known to the character class
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * function to run the fast intervals (60fps) in the game
     */
    runFastIntervals() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollectionOfBottles();
            this.checkCollectionOfCoins();
            this.checkCollectionOfBonusItems();
            this.checkCollisions();
            this.checkLevelComplete();
        }, 1000 / 60);
    }

    /**
     * function to run the slower intervals in the game (every 100ms)
     */
    runSlowIntervals() {
        setInterval(() => {
            checkToggleFullscreen(this);
            checkToggleSoundAndMusic(this);
            checkQuitGame(this);
        }, 100);
    }

    /**
     * function to check if a level is complete
     */
    checkLevelComplete() {
        if (this.character.x >= this.level.level_end_x + 720 && endboss.isDead()) {
            clearAllSounds();
            clearAllIntervals();
            playSoundFX(this.levelComplete);
            this.level_no++;
            if (this.level_no <= 3) {
                startGame(this.level_no, this.character.lives, this.character.energy, this.character.collectedBottles, this.character.collectedCoins);
            }
            else {
                this.win = true;
                playSoundFX(this.gameWonMusic);
            }
        }
    }

    /**
     * function to check the collection of bottles
     */
    checkCollectionOfBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let index = this.level.bottles.indexOf(bottle);
                playSoundFX(this.level.bottles[index].collect_sound);
                this.level.bottles.splice(index, 1);
                this.character.collectedBottles += 1;
            }
        });
    }

    /**
     * function to check the collection of bonus items
     */
    checkCollectionOfBonusItems() {
        this.level.bonusItems.forEach((item) => {
            if (this.character.isColliding(item)) {
                let index = this.level.bonusItems.indexOf(item);
                playSoundFX(this.level.bonusItems[index].collect_sound);
                this.level.bonusItems.splice(index, 1);
                if (this.character.energy == 1) {
                    this.character.energy += 1;
                    this.character.scaleFactor *= 2;
                    this.character.offsetFactor *= 2;
                } else { this.character.lives++; }
            }
        });
    }

    /**
     * function to check the collection of coins
    */
    checkCollectionOfCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let index = this.level.coins.indexOf(coin);
                playSoundFX(this.level.coins[index].collect_sound);
                this.level.coins.splice(index, 1);
                this.character.collectedCoins += 1;
            }
        });
    }

    /**
     * function to check the collisions of objects
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && this.character.isJumpingOn(enemy) && !enemy.isDead()) {
                if (this.keyboard.SPACE) {
                    this.character.jump(40);
                    playSoundFX(this.character.jumping_sound);
                }
                else { this.character.jump(20); }
                this.enemyIsKilledByJumpingOn(enemy);
            }
            else if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead() && !this.character.isJumpingOn(enemy)) {
                this.character.hit();
            }
        });
    }

    /**
     * function to call when an enemy is killed by being jumoed on
     * @param {*} enemy 
     */
    enemyIsKilledByJumpingOn(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        playSoundFX(this.level.enemies[index].death_sound);
        this.level.enemies[index].energy--;
    }

    /**
     * function to check if an object/bottle shall be thrown
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            let actualThrow = new Date().getTime() / 1000;
            if (actualThrow - this.lastThrow > 0.5) {
                let bottle = new ThrowableObject(this.character.x + 100 * this.character.offsetFactor, this.character.y - 100);
                playSoundFX(bottle.throwSound);
                this.lastThrow = actualThrow;
                this.throwableObjects.push(bottle);
                this.character.collectedBottles--;
            }
        }
    }

    /**
     * function which adds the health status bar of the endboss
     */
    addEndbossStatusBar() {
        if (this.level.enemies[this.level.enemies.length - 1].x < this.character.x + 450) {
            this.addToMap(this.StatusBarHealthEnemy);
        }
    }

    /**
     * function to add the status bars to the map
     */
    addStatusBarsToMap() {
        this.ctx.font = "50px serif";
        this.addToMap(this.CoinStatus);
        this.ctx.fillText(this.character.collectedCoins, 215, 48);
        this.addToMap(this.BottleStatus);
        this.ctx.fillText(this.character.collectedBottles, 140, 48);
        this.addToMap(this.LivesStatus);
        this.ctx.fillText(this.character.lives, 65, 48);
        this.addEndbossStatusBar();
    }

    /**
     * function to add all objects to the map
     */
    addAllObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.bonusItems);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * function to write the level info to the map
     */
    drawLevelInfoToMap() {
        this.ctx.font = "30px serif";
        this.ctx.fillText(`Level: ${this.level_no}`, 80, this.canvas.height - 10);
    }

    /**
     * function to translate the camera before the object are drawn
     */
    translateCameraBeforeObjects() {
        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(this.camera_x, 0);
        } else { this.ctx.translate(-this.level.level_end_x + 100, 0); }
    }

    /**
     * function to translate the camera after the object are drawn
     */
    translateCameraAfterObjects() {
        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(-this.camera_x, 0);
        } else { this.ctx.translate(this.level.level_end_x - 100, 0); }
    }

    /**
     * function to draw the character to the map
     */
    drawCharacterToMap() {
        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(this.camera_x, 0);
        } else { this.ctx.translate(-this.level.level_end_x + 100, 0); }
        this.addToMap(this.character);
        if (this.character.x < this.level.level_end_x) {
            this.ctx.translate(-this.camera_x, 0);
        } else { this.ctx.translate(this.level.level_end_x - 100, 0); }
    }

    /**
     * function to show the game over screen
     */
    showGameOver() {
        if (this.gameOver) {
            gameRunning = false;
            this.addToMap(this.gameoverscreen);
            playSoundFX(this.gameOverSound);
            setTimeout(() => {
                this.gameOverSound.pause();
                this.ctx.font = '30px Zabars';
                this.ctx.fillText('Press space to try again', 250, 385);
                document.getElementById("playIcon").classList.remove("d-none");
            }, 1000);
            this.waitForRestart();
        }
    }

    /**
     * function to wait for a restart of the game
     */
    waitForRestart() {
        if (this.keyboard.SPACE) {
            this.gameOver = false;
            this.win = false;
            gameRunning = false;
            clearAllIntervals();
            clearAllSounds();
            init();
        }
    }

    /**
     * function to show the win screen
     */
    showWinScreen() {
        if (this.win) {
            this.addToMap(this.winscreen);
            this.ctx.font = '30px Zabars';
            this.ctx.fillText('Press space to play again', 250, 385);
            this.waitForRestart();
        }
    }

    /**
     * function to draw everything needed to the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.translateCameraBeforeObjects();
        this.addAllObjectsToMap();
        this.drawLevelInfoToMap();
        this.translateCameraAfterObjects();
        this.addStatusBarsToMap();
        this.drawCharacterToMap();
        this.showGameOver();
        this.showWinScreen();
        let self = this;
        requestAnimationFrame(function () {
            if (gameRunning) { self.draw() }
        });
    }

    /**
     * function to add object to the map
     * @param {} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * general function to add something to the map
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx); //-> for debugging
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * function to flip an image
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.img.naturalWidth * mo.scaleFactor, 0);
        this.ctx.scale(-1, 1);
        mo.x = -mo.x;
    }

    /**
     * function to flip back an image
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = -mo.x;
        this.ctx.restore();
    }
}
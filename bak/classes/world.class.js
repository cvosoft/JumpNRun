class World {
  character = new Character();

  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this; // dem charakter muss die world bekannt sein
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.direction == "left") {
      this.ctx.save();
      this.ctx.translate(mo.img.naturalWidth * mo.scaleFactor, 0);
      this.ctx.scale(-1, 1);
      mo.x = -mo.x;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y - mo.img.naturalHeight * mo.scaleFactor, mo.img.naturalWidth * mo.scaleFactor, mo.img.naturalHeight * mo.scaleFactor);
    if (mo.direction == "left") {
      this.ctx.restore();
      mo.x = -mo.x;
    }
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          //console.log("colision mit pepe");
          enemy.moveAfterColision(enemy.interval);
        }

        if (this.level.enemies[0].isColliding(this.level.enemies[1])) {
          //console.log("colision unter huehnerne");
          //this.enemies[0].moveChickenAfterColision(this.enemies[0].interval);
          //this.enemies[1].moveChickenAfterColision(this.enemies[1].interval);
        }

        if (this.level.enemies[1].isColliding(this.level.enemies[2])) {
          //console.log("colision unter huehnerne");
          //this.enemies[1].moveChickenAfterColision(this.enemies[1].interval);
          //this.enemies[2].moveChickenAfterColision(this.enemies[2].interval);
        }

        if (this.level.enemies[0].isColliding(this.level.enemies[2])) {
          //console.log("colision unter huehnerne");
          //this.enemies[0].moveChickenAfterColision(this.enemies[0].interval);
          //this.enemies[2].moveChickenAfterColision(this.enemies[2].interval);
        }
      });
    }, 50);
  }
}

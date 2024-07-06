class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud("./img/5_background/layers/4_clouds/1.png", 0), new Cloud("./img/5_background/layers/4_clouds/2.png", 720)];

  backgroundObjects = [
    new Background("./img/5_background/layers/air.png"),
    new Background("./img/5_background/layers/3_third_layer/1.png"),
    new Background("./img/5_background/layers/2_second_layer/1.png"),
    new Background("./img/5_background/layers/1_first_layer/1.png"),
  ];

  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.checkCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

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
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.img.naturalWidth * mo.scaleFactor, 0);
      this.ctx.scale(-1, 1);
      mo.x = -mo.x;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y - mo.img.naturalHeight * mo.scaleFactor, mo.img.naturalWidth * mo.scaleFactor, mo.img.naturalHeight * mo.scaleFactor);
    if (mo.otherDirection) {
      this.ctx.restore();
      mo.x = -mo.x;
    }
  }

  checkCollisions() {
    setInterval(() => {
      this.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log("colision mit pepe");
          enemy.moveChickenAfterColision(enemy.interval);
        }

        if (this.enemies[0].isColliding(this.enemies[1])) {
          console.log("colision unter huehnerne");
          //this.enemies[0].moveChickenAfterColision(this.enemies[0].interval);
          //this.enemies[1].moveChickenAfterColision(this.enemies[1].interval);
        }

        if (this.enemies[1].isColliding(this.enemies[2])) {
          console.log("colision unter huehnerne");
          //this.enemies[1].moveChickenAfterColision(this.enemies[1].interval);
          //this.enemies[2].moveChickenAfterColision(this.enemies[2].interval);
        }

        if (this.enemies[0].isColliding(this.enemies[2])) {
          console.log("colision unter huehnerne");
          //this.enemies[0].moveChickenAfterColision(this.enemies[0].interval);
          //this.enemies[2].moveChickenAfterColision(this.enemies[2].interval);
        }
      });
    }, 50);
  }
}

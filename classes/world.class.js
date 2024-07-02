class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new Background("./img/5_background/layers/3_third_layer/1.png"),
    new Background("./img/5_background/layers/2_second_layer/1.png"),
    new Background("./img/5_background/layers/1_first_layer/1.png"),
  ];

  canvas;
  scaleFactor = 0.375; // macht aus 1920:1080 -> 720:405
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
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
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.img.naturalWidth * this.scaleFactor, mo.img.naturalHeight * this.scaleFactor);
  }
}

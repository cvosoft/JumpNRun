class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  scaleFactor = 0.2;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.img.naturalWidth * this.scaleFactor,
      this.character.img.naturalHeight * this.scaleFactor
    );

    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.img.naturalWidth * this.scaleFactor, enemy.img.naturalHeight * this.scaleFactor);
    });

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}

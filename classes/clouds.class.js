class Cloud extends MovableObject {
  x = 0;
  y = 405;
  scaleFactor = 0.375; 

  constructor() {
    super().setImage("./img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.05;
    }, 60/1000);
    console.log(this.x);
  }
}

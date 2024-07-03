class Cloud extends MovableObject {
  x = 0;
  y = 405;
  scaleFactor = 0.375;

  constructor() {
    super().setImage("./img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  animate() {
    setInterval(() => this.moveClouds(), 1000);
  }


  moveClouds(){
    this.x -= 50;
    console.log(this.x);
    if (this.x <= -720) {
      this.x = 0;
    }
  }


}

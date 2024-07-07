const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken()],
  [new Cloud("./img/5_background/layers/4_clouds/1.png", 0), new Cloud("./img/5_background/layers/4_clouds/2.png", 720)],
  [
    new Background("./img/5_background/layers/air.png"),
    new Background("./img/5_background/layers/3_third_layer/1.png"),
    new Background("./img/5_background/layers/2_second_layer/1.png"),
    new Background("./img/5_background/layers/1_first_layer/1.png"),
  ]
);

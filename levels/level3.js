
let level3;

function initLevel3() {

    level3 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            endboss = new Endboss(),
        ],

        [
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 0),
            new Cloud("./img/5_background/layers/4_clouds/2.png", 719 * 1),
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 2),
            new Cloud("./img/5_background/layers/4_clouds/2.png", 719 * 3),
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 4),
            new Cloud("./img/5_background/layers/4_clouds/2.png", 719 * 5),
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 6),
            new Cloud("./img/5_background/layers/4_clouds/2.png", 719 * 7),
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 8),
            new Cloud("./img/5_background/layers/4_clouds/2.png", 719 * 9),
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 10),
            new Cloud("./img/5_background/layers/4_clouds/2.png", 719 * 11),
            new Cloud("./img/5_background/layers/4_clouds/1.png", 719 * 12),
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 6),
        ],
        [
            new Coin(500, 300),
            new Coin(1000, 150),
            new Coin(600, 100),
            new Coin(700, 150),
            new Coin(800, 100),
            new Coin(900, 200),
        ],
        [
            new Bottle(500),
            new Bottle(750),
            new Bottle(900),
            new Bottle(1200),
            new Bottle(1600),
            new Bottle(2000),
        ],
        6 * 719,
        []
    );

}
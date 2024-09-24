class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x;
    bonusItems;


    constructor(enemies, clouds, backgroundObjects, coins, bottles, level_end_x, bonusItems) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.level_end_x = level_end_x;
        this.bonusItems = bonusItems;
    };

}
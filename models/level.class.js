class Level1 {
    enemies;
    coins;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 719 * 8 - 270;

    constructor(enemies, coins, bottles, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}


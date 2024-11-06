class Level {

    smallEnemies;
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    hearts;

    /**
     * initializes arrays for various game objects
     */
    constructor(smallEnemies, enemies, clouds, backgroundObjects, coins, bottles, hearts) {
        this.smallEnemies = smallEnemies;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.hearts = hearts;
    }
}
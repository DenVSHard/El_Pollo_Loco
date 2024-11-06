let level1;

/**
 * initializes level with enemies, objects, and environment
 */
function level() {
    level1 = new Level(
        smallChicken(),
        chicken(),
        cloud(),
        background(),
        coin(),
        bottle(),
        heart()
    )
}

/**
 * creates a list of small chickens with positions
 */
function smallChicken() {
    return [
        new SmallChicken(250),
        new SmallChicken(280),
        new SmallChicken(300),
        new SmallChicken(300),
        new SmallChicken(360),
        new SmallChicken(800),
        new SmallChicken(1000),
        new SmallChicken(1500),
        new SmallChicken(2000)
    ];
}

/**
 * creates a list of chickens with positions
 */
function chicken() {
    return [
        new Chicken(300),
        new Chicken(400),
        new Chicken(450),
        new Chicken(500),
        new Chicken(500),
        new Chicken(600),
        new Chicken(700),
        new Chicken(900),
        new Chicken(3000)
    ];
}

/**
 * creates a list of clouds with positions
 */
function cloud() {
    return [
        new Clouds(0, 0),
        new Clouds(1, 500),
        new Clouds(0, 1000),
        new Clouds(1, 1500),
        new Clouds(0, 2000),
        new Clouds(1, 2500),
        new Clouds(0, 3000),
        new Clouds(1, 3500),
        new Clouds(0, 4000),
        new Clouds(1, 4500),
        new Clouds(0, 5000),
        new Clouds(1, 5500),
        new Clouds(0, 6000),
        new Clouds(1, 6500),
        new Clouds(0, 7000),
        new Clouds(1, 7500),
        new Clouds(0, 8000),
        new Clouds(1, 8500),
        new Clouds(0, 9000),
        new Clouds(1, 9500),
        new Clouds(0, 10000),
        new Clouds(1, 10500),
        new Clouds(0, 11000),
        new Clouds(1, 11500),
        new Clouds(0, 12000),
        new Clouds(1, 12500),
        new Clouds(0, 13000),
        new Clouds(1, 13500),
        new Clouds(0, 14000)
    ];
}

/**
 * creates a list of backgrounds with positions
 */
function background() {
    return [
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8)
    ];
}

/**
 * creates a list of coins with positions
 */
function coin() {
    return [
        new Coin(-450, 240),
        new Coin(-400, 240),
        new Coin(-350, 240),
        new Coin(-300, 240),
        new Coin(350, 230),
        new Coin(400, 230),
        new Coin(450, 230),
        new Coin(500, 230),
        new Coin(550, 230),
        new Coin(1300, 150),
        new Coin(1700, 150),
        new Coin(1800, 150),
        new Coin(1900, 150),
        new Coin(2000, 150),
        new Coin(4000, 100),
        new Coin(4050, 150),
        new Coin(4100, 200)
    ];
}

/**
 * creates a list of bottles with positions
 */
function bottle() {
    return [
        new Bottle(1, -450, 360),
        new Bottle(1, -400, 360),
        new Bottle(1, -350, 360),
        new Bottle(1, -300, 360),
        new Bottle(1, 200, 360),
        new Bottle(2, 300, 360),
        new Bottle(1, 500, 360),
        new Bottle(2, 800, 360),
        new Bottle(0, 1000, 160),
        new Bottle(0, 1050, 160),
        new Bottle(1, 1600, 360),
        new Bottle(2, 2000, 360),
        new Bottle(0, 3500, 160),
        new Bottle(0, 3550, 160),
        new Bottle(1, 4000, 360),
        new Bottle(2, 4200, 360),
        new Bottle(0, 5000, 160),
        new Bottle(0, 5050, 160),
        new Bottle(1, 4500, 360),
        new Bottle(2, 4550, 360),
        new Bottle(1, 4600, 360)
    ];
}

/**
 * creates a heart at a specific position
 */
function heart() {
    return [
        new Heart(3000, 80)
    ];
}
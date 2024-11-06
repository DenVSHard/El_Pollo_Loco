class SmallChicken extends MovableObject {

    y = 380;
    width = 40;
    height = 40;
    offset = {
        top: 10,
        bottom: 30,
        left: 20,
        right: 20
    }

    IMAGE_SMALL_CHICKEN_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * constructs an object with random position and speed
     */
    constructor(x) {
        super().loadImage(this.IMAGE_SMALL_CHICKEN_WALK[0]);
        this.loadImages(this.IMAGE_SMALL_CHICKEN_WALK);
        this.x = x + Math.random() * 4800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.walking();
    }

    /**
     * moves and animates an object regularly
     */
    walking() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        setInterval(() => this.playAnimation(this.IMAGE_SMALL_CHICKEN_WALK), 100);
    }
}
class DeadChicken extends MovableObject {

    width = 64;
    height = 64;

    IMAGE_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE_DEAD_CHICKEN[0]);
        this.x = x;
        this.y = y;
    }
}
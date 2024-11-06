class DeadSmallChicken extends MovableObject {

    width = 40;
    height = 40;

    IMAGE_SMALL_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE_SMALL_CHICKEN_DEAD[0]);
        this.x = x;
        this.y = y;
    }
}
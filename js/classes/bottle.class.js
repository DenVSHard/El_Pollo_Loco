class Bottle extends MovableObject {

    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(i, x, y) {
        super();
        this.loadImage(this.IMAGE_BOTTLE[i]);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
    }
}
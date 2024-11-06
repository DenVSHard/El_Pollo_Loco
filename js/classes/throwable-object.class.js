class ThrowableObjects extends MovableObject {

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * initializes object, loads images, sets position 
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

    /**
     * moves object and plays animation at intervals
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();

        setInterval(() => this.x += 12, 25);

        setInterval(() => this.playAnimation(this.IMAGES_BOTTLE_ROTATION), 50);
    }

}
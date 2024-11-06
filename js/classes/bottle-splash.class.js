class BottleSplash extends MovableObject {

    width = 60;
    height = 60;
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    IMAGE_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE_SPLASH_BOTTLE[0]);
        this.loadImages(this.IMAGE_SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * animates the images
     */
    animate() {
        setInterval(() => this.playAnimation(this.IMAGE_SPLASH_BOTTLE), 200);
    }
}
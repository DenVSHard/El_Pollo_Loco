class Coin extends MovableObject {

    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

    IMAGE_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * initializes and loads images for the object
     */
    constructor(x, y) {
        super().loadImage(this.IMAGE_COINS[0]);
        this.loadImages(this.IMAGE_COINS);
        this.x = x;
        this.y = y;
        this.width = 110;
        this.height = 110;
        this.animate();
    }

    /**
     * repeats animation every 300 milliseconds
     */
    animate() {
        setInterval(() => this.playAnimation(this.IMAGE_COINS), 300);
    }
}
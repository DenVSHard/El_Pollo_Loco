class Chicken extends MovableObject {

    y = 360;
    width = 64;
    height = 64;
    offset = {
        top: 20,
        bottom: 30,
        left: 20,
        right: 20
    }

    IMAGE_WALK_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** 
     * initializes a randomly positioned, walking chicken object 
     */
    constructor(x) {
        super().loadImage(this.IMAGE_WALK_CHICKEN[0]);
        this.loadImages(this.IMAGE_WALK_CHICKEN);
        this.x = x + Math.random() * 4800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.walking();
    }

    /**
     * moves the object and plays animation
     */
    walking() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        setInterval(() => this.playAnimation(this.IMAGE_WALK_CHICKEN), 100);
    }
}
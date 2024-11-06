class Clouds extends MovableObject {
    
    y = 20;
    width = 500;   
    height = 250;

    IMAGE_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor(i, x) {
        super().loadImage(this.IMAGE_CLOUDS[i]); 
        this.x = x;
        this.moveClouds();
    }
    
    /**
     * continuously moves clouds to the left
     */
    moveClouds() {
        setInterval(() => this.moveLeft(), 1000 / 20);
    }
}
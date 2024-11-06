class DrawableObject {

    x = 120;
    y = 175;
    height = 250;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * load image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads images and stores them in cache
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * draws an image on the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    changeDirection = false;
    energy = 100;
    lastHit = 0;
    attack = false;
    endGame = false;

    /**
     * change image by iterating through the image list
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * moves the object right based on speed
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * moves the object left based on speed
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * sets the vertical speed to the given value
     */
    jump(speed) {
        this.speedY = speed;
    }

    /**
     * simulates gravity and updates the object's position
     */
    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * checks if the object is elevated or dead
     */
    aboveGround() {
        if (this instanceof ThrowableObjects || this.isDead())
            return true;
        else
            return this.y < 175;
    }

    /**
     * checks if two objects are colliding
     */
    isColliding(object) {
        return this.rightBorder() > this.leftObjectBorder(object) &&
            this.bottomBorder() > this.topObjectBorder(object) &&
            this.leftBorder() < this.rightObjectBorder(object) &&
            this.topBorder() < this.bottomObjectBorder(object);
    }

    /**
     * Calculates the borders of an object considering offsets
     */
    rightBorder() {
        return this.x + this.width - this.offset.right;
    }


    leftBorder() {
        return this.x + this.offset.left;
    }


    topBorder() {
        return this.y + this.offset.top;
    }


    bottomBorder() {
        return this.y + this.height - this.offset.bottom;
    }


    rightObjectBorder(object) {
        return object.x + object.width - object.offset.right;
    }


    leftObjectBorder(object) {
        return object.x + object.offset.left;
    }


    topObjectBorder(object) {
        return object.y + object.offset.top;
    }


    bottomObjectBorder(object) {
        return object.y + object.height - object.offset.bottom;
    }

    /**
     * reduces energy and records the time of the hit.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * increases energy to a maximum of 100 
     */
    heal(life) {
        this.energy += life;
        if (this.energy > 100)
            this.energy = 100;
    }

    /**
     * checks if the last hit was less than 500 ago
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 500;
    }

    /**
     * checks if the energy is zero
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * checks if the end is reached
     */
    reachedEndboss(object, distance) {
        return this.rightBorder() + distance > this.leftObjectBorder(object);
    }
}
class DrawableWorld {

    /**
     * draws and updates the game world continuously
     */
    drawWorld() {
        this.clearCanvas();
        this.renderGame();
        this.renderStaticElements();
        this.endscreen();
        this.refreshCanvas();
    }

    /**
     * clear canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * draws background objects and clouds
     */
    backgrounds() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * add objects to map and manage resources
     */
    resources() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.thrownBottle);
    }

    /**
    * draws the game world and elements based on camera position
    */
    renderGame() {
        this.ctx.translate(this.cameraX, 0);
        this.backgrounds();
        this.resources();
        this.charactersWorld();
        this.ctx.translate(-this.cameraX, 0);
    }

    /**
     * draws game characters and adds them to the map
     */
    charactersWorld() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.deadEnemies);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }

    /**
     * adds status bars and collected objects to map
     */
    renderStaticElements() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.renderStatusbarBoss();
        this.collectedResources();
    }

    /**
     * adds end boss statusbar upon approach
     */
    renderStatusbarBoss() {
        if (this.character.reachedEndboss(this.endboss, 520))
            this.addToMap(this.statusBarEndboss);
    }

    /**
     * displays collected resources on the canvas
     */
    collectedResources() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '36px zabras';
        this.ctx.fillText(this.statusBarCoin.collectedCoins, 45, 42);
        this.ctx.fillText(this.statusBarBottle.collectedBottles, 136, 42);
    }


    /**
     * updates the canvas with the drawWorld() function
     */
    refreshCanvas() {
        self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    /**
     * add objects to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }

    /**
     * checks direction, draws, and flips back
     */
    addToMap(object) {
        if (object.changeDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx)

        if (object.changeDirection) {
            this.flipImageBack(object);
        }
    }

    /**
     * flip image horizontally and adjust position
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * restore image to original orientation
     */
    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }

    /**
    * checks end states and adds corresponding maps
    */
    endscreen() {
        if (this.character.endGame)
            this.addToMap(this.lost);
        else if (this.endboss.endGame)
            this.addToMap(this.gameOver);
    }
}

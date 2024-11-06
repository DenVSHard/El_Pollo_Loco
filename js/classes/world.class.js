class World extends DrawableWorld {

    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    slowInterval;
    fastInterval;
    character = new Character();
    endboss = new Endboss();
    statusBarHealth = new StatusBarHealth();
    statusBarEndboss = new StatusBarEndboss();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObject = [];
    deadEnemies = [];
    thrownBottle = [];
    level = level1;
    levelEnd;
    
    /** 
     * creates audio objects for various game events and status
     */
    soundCollectCoin = new Audio('audio/coins-collection.wav');
    soundCollectBottle = new Audio('audio/bottle-collection.wav');
    soundCollectHeart = new Audio('audio/heart-collection.wav');
    soundBrokenBottle = new Audio('audio/bottle-splash.wav');
    soundDeadChicken = new Audio('audio/chicken-dead.mp3');
    soundDeadSmallChicken = new Audio('audio/small-chicken-dead.mp3');
    soundEndboss = new Audio('audio/fight-boss.mp3');
    soundWon = new Audio('audio/you-win.mp3');
    soundLost = new Audio('audio/game-over.mp3');
    music = new Audio('audio/game-music.mp3');
    gameOver = new Endscreen('img/9_intro_outro_screens/win/win_2.png', this.character.x - 120);
    lost = new Endscreen('img/9_intro_outro_screens/game_over/game over.png', this.character.x - 120);

    /**
     * initializes the world with canvas and keyboard
     */
    constructor(canvas, keyboard) {
        super();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        super.drawWorld();
        this.setWorld();
        this.intervals();
        this.playMusic();
    }

    /**
     * sets the world
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * starts two intervals for slow and fast actions
     */
    intervals() {
        this.slowInterval = setInterval(() => this.slowIntervals(), 300);
        this.fastInterval = setInterval(() => this.fastIntervals(), 1000 / 60);
    }

    /**
     * checks collisions and level end
     */
    slowIntervals() {
        this.checkThrowBottle();
        this.checkCollisionEnemy();
        this.checkCollisionEndboss();
        this.endLevel();
    }

    /**
     * checks collisions, jumps, and final battle
     */
    fastIntervals() {
        this.checkCollisionItems();
        this.checkJumpOnEnemy();
        this.checkJumpOnSmallEnemy();
        this.fightEndboss();
        this.gameOverSound();
    }

    /**
     * sets the level end to the endboss's position
     */
    endLevel() {
        this.levelEnd = this.endboss.x;
    }

    /**
     * plays a sound if enabled
     */
    playSound(sound, volume) {
        if (sfxOn()) {
            sound.play();
            sound.volume = volume;
        } else {
            this.pauseSound(sound);
        }
    }

    /**
     * pauses the sound and sets volume to zero
     */
    pauseSound(sound) {
        sound.pause();
        sound.volume = 0;
    }

    /**
     * plays music if enabled, with low volume
     */
    playMusic() {
        if (musicOn()) {
            this.music.play();
            this.music.volume = 0.2;
        } else {
            this.pauseMusic();
        }
    }

    /**
     * pauses the music and sets volume to zero
     */
    pauseMusic() {
        this.music.pause();
        this.music.volume = 0;
    }

    /**
     * checks collisions with enemies in different groups
     */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => this.collision(enemy, 5));
        this.level.smallEnemies.forEach((enemy) => this.collision(enemy, 2));
    }

    /**
     * handles collisions and applies damage on hit
     */
    collision(enemy, damage) {
        if (this.character.isColliding(enemy) && !this.endboss.endGame) {
            this.character.hit(damage);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * checks collisions with endboss and handles attack
     */
    checkCollisionEndboss() {
        if (this.collisionEndboss()) {
            this.endboss.attack = true;
            this.character.hit(10);
            this.statusBarHealth.setPercentage(this.character.energy);
        } else {
            this.endboss.attack = false;
        }
    }

    /**
     * checks if collision with endboss is possible
     */
    collisionEndboss() {
        return this.character.reachedEndboss(this.endboss, 50) &&
            !this.endboss.isDead();
    }

    /**
     * checks if jumping on enemies is possible and defeats them
     */
    checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.jumpOnEnemy(enemy))
                this.deadEnemy(enemy);
        });
    }

    /**
     * checks if jumping on small enemies is possible and defeats them
     */
    checkJumpOnSmallEnemy() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.jumpOnEnemy(enemy))
                this.deadSmallEnemy(enemy);
        });
    }

    /**
     * checks if the character can jump on the enemy
     */
    jumpOnEnemy(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.aboveGround() &&
            this.character.speedY < 0;
    }

    /**
     * defeats the enemy, adds a dead entity, and removes the enemy
     */
    deadEnemy(enemy) {
        let deadChicken = new DeadChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadChicken);
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadChicken, 1);
        setTimeout(() => this.deadEnemies.splice(deadChicken), 1000);
    }

    /**
     * defeats the small enemy, adds a dead entity, and removes the small enemy
     */
    deadSmallEnemy(enemy) {
        let deadSmallChicken = new DeadSmallChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadSmallChicken);
        this.level.smallEnemies.splice(this.level.smallEnemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadSmallChicken, 1);
        setTimeout(() => this.deadEnemies.splice(deadSmallChicken), 1000);
    }

    /**
     * fights the endboss, controls music and sound effects
     */
    fightEndboss() {
        if (this.endboss.isDead()) {
            this.pauseSound(this.soundEndboss);
        } else if (this.checkFightingEndboss()) {
            this.playSound(this.soundEndboss, 0.6);
            this.music.pause();
            this.checkStartWalkingEndboss();
        } else {
            this.pauseSound(this.soundEndboss);
            this.playMusic();
        }
    }

    /**
     * checks if the character is close enough to the endboss and alive
     */
    checkFightingEndboss() {
        return this.character.reachedEndboss(this.endboss, 1000) &&
            !this.character.isDead();
    }

    /**
     * activates endboss if character reaches him
     */
    checkStartWalkingEndboss() {
        if (this.character.reachedEndboss(this.endboss, 480))
            this.endboss.startWalking = true;
    }

    /**
     * checks collisions with various items
     */
    checkCollisionItems() {
        this.checkCollisionCoin();
        this.checkCollectBottle();
        this.checkCollisionHeart();
        this.bottleCollisions();
    }

    /**
     * checks for coin collisions and collects them
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.statusBarCoin.collectedCoins++;
                this.playSound(this.soundCollectCoin, 1);
            }
        });
    }

    /**
     * checks for bottle collisions and collects them
     */
    checkCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let i = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(i, 1);
                this.statusBarBottle.collectedBottles++;
                this.statusBarBottle.bottleDepot.push(bottle);
                this.playSound(this.soundCollectBottle, 0.2);
            }
        });
    }

    /**
     * checks for heart collisions and collects them
     */
    checkCollisionHeart() {
        this.level.hearts.forEach((heart) => {
            if (this.character.isColliding(heart)) {
                let i = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(i, 1);
                this.character.heal(40);
                this.statusBarHealth.setPercentage(this.character.energy);
                this.playSound(this.soundCollectHeart, 0.5);
            }
        });
    }

    /**
     * all bottle collisions
     */
    bottleCollisions() {
        this.bottleCollisionSmallChicken();
        this.bottleCollisionChicken();
        this.bottleCollisionEndboss();
    }

    /**
     * checks collisions of bottles with enemies
     */
    bottleCollisionChicken() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.splashBottle(bottle);
                    this.deadEnemy(enemy);
                }
            })
        });
    }

    /**
     * checks collisions of bottles with small enemies
     */
    bottleCollisionSmallChicken() {
        this.throwableObject.forEach((bottle) => {
            this.level.smallEnemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.splashBottle(bottle);
                    this.deadSmallEnemy(enemy);
                }
            })
        });
    }

    /**
     * checks collisions of bottles with endboss
     */
    bottleCollisionEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (this.endboss.isColliding(bottle) && !this.endboss.isDead()) {
                this.splashBottle(bottle);
                this.endboss.hit(10);
                this.statusBarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }

    /**
     * checks conditions of the splashed bottle
     * @param {object} bottle 
     */
    splashBottle(bottle) {
        let splashedBottle = new BottleSplash(bottle.x, bottle.y);
        this.thrownBottle.push(splashedBottle);
        this.playSound(this.soundBrokenBottle, 1);
        this.throwableObject = [];
        setTimeout(() => this.thrownBottle.splice(splashedBottle), 500);
    }

    /**
     * checks if a bottle can be thrown and throws it
     */
    checkThrowBottle() {
        if (this.keyboard.X) {
            if (this.throwBottle()) {
                let bottle = new ThrowableObjects(this.character.x + 30, this.character.y + 120);
                this.throwableObject.push(bottle);
                this.statusBarBottle.collectedBottles--;
                this.statusBarBottle.bottleDepot.splice(0, 1);
            }
        }
    }

    /**
     * checks if a bottle can be thrown
     */
    throwBottle() {
        return !this.character.changeDirection &&
            this.statusBarBottle.collectedBottles > 0 &&
            !this.endboss.endGame;
    }

    /**
     * plays end sound based on game result
     */
    gameOverSound() {
        if (this.character.endGame) {
            let sound = this.soundLost
            this.playEndSound(sound);
        } else if (this.endboss.endGame) {
            let sound = this.soundWon;
            this.playEndSound(sound);
        }
    }

    /**
     * plays end sound, pauses music, resets game
     */
    playEndSound(sound) {
        this.playSound(sound, 1);
        this.pauseMusic();
        setTimeout(() => {
            this.pauseSound(sound);
        }, 5000);
        this.resetGame();
    }

    /**
     * reset game, clear intervals
     */
    resetGame() {
        clearInterval(this.slowInterval);
        clearInterval(this.fastInterval);
        
        setTimeout(() => {
            startGame();
        }, 5000);
    }
}
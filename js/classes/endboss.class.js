class Endboss extends MovableObject {

    width = 300;
    height = 350;
    speed = 1;
    x = 5500;
    y = 95;
    startWalking = false;
    animationInterval;
    offset = {
        top: 100,
        bottom: 15,
        left: 50,
        right: 50
    };

    soundHurt = new Audio('audio/chicken-endboss.mp3');
    soundDead = new Audio('audio/chicken-endboss.mp3');
    soundAttack = new Audio('audio/chicken-endboss.mp3');

    IMAGE_BOSS_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGE_BOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGE_BOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGE_BOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGE_BOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * loads images, starts animations and movement
     */
    constructor() {
        super().loadImage(this.IMAGE_BOSS_ALERT[0]);
        this.loadImages(this.IMAGE_BOSS_ALERT);
        this.loadImages(this.IMAGE_BOSS_WALK);
        this.loadImages(this.IMAGE_BOSS_ATTACK);
        this.loadImages(this.IMAGE_BOSS_HURT);
        this.loadImages(this.IMAGE_BOSS_DEAD);
        this.setAnimation();
        this.activateAutoMove();
    }

    /**
     * moves left if movement is allowed
     */
    activateAutoMove() {
        setInterval(() => {
            if (this.isMovable()) {
                this.moveLeft();
            }
        }, 100);
    }

    /**
     * checks if movement is possible
     */
    isMovable() {
        return this.startWalking &&
            !this.isDead() &&
            !this.attack &&
            !this.isHurt() &&
            !this.world.character.endGame;
    }

    /**
     * starts animation every 100 milliseconds
     */
    setAnimation() {
        this.animationInterval = setInterval(() => this.animation(), 100);
    }

    /**
     * executes different actions for the endboss
     */
    animation() {
        if (this.isDead())
            this.bossDead();
        else if (this.isHurt())
            this.bossHurt();
        else if (this.attack && !this.world.character.isDead())
            this.bossAttack();
        else if (this.startWalking && !this.world.character.endGame)
            this.bossWalk();
        else
            this.bossAlert();
    }

    /**
     * displays a boss walk animation
     */
    bossWalk() {
        this.playAnimation(this.IMAGE_BOSS_WALK);
    }

    /**
     * displays a boss alert animation
     */
    bossAlert() {
        this.playAnimation(this.IMAGE_BOSS_ALERT);
    }

    /**
     * boss gets hurt, plays animation and sound
     */
    bossHurt() {
        this.playAnimation(this.IMAGE_BOSS_HURT);
        this.world.playSound(this.soundHurt, 1);
        this.speed++;
    }

    /**
     * displays a boss attack animation
     */
    bossAttack() {
        this.playAnimation(this.IMAGE_BOSS_ATTACK);
        this.world.playSound(this.soundAttack, 1);
    }

    /**
     * plays death sound, animation, stops interval, activates gravity
     */
    bossDead() {
        this.world.playSound(this.soundDead, 1);
        this.playAnimation(this.IMAGE_BOSS_DEAD);
        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.speedY = 5;
            this.applyGravity();
            this.endGame = true;
        }, 1500);
    }
}
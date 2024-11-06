class Character extends MovableObject {

  world;
  speed = 10;
  offset = {
    top: 100,
    bottom: 15,
    left: 20,
    right: 20,
  };

  animationInterval;
  jumpAnimationPlayed = false;
  currentJumpFrame = 0;
  inactivityTimer = 0;
  maxInactivityTime = 10000;

  sound_walk = new Audio('audio/character_walk.mp3');
  sound_jump = new Audio('audio/character-jump.mp3');
  sound_hurt = new Audio('audio/character-hurt.mp3');
  sound_dead = new Audio('audio/character-dead.mp3');

  IMAGE_CHARACTER_WALK = [
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png"
  ];

  IMAGE_CHARACTER_JUMP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png"
  ];

  IMAGE_CHARACTER_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  IMAGE_CHARACTER_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ];

  IMAGE_CHARACTER_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png"
  ];

  IMAGE_CHARACTER_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png"
  ];

  /**
   * loads character images, applies gravity, and triggers animations
   */
  constructor() {
    super().loadImage(this.IMAGE_CHARACTER_WALK[0]);
    this.loadImages(this.IMAGE_CHARACTER_WALK);
    this.loadImages(this.IMAGE_CHARACTER_JUMP);
    this.loadImages(this.IMAGE_CHARACTER_HURT);
    this.loadImages(this.IMAGE_CHARACTER_DEAD);
    this.loadImages(this.IMAGE_CHARACTER_IDLE);
    this.loadImages(this.IMAGE_CHARACTER_LONG_IDLE);
    this.applyGravity();
    this.animateMovement();
    this.animate();
  }

  /**
   * functions of walking and jumping
   */
  animateMovement() {
    this.walking();
    this.jumping();
  }

  /**
   * function of moving right and left
   */
  walking() {
    setInterval(() => {
      this.walkingRight();
      this.walkingLeft();
      this.world.cameraX = -this.x + 100;
    }, 1000 / 30);
  }

  /**
   * checks right movement and plays walking sound
   */
  walkingRight() {
    this.sound_walk.pause();
    if (this.movingRight()) {
      this.moveRight();
      this.changeDirection = false;
      this.world.playSound(this.sound_walk, 1);
      this.resetInactivityTimer();
    }
  }

  /**
   * checks if a character can move right
   */
  movingRight() {
    return (
      this.world.keyboard.RIGHT && this.x < 5600 && !this.world.endboss.endGame
    );
  }

  /**
   * checks left movement and plays walking sound
   */
  walkingLeft() {
    if (this.movingLeft()) {
      this.moveLeft();
      this.changeDirection = true;
      this.world.playSound(this.sound_walk, 1);
      this.resetInactivityTimer();
    }
  }

  /**
   * checks if a character can move left
   */
  movingLeft() {
    return (
      this.world.keyboard.LEFT && this.x > -600 && !this.world.endboss.endGame
    );
  }

  /**
   * checks jump ability and performs jump repeatedly
   */
  jumping() {
    setInterval(() => {
      if (this.isJump()) {
        this.jump(17);
        this.resetInactivityTimer();
      }
    }, 1000 / 60);
  }

  /**
   * checks if a jump action is possible.
   */
  isJump() {
    return (
      this.world.keyboard.UP &&
      !this.aboveGround() &&
      !this.world.endboss.endGame
    );
  }

  /**
   * character jumps, plays animation, and sound effect
   */
  characterJump() {
    if (this.currentJumpFrame >= this.IMAGE_CHARACTER_JUMP.length) {
      this.currentJumpFrame = 0;
    }
    this.playAnimation([this.IMAGE_CHARACTER_JUMP[this.currentJumpFrame]]);
    this.world.playSound(this.sound_jump, 0.2);
    this.currentJumpFrame++;
  }

  /**
   * starts a recurring animation
   */
  animate() {
    this.animationInterval = setInterval(() => this.animation(), 100);
  }

  /**
   * controls animations based on character state
   */
  animation() {
    this.inactivityTimer += 100;
    if (this.isDead()) {
      this.characterDead();
    } else if (this.isHurt() && !this.world.endboss.endGame) {
      this.characterHurt();
    } else if (this.aboveGround() && !this.world.endboss.endGame) {
      this.characterJump();
    } else if (this.walkKeypress() && !this.world.endboss.endGame) {
      this.playAnimation(this.IMAGE_CHARACTER_WALK);
      this.resetInactivityTimer();
    } else if (this.inactivityTimer >= this.maxInactivityTime) {
      this.playAnimation(this.IMAGE_CHARACTER_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGE_CHARACTER_IDLE);
    }
  }

  /**
   * checks if the right or left key is pressed
   */
  walkKeypress() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * executes death animation and ends the game
   */
  characterDead() {
    this.playAnimation(this.IMAGE_CHARACTER_DEAD);
    this.world.playSound(this.sound_dead, 1);
    setTimeout(() => {
      clearInterval(this.animationInterval);
      this.endGame = true;
    }, 1000);
  }

  /**
   * plays animation and sound when hurt
   */
  characterHurt() {
    this.playAnimation(this.IMAGE_CHARACTER_HURT);
    this.world.playSound(this.sound_hurt, 0.7);
  }

  /**
   * Resets the inactivity timer when the character performs any action.
   */
  resetInactivityTimer() {
    this.inactivityTimer = 0;
  }
}
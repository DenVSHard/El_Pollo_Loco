class Keyboard {

  LEFT = false;
  RIGHT = false;
  UP = false;
  X = false;

  constructor() {
    this.keybordEvents();
    this.touchEvents();
  }

  /**
   * handles key presses and releases
   */
  keybordEvents() {
    this.pressEvent();
    this.releaseEvent();
  }

  /**
   * key presses set keyboard object status
   */
  pressEvent() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = true;
      }

      if (event.keyCode == 37) {
        keyboard.LEFT = true;
      }

      if (event.keyCode == 38) {
        keyboard.UP = true;
      }

      if (event.keyCode == 40) {
        keyboard.DOWN = true;
      }

      if (event.keyCode == 88) {
        keyboard.X = true;
      }
    });
  }

  /**
   * key releases reset keyboard object status
   */
  releaseEvent() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = false;
      }

      if (event.keyCode == 37) {
        keyboard.LEFT = false;
      }

      if (event.keyCode == 38) {
        keyboard.UP = false;
      }

      if (event.keyCode == 40) {
        keyboard.DOWN = false;
      }

      if (event.keyCode == 88) {
        keyboard.X = false;
      }
    });
  }

  /**
   * handles various touch events for movements and actions
   */
  touchEvents() {
    this.leftTouch();
    this.rightTouch();
    this.jumpTouch();
    this.bottleTouch();
  }

  /**
   * Ttacks touches on the right button
   */
  rightTouch() {
    document.getElementById("btnRight").addEventListener("touchstart", () => {
      this.RIGHT = true;
      document.getElementById("btnRight").classList.add("buttonOnTouch");
    });

    document.getElementById("btnRight").addEventListener("touchend", () => {
      this.RIGHT = false;
      document.getElementById("btnRight").classList.add("buttonOnTouch");
    });
  }

  /**
   * tracks touches on the left button
   */
  leftTouch() {
    document.getElementById("btnLeft").addEventListener("touchstart", () => {
      this.LEFT = true;
      document.getElementById("btnLeft").classList.add("buttonOnTouch");
    });

    document.getElementById("btnLeft").addEventListener("touchend", () => {
      this.LEFT = false;
      document.getElementById("btnLeft").classList.add("buttonOnTouch");
    });
  }

  /**
   * tracks touches on the jump button
   */
  jumpTouch() {
    document.getElementById("btnJump").addEventListener("touchstart", () => {
      this.UP = true;
      document.getElementById("btnJump").classList.add("buttonOnTouch");
    });

    document.getElementById("btnJump").addEventListener("touchend", () => {
      this.UP = false;
      document.getElementById("btnJump").classList.add("buttonOnTouch");
    });
  }

  /**
   * tracks touches on the bottle button
   */
  bottleTouch() {
    document.getElementById("btnThrow").addEventListener("touchstart", () => {
      this.X = true;
      document.getElementById("btnThrow").classList.add("buttonOnTouch");
    });

    document.getElementById("btnThrow").addEventListener("touchend", () => {
      this.X = false;
      document.getElementById("btnThrow").classList.add("buttonOnTouch");
    });
  }
}
class StatusBarBottle extends DrawableObject {

    bottleDepot = [];
    collectedBottles = 0;

    IMAGE_BOTTLE = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGE_BOTTLE[0]);
        this.x = 85;
        this.y = 3;
        this.width = 73;
        this.height = 48;
    }
}
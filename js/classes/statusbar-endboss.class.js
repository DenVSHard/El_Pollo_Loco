class StatusBarEndboss extends DrawableObject {

    IMAGES_BOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 100;
    x = 520;
    y = 45;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * sets percentage and updates the image
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOSS_HEALTH[this.setStatusbar()];
        this.img = this.imageCache[path];
    }

    /**
     * returns status based on percentage
     */
    setStatusbar() {
        if (this.percentage == 100)
            return 5;
        else if (this.percentage > 80)
            return 4;
        else if (this.percentage > 60)
            return 3;
        else if (this.percentage > 40)
            return 2;
        else if (this.percentage > 20)
            return 1;
        else
            return 0;

    }
}
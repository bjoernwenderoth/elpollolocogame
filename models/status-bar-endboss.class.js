class StatusBarEndboss extends DrawableObject {

    percentage = 100;

    IMAGES_LIFEBAR = [
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ]

 // CHEAT 100 LEBEN
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR);
        this.x = 460;
        this.y = 6;
        this.width = 220;
        this.height = 65;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path =  this.IMAGES_LIFEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }
}
class StatusBarBottle extends DrawableObject {

    percentage = 0;

    IMAGES_BOTTLEBAR = [
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',

        //  NEUE BILDER FÜR KLEINE SCHRITTE!
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 30;
        this.y = 100;
        this.width = 220;
        this.height = 65;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage * 10; // => 0 ... 5
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 40) {
            return 1;
        } else if (this.percentage < 60) {
            return 2;
        } else if (this.percentage < 80) {
            return 3;
        } else if (this.percentage < 100) {
            return 4;
        } else {
            return 5;
        }
    }
}
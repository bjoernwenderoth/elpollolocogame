class StatusBarCoin extends DrawableObject {

    percentage = 0;

    IMAGES_COINBAR = [
        'img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 30;
        this.y = 50;
        this.width = 220;
        this.height = 65;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage * 20; // => 0 ... 5
        let path =  this.IMAGES_COINBAR[this.resolveImageIndex()];
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
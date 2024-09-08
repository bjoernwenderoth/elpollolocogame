class Bottle extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 15,
        right: 30,
        bottom: 10,
        left: 30
    };
    offsetY = 0;

    IMAGES_BOTTLE = [
        'img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]


    constructor(x, y) {
        super().loadImage('./img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.animation();
    };


    animation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 300);
    };
};

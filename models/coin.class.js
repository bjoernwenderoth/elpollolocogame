class Coin extends MovableObject {

    width = 130;
    height = 130;
    offset = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    }
    offsetY = 0;
    IMAGES_COIN = [
        'img/img/8_coin/coin_1.png',
        'img/img/8_coin/coin_2.png'
    ]

   coin_sound = new Audio('audio/coin.mp3');


    constructor(id, x, y) {
        super().loadImage('./img/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.id = id;
        this.animation();
    }

    animation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }
}

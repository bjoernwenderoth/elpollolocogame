class Chick extends MovableObject {
    width = 50;
    height = 50;
    offset = {
        top: -10,
        right: -10,
        bottom: -10,
        left: -10
    };
    offsetY = 0;
    y = 365;

    IMAGES_WALKING = [
        'img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    dead_sound = new Audio('audio/chick_dead.mp3');
    soundPlayed = false;


    constructor(x) {
        super().loadImage('./img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x
        // this.x = 1050 + Math.random() * 3000;
        this.speed = 0.13 + Math.random() * 0.5;
        this.animation();
    }


    animation() {
        this.chickMoveLeft();
        this.enemyIsDeath();
    }

    
    chickMoveLeft() {

        let animationIntervall = setInterval(() => {
            if (world.gameEnd == true) {
                clearInterval(animationIntervall);
            };
            
            if (this.active) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}

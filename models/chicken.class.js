class Chicken extends MovableObject {

    y = 338;
    height = 80;
    width = 80;
    IMAGES_WALKING = [
        './img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    offsetY = 0;
    dead_sound = new Audio('./audio/chicken_dead.mp3');
    soundPlayed = false;

    constructor(x) {
        super().loadImage('./img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        // this.x = 250 + Math.random() * 2500;
        this.speed = 0.13 + Math.random() * 0.5;
        this.animation();
    }

    
    animation() {
        this.chickenMoveLeft();
        this.enemyIsDeath();
    }

    
    chickenMoveLeft() {
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
class Cloud extends MovableObject {
    y = 10;
    width = 600;
    height = 350;
    speed = 0.23;


    constructor() {
        super().loadImage('./img/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4000;
        this.animation();
    }

    
    animation() {
        let animationIntervall = setInterval(() => {
            this.moveLeft();
        }, 50);
        if (this.gameEnd == true) {
            clearInterval(animationIntervall);
        }
    }
}
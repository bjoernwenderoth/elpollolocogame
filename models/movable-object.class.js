class MovableObject extends DrawableObject {
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        right: 0
    }
    offsetY = 0;
    speed = 0.10;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coin = 0;
    lastHit = 0;
    active = true;
    throwableObjects = [];
    isHurtCoolingDown = false;

    coin_sound = new Audio('./audio/coin.mp3');
    pickup_bottle_sound = new Audio('./audio/pickup_bottle.mp3');


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 195;
        }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 0, 1, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 25;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms;
        timepassed = timepassed / 800; // Differenze in s;
        return timepassed < 0.8;
    }


    isDeath() {
        return this.energy == 0;
    }


    pickCoin() {
        this.coin += 1;
        this.coin_sound.play();
    }


    pickBottle() {
        this.pickup_bottle_sound.play();
    }


    playFunctionWithCooldown(callback, cooldownTime) {
        if (!this.isCoolingDown) {
            callback();
            this.isCoolingDown = true;
            setTimeout(() => {
                this.isCoolingDown = false;  
            }, cooldownTime);
        }
    }


    handleHurt() {
        if (!this.isHurtCoolingDown) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
            this.isHurtCoolingDown = true;
            setTimeout(() => {
                this.isHurtCoolingDown = false; 
            }, 1000);
        }
    }


    enemyIsDeath() {
        let animationIntervall = setInterval(() => {
            if (world.gameEnd == true) {
                clearInterval(animationIntervall);
            };
            
            if (!this.active) {
                this.loadImage(this.IMAGE_DEAD);
                if (!this.deathTimer) {
                    this.deathTimer = setTimeout(() => {
                        this.active = false;
                        this.deathTimer = null;
                    }, 5000);
                }
                if (!this.soundPlayed) {
                    this.dead_sound.play();
                    this.soundPlayed = true;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }

}
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusBarLife();
    statusBarEndboss = new StatusBarEndboss();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    bottleScore = 0;
    bottle;
    lastHitTime = 0;
    gameEnd = false;
    gameLost = false;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        checkEndScreen();
        this.lastThrowTime = 0;
    };


    setWorld() {
        this.character.world = this;
    };


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.bottleHitEndboss()
            this.bottleHitEnemy();
        }, 20);
        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    };


    checkThrowObjects() {
        let currentTime = Date.now(); // Hol dir die aktuelle Zeit in Millisekunden
        let timeSinceLastThrow = currentTime - this.lastThrowTime;
        if (this.keyboard.SPACE && this.bottleScore > 0 && timeSinceLastThrow >= 800) {
            this.throwBottle();
            this.lastThrowTime = currentTime; // Setze die letzte Wurfzeit auf die aktuelle Zeit
        }
    }


    throwBottle() {
        this.bottle = new ThrowableObject(this.character.x + 50, this.character.y + 70);
        this.throwableObjects.push(this.bottle);
        this.bottleScore -= 1;
        this.statusBarBottle.setPercentage(this.bottleScore);
    };


    checkCollisions() {
        this.checkCollisionWithEnemy();
        this.checkCollisionWithCoin();
        this.checkCollisionWithBottle();
    };


    checkCollisionWithEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            this.enemyIsDeath(enemy, index);
            this.characterGetsDamage(enemy);
        });
    };


    enemyIsDeath(enemy, index) {
        if (index !== 0 && enemy.active) {  // Stelle 0 wird ausgelassen
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.isDeath();
                enemy.active = false;
                this.character.jump();
                this.removeDeadEnemy(enemy);
            }
        }
    };


    removeDeadEnemy(enemy) {
        console.log(enemy);
        setTimeout(() => {
            let newIndex = this.level.enemies.indexOf(enemy);
            if (newIndex !== -1) {
                this.level.enemies.splice(newIndex, 1);
            }
        }, 1000);
    };


    characterGetsDamage(enemy) {
        if (this.character.isColliding(enemy) && enemy.active) {
            if (this.canTakeDamage()) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
                if (this.character.energy == 0) {
                    this.character.isDeath();
                }
            }
        }
    };


    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.character.pickCoin(coin);
                this.statusBarCoin.setPercentage(this.character.coin);
                this.level.coins.splice(i, 1);
            }
        });
    };


    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottleScore < 10) {
                let i = this.level.bottles.indexOf(bottle);
                this.bottleScore++;
                this.character.pickBottle();
                this.statusBarBottle.setPercentage(this.bottleScore);
                this.level.bottles.splice(i, 1);
            }
        });
    };


    bottleHitEnemy() {
        this.throwableObjects.forEach((throwableBottle) => {
            this.level.enemies.forEach((enemy) => {
                let i = this.level.enemies.indexOf(enemy);
                if (enemy.isColliding(throwableBottle) && throwableBottle.active && enemy.active) {
                    enemy.isDeath();
                    enemy.active = false;
                    this.removeDeadEnemy(enemy);
                    this.removeBottle(throwableBottle);
                }
            });
        });
    }
0

    bottleHitEndboss() {
        this.throwableObjects.forEach((throwableBottle) => {
            let endboss = this.level.enemies[0];
            if (endboss.isColliding(throwableBottle) && throwableBottle.active) {
                endboss.hit();
                endboss.isHurt();
                this.statusBarEndboss.setPercentage(endboss.energy);
                this.endbossLevelUp(endboss);
                this.endbossIsDeath(endboss);
                this.removeBottle(throwableBottle);       
            }
        });
    }


    endbossLevelUp(endboss) {
        endboss.width -= 50;
        endboss.height -= 50;
        endboss.x += 50;
        endboss.y += 50;
    }


    removeBottle(throwableBottle) {
        throwableBottle.splash();
        throwableBottle.active = false;
        setTimeout(() => {
            this.throwableObjects.splice(throwableBottle, 1)
        }, 500)
    }


    endbossIsDeath(endboss) {
        if (endboss.energy == 0) {
            endboss.active = false;
            endboss.isDeath();
        }
    }


    canTakeDamage() {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;
        if (timeSinceLastHit >= 1500) {
            this.lastHitTime = currentTime;
            return true;
        } else {
            return false;
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    gameEnd() {
        
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawBorder(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

}

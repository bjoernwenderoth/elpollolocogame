class Endboss extends MovableObject {

    width = 400;
    height = 400;
    offset = {
        top: 50,
        right: 20,
        bottom: 20,
        left: 20
    }
    offsetY = 0;
    y = 40;
    speed = 1;
    attack = false;
    hadFirstContact = false;
    direction = 'left';

    IMAGES_SPAWNING = [
        'img/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_WALKING = [
        'img/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_HURT = [
        'img/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    endboss_join_sound = new Audio('audio/endboss_join.mp3');
    hurt_sound = new Audio('audio/endboss_hit.mp3');


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 4000
        this.speed = 1 * 5;
        this.animation();
    }


    animation() {
        let i = 0;
        let spawningFinished = false;
        let animationIntervall = setInterval(() => {
            if (world.gameEnd == true) {
                clearInterval(animationIntervall);
            };
            if (!spawningFinished && this.hadFirstContact) {
                if (i < this.IMAGES_SPAWNING.length * 3) { // Beispiel: Animation dreimal durchlaufen lassen
                    this.playAnimation(this.IMAGES_SPAWNING);
                    if (i === 0) {
                        this.endboss_join_sound.play();
                    }
                    i++;
                } else {
                    spawningFinished = true;
                }
            } else if(this.hadFirstContact) {
                this.endbossMove();
            }
            if (this.isDeath()) {
                if (!this.active) {
                    this.playAnimation(this.IMAGES_DEAD);
                    this.active = false;
                    this.speed = 0;
                    world.gameEnd = true;
                }
            } else if (this.isHurt()) {
                this.handleHurt();
                this.moveLeft();
                this.direction = 'left';
                this.otherDirection = false;
                this.speed += 1;
                this.playAnimation(this.IMAGES_HURT);
            }

            if (world.character.x > 3500 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 100);

    }

    endbossMove() {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.direction === 'left') {
            if (this.x > 2500) {
                this.moveLeft();
            } else {
                this.direction = 'right';
                this.otherDirection = true;
            }
        } else if (this.direction === 'right') {
            if (this.x < 4500) {
                this.moveOtherDirection();
            } else {
                this.direction = 'left';
                this.otherDirection = false;
            }
        }
    }c 

        moveOtherDirection() {
            this.x += this.speed;
            this.otherDirection = true;
        }



    }
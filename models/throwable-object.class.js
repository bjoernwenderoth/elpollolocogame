class ThrowableObject extends MovableObject {
    width = 70;
    height = 100;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    otherDirection = false;
    active = true;

    IMAGES_ROTATE = [
        'img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    bottle_damage_sound = new Audio('audio/bottle_destroy.mp3');
    throw_sound = new Audio('audio/throw.mp3');


    constructor(x, y) {
        super();
        this.loadImage('img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }


    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.otherDirection = world.character.otherDirection;
        this.movingAnimations = setInterval(() => {
            if (this.active) {
                this.throwDirection();
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }
        }, 25);
        this.throw_sound.play();
    }


    throwDirection() {
        if (this.otherDirection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }
        this.playAnimation(this.IMAGES_ROTATE);
    }


    throwRight() {
        this.x += 10;
    }


    throwLeft() {
        this.x -= 10;
    }


    splash() {
        this.active = false;
        this.bottle_damage_sound.volume = 1;
        this.bottle_damage_sound.play();
    }
}

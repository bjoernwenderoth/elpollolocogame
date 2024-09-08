class ThrowableObject extends MovableObject {
    width = 70;
    height = 100;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
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
    ];
    bottle_damage_sound = new Audio('audio/bottle_destroy.mp3');
    throw_sound = new Audio('audio/throw.mp3');

    /**
     * Constructor for the `ThrowableObject` class.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw(); // Initiates the throw action
    }

    /**
     * Initiates the throw action, including applying gravity, setting the direction,
     * and starting the rotation animation.
     */
    throw() {
        this.speedY = 20; // Initial vertical speed
        this.applyGravity(); // Apply gravity to the object
        this.otherDirection = world.character.otherDirection; // Determine the direction based on the character's direction
        this.movingAnimations = setInterval(() => {
            if (this.active) {
                this.throwDirection(); // Update direction if the object is still in the air
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH); // Play splash animation when it hits something
            }
        }, 25);
        this.throw_sound.play(); // Play throwing sound
    }

    /**
     * Determines the direction of the throw (left or right) and applies the corresponding movement.
     * Also, plays the rotation animation.
     */
    throwDirection() {
        if (this.otherDirection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }
        this.playAnimation(this.IMAGES_ROTATE); // Play the rotation animation during the throw
    }

    /**
     * Moves the object to the right by 10 units.
     */
    throwRight() {
        this.x += 10;
    }

    /**
     * Moves the object to the left by 10 units.
     */
    throwLeft() {
        this.x -= 10;
    }

    /**
     * Handles the splash effect when the object hits something.
     * Deactivates the object and plays the splash sound effect.
     */
    splash() {
        this.active = false; // Deactivate the object (stops movement and triggers splash animation)
        this.bottle_damage_sound.volume = 1;
        this.bottle_damage_sound.play(); // Play the bottle splash sound effect
    }
}

// import { currentState } from "../state";

export default class User {
    constructor(name, position, texture) {
        this.name = name;
        this.position = position; // { x: number, y: number }
        this.texture = texture;
        this.sprite = null; // Phaser sprite will be assigned later
    }

    createSprite(scene) {
        this.sprite = scene.physics.add.sprite(this.position.x, this.position.y, this.texture);
    }

    moveTo(x, y, speed) {
        scene.physics.moveTo(this.sprite, x, y, speed);
    }

    playAnimation(animationKey) {
        if (this.sprite) {
            this.sprite.play(animationKey);
        }
    }

    setTexture(texture) {
        if (this.sprite) {
            this.sprite.setTexture(texture);
        }
    }

    update() {
        
    }
}
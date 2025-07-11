import Phaser from "phaser";
import { currentState } from "./state";

// let leftX = sprite.x / 2;
// let centerX = scene.width / 2;
// let rightX = scene.width - left.x;
// let spriteY = scene.height / 2;
let user;

export function startPhaser() {
  const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 300,
    parent: "phaser-div",
    scene: {
      preload,
      create,
      update
    }
  };
  return new Phaser.Game(config);
}

function preload() {
  // this.load.image('mozie', 'characters/mozie/A/1.gif')
  this.load.spritesheet('mozie-talking', 'characters/mozie/A/2.png', {
    frameWidth: 300,
    frameHeight: 300
  });
  this.load.image('forrest', 'characters/forrest/A/1.png');
  this.load.image('myersA', 'characters/myers/A/1.png');
  this.load.image('myersB', 'characters/myers/B/1.png');
  this.load.image('myersC', 'characters/myers/C/1.png');
}

function create() {
  this.anims.create({
    key: 'talking',
    frames: this.anims.generateFrameNumbers('mozie-talking', { start: 0, end: 4 }),
    frameRate: 8,
    repeat: -1
  });

  user = this.add.sprite(150, 150, 'mozie-talking');
  user.play("talking");
}

function update() {
  if (currentState.character === 'forrest') {
    user.setTexture('forrest');
  } else if (currentState.character === 'mozie' && user.texture.key !== 'mozie-talking') {
    user.setTexture('mozie-talking');
    user.play('talking', true);
  } else if (currentState.character === 'myers') {
    user.setTexture('myersA');
  }

  if (currentState.position === 'left') {
    user.x = user.width / 2;
  } else if (currentState.position === 'up') {
    user.x = 450;
  } else if (currentState.position === 'right') {
    user.x = 900 - user.width / 2
  }

  if (currentState.talking === true) {
    user.play('talking', true);
  } else {

  }
}


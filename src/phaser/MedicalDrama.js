import { Phaser } from 'phaser';

class MedicalDrama extends Phaser.Scene {
  constructor() {
    super({ key: 'MedicalDrama'});
  }
  
  preload() {
    // this.load.image('mozie', 'characters/mozie/A/1.gif')
    this.load.spritesheet('mozie', 'characters/mozie/A/2.png', {
      frameWidth: 300,
      frameHeight: 300
    });
    this.load.spritesheet('inari', 'characters/inari/Inari-sheet-final.png', {
      frameWidth: 192,
      frameHeight: 205
    });
    this.load.image('forrest', 'characters/forrest/A/1.png');
    this.load.image('myersA', 'characters/myers/A/1.png');
    this.load.image('myersB', 'characters/myers/B/1.png');
    this.load.image('myersC', 'characters/myers/C/1.png');
  }
  
  create() {
    this.anims.create({
      key: 'talking',
      frames: this.anims.generateFrameNumbers('mozie', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1
    });
  
    user = this.physics.add.sprite(START_X, spriteY, 'mozie');
    // user.play("talking");
    // user.setCollideWorldBounds(true);
  }
  
  update() {
    if (currentState.character === 'forrest') {
      user.setTexture('forrest');
    } else if (currentState.character === 'mozie' && user.texture.key !== 'mozie-talking') {
      user.setTexture('mozie');
      user.play('talking', true);
    } else if (currentState.character === 'myers') {
      user.setTexture('myersA');
    } else if (currentState.character === 'inari') {
      user.setTexture('inari');
    }
  
    if (currentState.position === 'left') {
      this.physics.moveTo(user, leftX, spriteY, 2000, 100);
    } else if (currentState.position === 'up') {
      this.physics.moveTo(user, centerX, spriteY, 2000, 100);
    } else if (currentState.position === 'right') {
      this.physics.moveTo(user, rightX, spriteY, 2000, 100);
    }
  
    if (currentState.talking === true && user.anims.isPaused) {
      if (currentState.character === 'mozie'){
        user.play('talking', true);
      }
      console.log(currentState);
    } else if (currentState.talking === false && !user.anims.isPaused) {
      user.anims.pause();
      user.setFrame(0);
    }
  
  }
}
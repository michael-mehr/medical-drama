import Phaser from "phaser";

class medicalDrama extends Phaser.Scene {
  constructor() {
    super({ key: 'medicalDrama' });
  }
  
  preload() {
    this.load.spritesheet('mozie-talking', 'characters/mozie/A/2.png', {
      frameWidth: 300,
      frameHeight: 300
    });
    this.load.image('forrest', 'characters/forrest/A/1.png');
  }
  
  create() {
    // this.add.image(0,0, 'forrest');
    
    this.anims.create({
      key: 'talking',
      frames: this.anims.generateFrameNumbers('mozie-talking', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1
    });

    const mozie = this.add.sprite(150, 150, 'mozie-talking');
    mozie.play("talking");
  }
}


var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 500,
    scene: medicalDrama,
    backgroundColor: '#AAAAAA'
};

var game = new Phaser.Game(config);
class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.75);
    
        this.setCollideWorldBounds(false);
        this.setBounce(0);
        this.setVelocityX(0)
        this.alive = true;
        this.gameOver = false;
        this.ani;
        //this.setGravityY(100);
        this.body.setAllowGravity(false);
        this.setImmovable(false);
        //this.sfxDeath = scene.sound.add('sfx_death');

    }

  update(){
    if(this.alive == true){
        //this.setVelocityX(2);
        this.anims.play(this.ani,true);
    }
    


  }

  death(){
      //this.sfxDeath.play();
      //this.anims.play('death_animation', true);
      //this.on('animationcomplete', this.destroy); 
      this.alive = false;
      this.body = null;
      this.destroy();
  }
}
class dude extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.left;
        this.right;
        this.jump;
        this.health = 100;
        this.leftrun;
        this.slide;
        this.airdash;
        this.down;
        this.attack;
        this.health;
        this.setScale(0.5);
    
        //this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setVelocityX(0);
        this.alive = true;
        this.gameOver = false;

        //this.sfxDude = scene.sound.add('sfx_jump');
        //this.sfxDeath = scene.sound.add('sfx_death');

    }

  update(){
    if(this.alive == true){
        this.setVelocityX(0);
    }
    //this.setVelocityX(0);
    if(!this.left.isDown && !this.right.isDown){
        //this.anims.play('vibing')
    }
    if(this.left.isDown){
        this.setVelocityX(-200);
        if(Phaser.Input.Keyboard.JustDown(this.airdash)){
            this.setVelocityX(-5000);
        }
        //this.anims.play('leftrun',true);

        //add animation line here for when facing left
    }

    if(this.right.isDown){
        this.setVelocityX(200);
        if(Phaser.Input.Keyboard.JustDown(this.airdash)){
            this.setVelocityX(4000);
        }
        //this.anims.play('rightrun',true);

        //add animation line here for when facing left
    }

    if (this.down.isDown){
        this.setVelocityY(350);
    }

    if(this.slide.isDown){
        this.setVelocityX(450);
    }

    if(Phaser.Input.Keyboard.JustDown(this.jump) && this.body.touching.down ){ // add checking to see if its on the floor befoe jumping or else it will keep jumping
        //270
        this.setVelocityY(-350);
        //this.sfxDude.play();

        //add animation for jumping here
    }

    //if(Phaser.Input.Keyboard.JustDown(this.airdash) && !this.body.touching.down){
        //this.setVelocityX(5000);
        //add airdash animation
    //}

    //if(this.attack.isDown){
    //    console.log("yo");
        //this.anims.play('slash');
    //}


  }

  death(){
      //this.sfxDeath.play();
      //this.anims.play('death_animation', true);
      //this.on('animationcomplete', this.destroy); 
      this.alive = false;
      this.body = null;
      //this.destroy();
  }

}
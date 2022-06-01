class dude extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.left;
        this.right;
        this.jump;
        this.health = 3;
        this.leftrun;
        this.slide;
        this.airdash;
        this.down;
        this.attack;
        this.health;
        this.stick;
        this.jumpheight;
        this.damaged =false;
        this.setScale(0.5);
    
        //this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setVelocityX(0);
        this.alive = true;
        this.gameOver = false;

        this.sfxDude = scene.sound.add('sfx_jump');
        this.faceLeft = false;
        //this.sfxDude = scene.sound.add('sfx_jump');
        //this.sfxDeath = scene.sound.add('sfx_death');

    }

  update(){
    if(this.alive == true){
        this.setVelocityX(0);
    }
    //this.setVelocityX(0);
    if(!this.left.isDown && !this.right.isDown){
        if (this.faceLeft == false){
            this.anims.play('vibing');
            //this.slashan = 'SlashAni';
        }
        else if(this.faceLeft == true){
            this.anims.play('vibingL');
            //this.slashan = 'SlashAniL';
        }
    }
    if(this.left.isDown){
        this.setVelocityX(-200);
        if(Phaser.Input.Keyboard.JustDown(this.airdash)){
            this.setVelocityX(-5000);
        }
        this.anims.play('run_left',true);
        this.faceLeft = true;
        this.slashan = 'SlashAniL';
        if(this.body.blocked.left){
            console.log("hello")
            //this.body.setAllowGravity(false);
            if(!this.jump.isDown && !Phaser.Input.Keyboard.JustDown(this.right)){
              this.body.setVelocityY(50);
            }
        }
        else{
            this.body.setAllowGravity(true);
        }

        //add animation line here for when facing left
    }

    if(this.right.isDown){
        this.faceLeft = false;
        this.slashan = 'SlashAni';
        this.setVelocityX(200);
        if(Phaser.Input.Keyboard.JustDown(this.airdash)){
            this.setVelocityX(4000);
        }
        this.anims.play('run_right',true);
        if( this.body.blocked.right){
            //this.body.setAllowGravity(false);
            if(!this.jump.isDown && !Phaser.Input.Keyboard.JustDown(this.left)){
                this.body.setVelocityY(50);
            }
        }
        else{
            this.body.setAllowGravity(true);
        }

        //add animation line here for when facing left
    }

    if (this.down.isDown){
        this.setVelocityY(350);
    }

    if(this.slide.isDown){
        this.setVelocityX(450);
    }

    if((Phaser.Input.Keyboard.JustDown(this.jump) && (this.body.onFloor() || this.body.blocked.right|| this.body.blocked.left) )){ // add checking to see if its on the floor befoe jumping or else it will keep jumping
        this.setVelocityY(this.jumpheight);
        //this.sfxDude.play();

    }

    //if(Phaser.Input.Keyboard.JustDown(this.jump) && (this.body.blocked.right|| this.body.blocked.left)){
            //this.body.setAllowGravity(false);
    //}
   // else{
    //    this.body.setAllowGravity(true);
    //}

    /*if(this.damaged == true){
        //this.visible = false
        this.scene.time.addEvent({
            delay: 2000,
            callback: ()=>{
               this.damaged = false; // spawn a new apple
            },
            //loop: true
        })
    }*/

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
      this.destroy();
  }

  hurt(){
        //this.visible = false
        this.scene.time.addEvent({
            delay: 2000,
            callback: ()=>{
               this.damaged = false;
               this.visible = true;
            },
        })

            this.damaged = true;
            this.scene.time.addEvent({
                delay: 60,
                callback: ()=>{
                   if (this.damaged == true){
                     this.visible = false;
                   }
                },
                loop: true
            })
            this.scene.time.addEvent({
                delay: 50,
                callback: ()=>{
                    if (this.damaged == true){
                        this.visible = true;
                    }
                },
                loop: true
            })
            this.health= this.health -1;
            //this.x -= 50;
            //loop: true
  }

}
class boss extends Phaser.Physics.Arcade.Sprite{
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
        this.ani ='bossLeft';
        this.health = 5;
        //this.setGravityY(100);
        this.body.setAllowGravity(true);
        this.setGravityY(100);
        this.setImmovable(true);
        this.chargeL = 'bossCharge';
        this.chargeR = 'bossChargeR';
        this.bossSlashR = 'bossSlashR';
        this.bossSlashL = 'bossSlash';
        this.idleR = 'bossRight';
        this.idleL = 'bossLeft'

        this.attacknum;
        this.target;
        //this.sfxDeath = scene.sound.add('sfx_death');

    }
  
  preload(){
    this.load.spritesheet('bossRight','./assets/bossRight.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:0});
    this.load.spritesheet('bossLeft','./assets/bossLeft.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:0});
    this.load.spritesheet('bossSlashR','./assets/BossSlashR.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:3});
    this.load.spritesheet('bossSlash','./assets/BossSlash.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:3});
    this.load.spritesheet('bossCharge','./assets/BossCharge.png',{frameWidth:150, frameHeight:84, startFrame:0, endFrame:2});
    this.load.spritesheet('bossChargeR','./assets/BossChargeR.png',{frameWidth:150, frameHeight:84, startFrame:0, endFrame:2});
  }

  update(){
    if(this.alive == true){
        //this.setVelocityX(2);
        this.anims.play(this.ani,true);
    }

    if(this.alive == true){
      this.scene.time.addEvent({
        delay: 2000,
        callback: ()=>{
          this.damaged = false;
          this.visible = true;
      },
        
      })
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

  attack(){
    if(this.alive == true){
      if(this.attacknum == 0){
        if(this.target.x < this.body.x ){
          this.anims.play(this.chargeL);
          this.body.setVelocityX(-150);
          console.log("side check");
        }else{
          this.anims.play(this.chargeR);
          this.body.setVelocityX(150);
          console.log("side check right");

        }
      }

      if(this.attacknum == 1){
        if(this.target.x < this.body.x ){
          this.anims.play(this.bossSlashL);
          this.body.setVelocityX(-25);
          console.log("side check");
        }else{
          this.anims.play(this.bossSlashR);
          this.body.setVelocityX(25);
          console.log("side check right");

        }
      }
        
    }
  }
}
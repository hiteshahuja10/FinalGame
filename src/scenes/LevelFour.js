class four extends Phaser.Scene {
    constructor(){
        super("levelFour");
        this.enemy;
    }

    preload(){
        this.load.image('tile', './assets/back2.png');
        this.load.image('sep', './assets/sep1.png');
        this.load.image('sep2', './assets/sep2.png');
        this.load.image('ground', './assets/ground2.png');
        this.load.image('new', './assets/new1.png');
        this.load.image('plat_form', './assets/Platform.png');
        this.load.image('player', './assets/knight.png');
        this.load.image('floor','./assets/ground.png');
        this.load.image('wall','./assets/walls.png');
        this.load.image('line', './assets/line.png');
        this.load.image('line2', './assets/outline.png');
        this.load.image('sword1', './assets/SwordPiece_1.png');
        this.load.image('torch', './assets/torch2.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('slash', './assets/slash.png');
        this.load.image('swordbar', './assets/swordbar2.png');
        this.load.image('collectone', './assets/collectone.png');
        this.load.image('spike','./assets/spikes.png');
        this.load.image('spike2','./assets/double_spike2.png');
        this.load.image('spike3','./assets/backspike2.png');
        this.load.image('healthbar', './assets/healthbar.png');
        this.load.image('healthbar2', './assets/healthbar2.png');
        this.load.image('healthbar3', './assets/healthbar3.png');
        this.load.spritesheet('enemy1', './assets/enemy_attack.png',{frameWidth:32, frameHeight:32, startFrame:0, endFrame:5});
        this.load.spritesheet('run_right','./assets/Player_Run.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:10});
        this.load.spritesheet('run_left','./assets/Player_Run_Left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:10});
        this.load.spritesheet('jump_right','./assets/Jump_Right.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('jump_left','./assets/Jump_Left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('vibing','./assets/knight.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('vibingL','./assets/knight_left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('SlashAni','./assets/Slash_Ani.png',{frameWidth:52, frameHeight:40, startFrame:0, endFrame:10});
        this.load.spritesheet('SlashAniL','./assets/Slash_Ani_Left.png',{frameWidth:39, frameHeight:39, startFrame:0, endFrame:10});
        this.load.spritesheet('bossRight','./assets/bossRight.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:0});
        this.load.spritesheet('bossLeft','./assets/bossLeft.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:0});
        this.load.spritesheet('bossSlashR','./assets/bossSlashR.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:3});
        this.load.spritesheet('bossSlash','./assets/bossSlash.png',{frameWidth:84, frameHeight:150, startFrame:0, endFrame:3});
        this.load.spritesheet('bossCharge','./assets/bossCharge.png',{frameWidth:150, frameHeight:84, startFrame:0, endFrame:2});
        this.load.spritesheet('bossChargeR','./assets/bossChargeR.png',{frameWidth:150, frameHeight:84, startFrame:0, endFrame:2});



        //map Assets
        this.load.image('sep', './assets/sep1.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('tile_four', './assets/stage4atlas.png');
        this.load.tilemapTiledJSON('tilemap3','./assets/test_map3.json');
    }

    create(){
        //this.music.stop();
        this.music = this.sound.add('boss_music');
        this.music.loop = true;
        this.music.play();
        this.spike = this.physics.add.staticGroup();
        //this.scale.updateBounds(1632, 720);
        //this.scale.setGameSize(850, 1000);

        //map loading
        const map = this.make.tilemap({key: 'tilemap3'})
        const tileset_four = map.addTilesetImage('tileset','tile_four');
        const bg = map.createLayer('background3', tileset_four);
        this.ground = map.createLayer('Ground3',tileset_four);
        this.ground.setCollisionByProperty({collides: true});

        this.player = new dude(this,44, 500, 'player').setScale(0.3);
        this.boss = new boss(this, 300, 500, 'bossLeft' ).setScale(0.3)
        this.boss.target = this.player;




        this.anims.create({
            key: 'enemy1',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 5, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('run_right', { start: 0, end: 10, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('run_left', { start: 0, end: 10, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'vibing',
            frames: this.anims.generateFrameNumbers('vibing', { start: 0, end: 0, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'vibingL',
            frames: this.anims.generateFrameNumbers('vibingL', { start: 0, end: 0, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'jump_right',
            frames: this.anims.generateFrameNumbers('jump_right', { start: 0, end: 0, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'jump_left',
            frames: this.anims.generateFrameNumbers('jump_left', { start: 0, end: 0, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'SlashAni',
            frames: this.anims.generateFrameNumbers('SlashAni', { start: 0, end: 10, first: 0}),
            frameRate: 120
        });
        this.anims.create({
            key: 'SlashAniL',
            frames: this.anims.generateFrameNumbers('SlashAniL', { start: 0, end: 10, first: 0}),
            frameRate: 120
        });
        this.anims.create({
            key: 'batani',
            frames: this.anims.generateFrameNumbers('batani', { start: 0, end: 1, first: 0}),
            frameRate: 4
        });

        this.anims.create({
            key: 'bossRight',
            frames: this.anims.generateFrameNumbers('bossRight', { start: 0, end: 0, first: 0}),
            frameRate: 4
        });
        
        this.anims.create({
            key: 'bossLeft',
            frames: this.anims.generateFrameNumbers('bossRight', { start: 0, end: 0, first: 0}),
            frameRate: 4
        });

        this.anims.create({
            key: 'bossSlashR',
            frames: this.anims.generateFrameNumbers('bossSlashR', { start: 0, end: 3, first: 0}),
            frameRate: 8
        });
        this.anims.create({
            key: 'bossSlash',
            frames: this.anims.generateFrameNumbers('bossSlash', { start: 0, end: 3, first: 0}),
            frameRate: 8
        });
        this.anims.create({
            key: 'bossCharge',
            frames: this.anims.generateFrameNumbers('bossCharge', { start: 0, end: 2, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'bossChargeR',
            frames: this.anims.generateFrameNumbers('bossChargeR', { start: 0, end: 2, first: 0}),
            frameRate: 30
        });


        this.physics.add.collider(this.player, this.ground );
        this.physics.add.collider(this.boss, this.ground );
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.player.slide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.player.airdash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.menu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.four = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.leveltwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.player.stick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.player.health = 3;
        this.player.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.player.body.gravity.y = 470;
        this.player.jumpheight = -285;
        this.physics.add.overlap(this.boss, this.player, this.playerhitenemy );

        //60*17
        //40*17
        this.cameras.main.setBounds(0, 0, 1020, 680);
        this.cameras.main.setZoom(2.2);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        //this.cameras.main.setDeadzone(0, 200);
        this.cameras.main.setName("center");

        this.slash = this.physics.add.sprite(100,200,'slash');
        this.slash.visible = false;
        this.slash.setOrigin(0,0);
        this.physics.add.collider(this.slash, this.boss, this.playerhitBoss);

        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.distance = Phaser.Math.Distance.BetweenPoints(this.player, this.boss);
                if (this.distance<100){
                    this.boss.attacknum = 1;
                }
                else{
                    this.boss.attacknum = 0;
                }
                this.boss.attack();      
          },
          loop: true  
        })
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.menu)){
            this.music.stop();
            this.scene.start('menuScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.four)){
            this.music.stop();
            this.scene.start('levelFour');
        }
        this.player.update();
        if (this.player.left.isDown){
            this.player.setVelocityX(-150);
        }
        if (this.player.right.isDown){
            this.player.setVelocityX(150);
        }
        if(this.player.attack.isDown){
            if (this.player.body){
                this.slash.visible = true;
                if (this.player.faceLeft == false){
                    this.slash.body.x = this.player.body.x +10;
                    this.slash.body.y = this.player.body.y;
                    this.slash.setScale(0.5);
                }
                else if (this.player.faceLeft == true){
                    this.slash.body.x = this.player.body.x -15;
                    this.slash.body.y = this.player.body.y;
                    this.slash.setScale(0.5);
                }
                this.slash.anims.play(this.player.slashan, true)
                //this.slash.visible = false;
                this.time.addEvent({
                    delay: 167,
                    callback: ()=>{
                            if(this.slash.visible == true){
                            this.slash.visible = false;
                            }
                    },
                })
            }
        }
    }

    playerhitBoss(slash, boss){ 
        //console.log("boss hit");
        if(slash.visible == true){
            console.log("boss hit");
            if(boss.health == 1){
                boss.death();
            }
            else{
              boss.health = boss.health -1;
            }
        }

    }

    playerhitenemy(enemy, player){
        if(player.damaged == false){
            player.hurt();
        }
        //player.visible = false;
    }

    playerslashenemy(enemy, slash){
        if(slash.visible == true){
          enemy.death();
        }
    } 

    playerhitspikes(player, spikes){
        if(player.damaged == false){
            player.hurt();
        }
    }
    createSpike(x,y,num){
        if(num == 1){
            this.spike.create(x,y,'spike').setScale(0.5);
        }else if(num == 2){
            this.spike.create(x,y,'spike2').setScale(0.5);
        }
        else if (num == 3){
            this.spike.create(x,y,'spike3').setScale(1);
        }
        
    }
}
class Three extends Phaser.Scene {
    constructor(){
        super("levelThree");
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
        this.load.image('floor','./assets/ground.png')
        this.load.image('wall','./assets/walls.png')
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



        //map Assets
        this.load.image('sep', './assets/sep1.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('floor_three', './assets/atlas.png');
        this.load.image('back_ground2', './assets/stage3Back.png');
        this.load.tilemapTiledJSON('tilemap2','./assets/test_map2.json');
    }

    create(){
        //this.music.stop();
        this.music = this.sound.add('sfx_music');
        this.music.loop = true;
        this.music.play();
        this.spike = this.physics.add.staticGroup();
        //this.scale.updateBounds(1632, 720);
        //this.scale.setGameSize(850, 1000);

        //map loading
        const map = this.make.tilemap({key: 'tilemap2'})
        const tileset_three = map.addTilesetImage('tiles','floor_three');
        const tileset2_three = map.addTilesetImage('bg','back_ground2');
        const tileset3_three = map.addTilesetImage('tiles','floor_three');
        const bg = map.createLayer('background2',[tileset2_three,tileset3_three]);
        this.ground = map.createLayer('Ground2',tileset_three);
        this.ground.setCollisionByProperty({collides: true})
        
        this.player = new dude(this,44, 610, 'player').setScale(0.3);

        this.enemy = new enemy(this, 408, 636, 'enemy').setScale(0.8);
        this.physics.add.collider(this.enemy, this.ground);
        this.enemy.ani = 'enemy1';
        this.enemy.body.setAllowGravity(true);
        this.enemy.body.gravity.y = 200;

        this.enemy2 = new enemy(this, 456, 540, 'enemy').setScale(0.8);
        this.enemy2.ani = 'enemy1';
        this.enemy2.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy2, this.ground);
        this.enemy2.body.gravity.y = 200;

        this.enemy3 = new enemy(this, 312, 408, 'enemy').setScale(0.8);
        this.enemy3.ani = 'enemy1';
        this.enemy3.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy3, this.ground);
        this.enemy3.body.gravity.y = 200;

        this.enemy4 = new enemy(this, 300, 552, 'enemy').setScale(0.8);
        this.enemy4.ani = 'enemy1';
        this.enemy4.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy4, this.ground);
        this.enemy4.body.gravity.y = 200;

        this.enemy5 = new enemy(this, 156, 384, 'enemy').setScale(0.8);
        this.enemy5.ani = 'enemy1';
        this.enemy5.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy5, this.ground);
        this.enemy5.body.gravity.y = 200;


        this.slash = this.physics.add.sprite(100,200,'slash');
        this.slash.visible = false;
        this.slash.setOrigin(0,0);

        this.physics.add.collider(this.enemy, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy2, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy2, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy3, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy3, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy4, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy4, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy5, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy5, this.slash, this.playerslashenemy);


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
            frameRate: 60
        });
        this.anims.create({
            key: 'SlashAniL',
            frames: this.anims.generateFrameNumbers('SlashAniL', { start: 0, end: 10, first: 0}),
            frameRate: 60
        });
        this.anims.create({
            key: 'batani',
            frames: this.anims.generateFrameNumbers('batani', { start: 0, end: 1, first: 0}),
            frameRate: 4
        });

        //this.createSpike(140,640,2);
        

        this.physics.add.collider(this.player, this.ground );
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.player.slide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.player.airdash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.menu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.leveltwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.player.stick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.player.health = 3;
        this.player.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.player.body.gravity.y = 470;
        this.player.jumpheight = -285;

        this.cameras.main.setBounds(0, 0, 1632, 720);
        this.cameras.main.setZoom(2.2);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        //this.cameras.main.setDeadzone(0, 200);
        this.cameras.main.setName("center");
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.menu)){
            this.music.stop();
            this.scene.start('menuScene');
        }
        this.player.update();
        this.enemy.update();
        this.enemy2.update();
        this.enemy3.update();
        this.enemy4.update();
        this.enemy5.update();
        this.distance = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy);
        this.distance2 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy2);
        this.distance3 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy3);
        this.distance4 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy4);
        this.distance5 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy5);
        if (this.player.left.isDown){
            this.player.setVelocityX(-150);
        }
        if (this.player.right.isDown){
            this.player.setVelocityX(150);
        }
        if (this.enemy.body != null){
            if (this.distance < 200) {
                if (this.player.x < this.enemy.x && this.enemy.body.velocity.x >= 0) {
                    this.enemy.body.velocity.x = -50;
                }
                else if (this.player.x > this.enemy.x && this.enemy.body.velocity.x <= 0) {
                    this.enemy.body.velocity.x = 50;
                }
            }
        }
        if (this.enemy2.body != null){
            if (this.distance2 < 200) {
                if (this.player.x < this.enemy2.x && this.enemy2.body.velocity.x >= 0) {
                    this.enemy2.body.velocity.x = -50;
                }
                else if (this.player.x > this.enemy2.x && this.enemy2.body.velocity.x <= 0) {
                    this.enemy2.body.velocity.x = 50;
                }
            }
        }
        if (this.enemy3.body != null){
            if (this.distance3 < 200) {
                if (this.player.x < this.enemy3.x && this.enemy3.body.velocity.x >= 0) {
                    this.enemy3.body.velocity.x = -100;
                }
                else if (this.player.x > this.enemy3.x && this.enemy3.body.velocity.x <= 0) {
                    this.enemy3.body.velocity.x = 100;
                }
            }
        }
        if (this.enemy4.body != null){
            if (this.distance4 < 100) {
                if (this.player.x < this.enemy4.x && this.enemy4.body.velocity.x >= 0) {
                    this.enemy4.body.velocity.x = -50;
                }
                else if (this.player.x > this.enemy4.x && this.enemy4.body.velocity.x <= 0) {
                    this.enemy4.body.velocity.x = 50;
                }
            }
        }
        if (this.enemy5.body != null){
            if (this.distance5 < 200) {
                if (this.player.x < this.enemy5.x && this.enemy5.body.velocity.x >= 0) {
                    this.enemy5.body.velocity.x = -50;
                }
                else if (this.player.x > this.enemy5.x && this.enemy5.body.velocity.x <= 0) {
                    this.enemy5.body.velocity.x = 50;
                }
            }
        }

        if(this.player.attack.isDown){
            this.slash.visible = true;
            if (this.player.faceLeft == false){
                this.slash.body.x = this.player.body.x +10;
                this.slash.body.y = this.player.body.y;
                this.slash.setScale(0.5);
            }
            else if (this.player.faceLeft == true){
                this.slash.body.x = this.player.body.x -30;
                this.slash.body.y = this.player.body.y;
                //this.slash.setScale(-1,1);
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
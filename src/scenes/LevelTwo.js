class Level extends Phaser.Scene {
    constructor(){
        super("levelTwo");
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
        this.load.image('sword2', './assets/SwordPiece_2.png');
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
        this.load.image('tile1', './assets/tile.png');
        this.load.image('tile2', './assets/tile2.png');
        this.load.image('floor1', './assets/groundtile1.png');
        this.load.image('floor2', './assets/groundtile2.png');
        this.load.image('floor3', './assets/groundtile3.png');
        this.load.image('back_ground', './assets/backgroundtile2.png');
        this.load.tilemapTiledJSON('tilemap','./assets/test_map.json');
    }

    create(){
        //this.music.stop();
        this.music = this.sound.add('sfx_music');
        this.music.loop = true;
        this.music.play();
        this.scale.updateBounds(4080, 1020);
        this.spike = this.physics.add.staticGroup();
        //this.scale.setGameSize(4080, 1020);

        //map loading
        const map = this.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('ground','tile1')
        const tileset3 =map.addTilesetImage('ground2','tile2')
        const tileset4 =map.addTilesetImage('platform','floor2')
        const tileset2 = map.addTilesetImage('bg','back_ground')
        const bg = map.createLayer('background',tileset2);
        this.ground = map.createLayer('Ground',[tileset,tileset3,tileset4]);
        this.ground.setCollisionByProperty({collides: true})

        //player movement/player
        this.player = new dude(this,44, 610, 'player');
        this.physics.add.collider(this.player, this.ground, this.walljump() );
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.player.slide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.player.airdash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.menu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.leveltwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.levelthree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.player.stick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.player.health = 3;
        this.player.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.player.body.gravity.y = 470;
        this.player.jumpheight = -285;

        this.healthbar = this.add.group();
        this.hbar = this.physics.add.sprite(100, 600, 'healthbar').setScale(0.5);
        this.healthbar.add(this.hbar);

        this.cameras.main.setBounds(0, 0, 4080, 1020);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        //this.cameras.main.setDeadzone(0, 200);
        this.cameras.main.setName("center");

        this.sword2 = this.physics.add.sprite(3930, 830, 'sword2').setScale(0.5);
        this.enemy = new enemy(this, 300, 500, 'enemy').setScale(1.2);
        this.physics.add.collider(this.enemy, this.ground);
        this.enemy.ani = 'enemy1';
        this.enemy.body.setAllowGravity(true);
        this.enemy.body.gravity.y = 200;
        //this.enemy = this.physics.add.staticGroup();
        //this.enemy = this.createEnemy(300, 700, 'enemy', 'enemy1');
        //this.physics.add.collider(this.enemy,this.ground);
        
        this.enemy2 = new enemy(this, 550, 580, 'enemy').setScale(1.2);
        this.enemy2.ani = 'enemy1';
        this.enemy2.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy2, this.ground);
        this.enemy2.body.gravity.y = 200;

        this.enemy3 = new enemy(this, 300, 133, 'enemy').setScale(1.2);
        this.enemy3.ani = 'enemy1';
        this.enemy3.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy3, this.ground);
        this.enemy3.body.gravity.y = 200;

        this.enemy4 = new enemy(this, 1020, 833, 'enemy').setScale(1.2);
        this.enemy4.ani = 'enemy1';
        this.enemy4.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy4, this.ground);
        this.enemy4.body.gravity.y = 200;

        this.enemy5 = new enemy(this, 1085, 527, 'enemy').setScale(1.2);
        this.enemy5.ani = 'enemy1';
        this.enemy5.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy5, this.ground);
        this.enemy5.body.gravity.y = 200;

        this.enemy6 = new enemy(this, 1290, 102, 'enemy').setScale(1.2);
        this.enemy6.ani = 'enemy1';
        this.enemy6.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy6, this.ground);
        this.enemy6.body.gravity.y = 200;

        this.enemy7 = new enemy(this, 1860, 986, 'enemy').setScale(1.2);
        this.enemy7.ani = 'enemy1';
        this.enemy7.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy7, this.ground);
        this.enemy7.body.gravity.y = 200;

        this.enemy8 = new enemy(this, 3030, 816, 'enemy').setScale(1.2);
        this.enemy8.ani = 'enemy1';
        this.enemy8.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy8, this.ground);
        this.enemy8.body.gravity.y = 200;

        this.enemy9 = new enemy(this, 3810, 816, 'enemy').setScale(1.2);
        this.enemy9.ani = 'enemy1';
        this.enemy9.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy9, this.ground);
        this.enemy9.body.gravity.y = 200;

        this.enemy10 = new enemy(this, 2190, 595, 'enemy').setScale(1.2);
        this.enemy10.ani = 'enemy1';
        this.enemy10.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy10, this.ground);
        this.enemy10.body.gravity.y = 200;

        this.enemy11 = new enemy(this, 3510, 408, 'enemy').setScale(1.2);
        this.enemy11.ani = 'enemy1';
        this.enemy11.body.setAllowGravity(true)
        this.physics.add.collider(this.enemy11, this.ground);
        this.enemy11.body.gravity.y = 200;

        this.enter = true;
        this.enter2 = true;

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
        this.physics.add.collider(this.enemy6, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy6, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy7, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy7, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy8, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy8, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy9, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy9, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy10, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy10, this.slash, this.playerslashenemy);
        this.physics.add.collider(this.enemy11, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy11, this.slash, this.playerslashenemy);

        this.createSpike(635,395,2);
        this.createSpike(710,395,2);
        this.createSpike(1625,867,2);
        this.createSpike(1700,867,2);
        this.createSpike(1775,867,2);
        this.createSpike(1850,867,2);
        this.createSpike(1918,867,2);
        this.physics.add.collider(this.player, this.spike, this.playerhitspikes); 
        this.physics.add.overlap(this.player, this.sword2, this.holySword, null, this);

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
    }

    update(){
        this.player.update();
        this.enemy.update();
        this.enemy2.update();
        this.enemy3.update();
        this.enemy4.update();
        this.enemy5.update();
        this.enemy6.update();
        this.enemy7.update();
        this.enemy8.update();
        this.enemy9.update();
        this.enemy10.update();
        this.enemy11.update();
        this.distance = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy);
        this.distance2 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy2);
        this.distance3 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy3);
        this.distance4 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy4);
        this.distance5 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy5);
        this.distance6 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy6);
        this.distance7 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy7);
        this.distance8 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy8);
        this.distance9 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy9);
        this.distance10 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy10);
        this.distance11 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy11);
        if (this.player.gameOver){
            if (Phaser.Input.Keyboard.JustDown(this.restart)){
                this.music.stop();
                this.scene.start('levelTwo');
            }
            if (Phaser.Input.Keyboard.JustDown(this.menu)){
                this.music.stop();
                this.scene.start('menuScene');
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.menu)){
            this.music.stop();
            this.scene.start('menuScene');
        }
        if (this.player.body.position.x > 50 && this.player.body.position.x < 4070){
            this.hbar.x = this.player.body.position.x+10;
        }
        if (this.player.body.position.y > 50 && this.player.body.position.y < 1010){
            this.hbar.y = this.player.body.position.y-25;
        }
        if(Phaser.Input.Keyboard.JustDown(this.levelthree)) {
            this.music.stop();
            this.scene.start('levelThree');
        }
        if (this.enemy.body != null){
            if (this.distance < 200) {
                if (this.player.x < this.enemy.x && this.enemy.body.velocity.x >= 0) {
                    this.enemy.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy.x && this.enemy.body.velocity.x <= 0) {
                    this.enemy.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy2.body != null){
            if (this.distance2 < 200) {
                if (this.player.x < this.enemy2.x && this.enemy2.body.velocity.x >= 0) {
                    this.enemy2.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy2.x && this.enemy2.body.velocity.x <= 0) {
                    this.enemy2.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy3.body != null){
            if (this.distance3 < 200) {
                if (this.player.x < this.enemy3.x && this.enemy3.body.velocity.x >= 0) {
                    this.enemy3.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy3.x && this.enemy3.body.velocity.x <= 0) {
                    this.enemy3.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy4.body != null){
            if (this.distance4 < 200) {
                if (this.player.x < this.enemy4.x && this.enemy4.body.velocity.x >= 0) {
                    this.enemy4.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy4.x && this.enemy4.body.velocity.x <= 0) {
                    this.enemy4.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy5.body != null){
            if (this.distance5 < 200) {
                if (this.player.x < this.enemy5.x && this.enemy5.body.velocity.x >= 0) {
                    this.enemy5.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy5.x && this.enemy5.body.velocity.x <= 0) {
                    this.enemy5.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy6.body != null){
            if (this.distance6 < 200) {
                if (this.player.x < this.enemy6.x && this.enemy6.body.velocity.x >= 0) {
                    this.enemy6.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy6.x && this.enemy6.body.velocity.x <= 0) {
                    this.enemy6.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy7.body != null){
            if (this.distance7 < 200) {
                if (this.player.x < this.enemy7.x && this.enemy7.body.velocity.x >= 0) {
                    this.enemy7.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy7.x && this.enemy7.body.velocity.x <= 0) {
                    this.enemy7.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy8.body != null){
            if (this.distance8 < 200) {
                if (this.player.x < this.enemy8.x && this.enemy8.body.velocity.x >= 0) {
                    this.enemy8.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy8.x && this.enemy8.body.velocity.x <= 0) {
                    this.enemy8.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy9.body != null){
            if (this.distance9 < 200) {
                if (this.player.x < this.enemy9.x && this.enemy9.body.velocity.x >= 0) {
                    this.enemy9.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy9.x && this.enemy9.body.velocity.x <= 0) {
                    this.enemy9.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy10.body != null){
            if (this.distance10 < 200) {
                if (this.player.x < this.enemy10.x && this.enemy10.body.velocity.x >= 0) {
                    this.enemy10.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy10.x && this.enemy10.body.velocity.x <= 0) {
                    this.enemy10.body.velocity.x = 150;
                }
            }
        }
        if (this.enemy11.body != null){
            if (this.distance11 < 200) {
                if (this.player.x < this.enemy11.x && this.enemy11.body.velocity.x >= 0) {
                    this.enemy11.body.velocity.x = -150;
                }
                else if (this.player.x > this.enemy11.x && this.enemy11.body.velocity.x <= 0) {
                    this.enemy11.body.velocity.x = 150;
                }
            }
        }

        if(this.player.health == 2 && this.enter){
            this.hbar.disableBody(true,true);
            this.hbar = this.physics.add.sprite(this.player.body.position.x, 260, 'healthbar2').setScale(0.5);
            this.enter = false;

        }else if(this.player.health == 1 && this.enter2){
            this.hbar.disableBody(true,true);
            this.hbar = this.physics.add.sprite(this.player.body.position.x, 260, 'healthbar3').setScale(0.5);
            this.enter2 = false;
        }else if(this.player.health <= 0){
            this.player.gameOver = true;
            this.cameras.main.startFollow(this.enemy, true, 0.1, 0.1);
            this.check = this.add.text(game.config.width/2-150, game.config.height/2 + 64, 'Press (R) to Restart or (M) for Menu',
            menuConfig).setOrigin(0.5);
            this.player.death();
        }

        if(this.player.attack.isDown){
            this.slash.visible = true;
            if (this.player.faceLeft == false){
                this.slash.body.x = this.player.body.x +10;
                this.slash.body.y = this.player.body.y;
                this.slash.setScale(1);
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

    walljump(player, ground){
        console.log("touching");

    }

    holySword(player,piece){
        piece.disableBody(true,true);
        //this.swordbar.disableBody(true,true);
        //this.holy += 1;
        //this.swordbar = this.physics.add.sprite(0, 650, 'collectone').setScale(1.5);
        this.next = this.add.text(this.player.x-20, this.player.y-100, 'Press (3) for next level!',
            menuConfig).setOrigin(0.5);
        //this.music.stop();
        //this.scene.start('levelTwo');

    }


    playerhitenemy(enemy, player){
        if(player.damaged == false){
            player.hurt();
        }
        //player.visible = false;
    }

    playerhitspikes(player, spikes){
        if(player.damaged == false){
            player.hurt();
        }
    }

    playerslashenemy(enemy, slash){
        console.log("yo");
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
            this.spike.create(x,y,'spike2').setScale(1);
        }
        else if (num == 3){
            this.spike.create(x,y,'spike3').setScale(1);
        }
        
    }

    /*createEnemy(x, y, picture, p2){
        this.enemy = new enemy(this, x, y, picture).setScale(1.2);
        this.enemy.ani = p2;
        //this.enemy.body.setAllowGravity(true);
        this.enemy.body.setAllowGravity(true);
        this.enemy.body.gravity.y = 200;
        return this.enemy;
    }*/
}
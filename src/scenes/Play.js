
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.line;
        this.holy = 0;
        this.gameOver = false;
        this.platform;
        this.spike;
    }

    preload() {
        this.load.image('tile', './assets/back2.png');
        this.load.image('sep', './assets/sep1.png');
        this.load.image('sep2', './assets/sep2.png');
        this.load.image('ground', './assets/ground2.png');
        this.load.image('new', './assets/new1.png');
        this.load.image('platform', './assets/Platform.png');
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
        this.load.image('bat', './assets/bat.png');
        this.load.spritesheet('enemy1', './assets/enemy_attack.png',{frameWidth:32, frameHeight:32, startFrame:0, endFrame:5});
        this.load.spritesheet('run_right','./assets/Player_Run.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:10});
        this.load.spritesheet('run_left','./assets/Player_Run_Left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:10});
        this.load.spritesheet('jump_right','./assets/Jump_Right.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('jump_left','./assets/Jump_Left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('vibing','./assets/knight.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('vibingL','./assets/knight_left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('SlashAni','./assets/Slash_Ani.png',{frameWidth:52, frameHeight:40, startFrame:0, endFrame:10});
        this.load.spritesheet('SlashAniL','./assets/Slash_Ani_Left.png',{frameWidth:39, frameHeight:39, startFrame:0, endFrame:10});
        this.load.spritesheet('batani','./assets/Bat_ani.png',{frameWidth:35, frameHeight:26, startFrame:0, endFrame:1});
    }

    create() {
        this.music = this.sound.add('sfx_music');
        this.music.loop = true;
        this.music.play();
        this.tile = this.add.tileSprite(0, 0, 1400, 700, 'sep').setOrigin(0, 0);
        this.sword1 = this.physics.add.sprite(1235, 585, 'sword1').setScale(0.5);
        this.torch = this.physics.add.sprite(100, 350, 'torch').setScale(1.5);
        this.torch = this.physics.add.sprite(500, 350, 'torch').setScale(1.5);
        this.torch = this.physics.add.sprite(900, 350, 'torch').setScale(1.5);
        //this.heart = this.physics.add.sprite(30, 250, 'heart').setScale(1);
        //this.heart1 = this.physics.add.sprite(60, 250, 'heart').setScale(1);
        //this.heart2 = this.physics.add.sprite(90, 250, 'heart').setScale(1);
        this.ground = this.physics.add.sprite(700,700,'ground').setScale(1);
        this.ground2 = this.physics.add.sprite(0,700,'ground').setScale(1);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.platform = this.physics.add.staticGroup();
        this.spike = this.physics.add.staticGroup();


        this.title = this.add.rectangle(0, borderUISize-12, game.config.width, (scoreUISize * 2)-5, 
        0x00699a).setOrigin(0, 0);

        
        this.line = this.physics.add.staticGroup();
        this.line.create(100,65,'line');
        this.line.create(320,65,'line');
        this.line.create(0,250,'line2');
        this.line.create(1398, 250, 'line2');
        
        this.player = new dude(this,200, 250, 'player');
        this.player.body.gravity.y = 400;
        this.enter = true;
        this.enter2 = true;

        this.enemy = new enemy(this, 400, 580, 'enemy').setScale(1.2);
        this.enemy.ani = 'enemy1';
        this.enemy.setCollideWorldBounds(false);
        this.enemy2 = new enemy(this, 550, 580, 'enemy').setScale(1.2);
        this.enemy2.ani = 'enemy1';
        this.enemy2.setCollideWorldBounds(false);
        this.enemy3 = new enemy(this, 650, 580, 'enemy').setScale(1.2);
        this.enemy3.ani = 'enemy1';
        this.enemy3.setCollideWorldBounds(false);
        this.bat1 = new enemy(this, 650, 400, 'bat').setScale(1.2);
        this.bat1.ani = 'batani';

        this.enemy.body.gravity.y = 200;
        this.input.mouse.capture = true;
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.player.slide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.player.airdash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.menu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.leveltwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.player.health = 3;
        this.player.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.slash = this.physics.add.sprite(100,200,'slash');
        this.slash.visible = false;
        this.slash.setOrigin(0,0);

        //this.slash.animations.add('SlashAni', false);
        //this.slash.animations.add('SlashAni', true);
        //this.player.attack = this.input.activePointer.leftButton;

        this.physics.add.collider(this.player, this.platforms); 
        this.physics.add.collider(this.player, this.line);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.player, this.playerhitenemy);
        this.physics.add.collider(this.bat1, this.player, this.playerhitenemy);
        this.physics.add.collider(this.enemy2, this.player, this.playerhitenemy);
        this.physics.add.collider(this.enemy3, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy, this.slash, this.playerslashenemy);
        this.physics.add.overlap(this.enemy2, this.slash, this.playerslashenemy);
        this.physics.add.overlap(this.enemy3, this.slash, this.playerslashenemy);
        this.physics.add.overlap(this.bat1, this.slash, this.playerslashenemy);

        //this.hbar = this.add.container(50, 50);
        this.healthbar = this.add.group();
        this.hbar = this.physics.add.sprite(100, 260, 'healthbar').setScale(1);
        this.healthbar.add(this.hbar);

        //this.bar = this.add.container(10, 50);
        this.bar = this.add.group();
        this.swordbar = this.physics.add.sprite(0, 650, 'swordbar').setScale(1.5);
        this.bar.add(this.swordbar);
        /*this.tweens.add({
            targets: this.bar,
            x: 110,
            ease: 'Linear',
            duration: 1,
            delay: 30,
            yoyo: false,
            repeat: -1
        });*/

        this.cameras.main.setBounds(0, 0, 1500, 700);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(0, 200);
        this.cameras.main.setName("center");

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
        //this.player.slashan ='SlashAni';

        
        //this.physics.add.collider(this.player, ground); 
        this.physics.add.overlap(this.player, this.sword1, this.holySword, null, this);

        //this.createPlatform(100,350).setScale(0.5);
        this.createPlatform(350,520);
        this.createPlatform(750,520);
        this.createPlatform(1100,520);
        this.createPlatform(1300,520);
        this.createSpike(500,585,2);
        this.createSpike(1101,538,3);

        //Platforms and Spikes
        this.physics.add.collider(this.player, this.platform); 
        this.physics.add.collider(this.player, this.spike, this.playerhitspikes); 
        this.physics.add.collider(this.healthbar, this.outline);
        this.player.jumpheight = -275;
        
    }

    update(){
        if (this.player.gameOver){
            if (Phaser.Input.Keyboard.JustDown(this.restart)){
                this.music.stop();
                this.scene.start('playScene');
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
        if(Phaser.Input.Keyboard.JustDown(this.leveltwo)) {
            this.music.stop();
            this.scene.start('levelTwo');
        }
        //this.tile.tilePositionY -= 4;
        if(this.player.gameOver != true){
            this.player.update();
            this.enemy.update();
            this.enemy2.update();
            this.enemy3.update();
            this.bat1.update();

            //this.swordbar.x = this.player.body.position.x;
            if (this.player.body.position.x > 50 && this.player.body.position.x < 1350){
                this.hbar.x = this.player.body.position.x;
            }
            if (this.player.body.position.x > 110 && this.player.body.position.x < 1300){
                this.swordbar.x = this.player.body.position.x;
            }
            this.distance = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy);
            this.distance2 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy2);
            this.distance3 = Phaser.Math.Distance.BetweenPoints(this.player, this.enemy3);
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
                        this.enemy2.body.velocity.x = -100;
                    }
                    else if (this.player.x > this.enemy2.x && this.enemy2.body.velocity.x <= 0) {
                        this.enemy2.body.velocity.x = 100;
                    }
                }
            }
            if (this.enemy3.body != null){
                if (this.distance3 < 200) {
                    if (this.player.x < this.enemy3.x && this.enemy3.body.velocity.x >= 0) {
                        this.enemy3.body.velocity.x = -50;
                    }
                    else if (this.player.x > this.enemy3.x && this.enemy3.body.velocity.x <= 0) {
                        this.enemy3.body.velocity.x = 50;
                    }
                }
            }
            /*if (this.player.right.isDown && this.heart.x < 1320){
                this.heart.x += 3.35;
                this.heart1.x += 3.35;
                this.heart2.x += 3.35;
            }
            else if(this.player.left.isDown && this.heart.x > 20){
                this.heart.x -= 3.1;
                this.heart1.x -= 3.1;
                this.heart2.x -= 3.1;
            }*/
            if(this.player.health == 2 && this.enter){
                this.hbar.disableBody(true,true);
                this.hbar = this.physics.add.sprite(this.player.body.position.x, 260, 'healthbar2').setScale(1);
                this.enter = false;
                /*if (this.heart2){
                    console.log("yoyoyoyo");
                    this.heart2.alpha = 0;
                };*/

            }else if(this.player.health == 1 && this.enter2){
                this.hbar.disableBody(true,true);
                this.hbar = this.physics.add.sprite(this.player.body.position.x, 260, 'healthbar3').setScale(1);
                this.enter2 = false;
                //this.heart1.alpha = 0;
            }else if(this.player.health <= 0){
                //this.heart.alpha = 0;
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
}

    holySword(player,piece){
        piece.disableBody(true,true);
        this.swordbar.disableBody(true,true);
        this.holy += 1;
        this.swordbar = this.physics.add.sprite(0, 650, 'collectone').setScale(1.5);
        this.next = this.add.text(this.player.x-20, game.config.height/2 + 64, 'Press (2) for next level!',
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
    createPlatform(x,y){
        this.platform.create(x,y,'platform').setScale(0.5).refreshBody();
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

}
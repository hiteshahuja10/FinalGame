
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.line;
        this.holy = 0;
        this.gameOver = false;
    }

    preload() {
        this.load.image('tile', './assets/back2.png');
        this.load.image('sep', './assets/sep1.png');
        this.load.image('sep2', './assets/sep2.png');
        this.load.image('ground', './assets/ground2.png');
        this.load.image('new', './assets/new1.png');
        this.load.image('platform', './assets/StonePlatform.png');
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
        this.load.spritesheet('enemy1', './assets/enemy_attack.png',{frameWidth:32, frameHeight:32, startFrame:0, endFrame:5});
        this.load.spritesheet('run_right','./assets/Player_Run.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:10});
        this.load.spritesheet('run_left','./assets/Player_Run_Left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:10});
        this.load.spritesheet('jump_right','./assets/Jump_Right.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('jump_left','./assets/Jump_Left.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('vibing','./assets/knight.png',{frameWidth:52, frameHeight:80, startFrame:0, endFrame:0});
        this.load.spritesheet('SlashAni','./assets/Slash_Ani.png',{frameWidth:52, frameHeight:40, startFrame:0, endFrame:10});
    }

    create() {
        this.music = this.sound.add('sfx_music');
        this.music.loop = true;
        this.music.play();
        this.tile = this.add.tileSprite(0, 0, 1400, 700, 'sep').setOrigin(0, 0);
        this.sword1 = this.physics.add.sprite(1300, 585, 'sword1').setScale(0.5);
        this.torch = this.physics.add.sprite(100, 350, 'torch').setScale(1.5);
        this.torch = this.physics.add.sprite(500, 350, 'torch').setScale(1.5);
        this.torch = this.physics.add.sprite(900, 350, 'torch').setScale(1.5);
        this.heart = this.physics.add.sprite(30, 250, 'heart').setScale(1);
        this.heart1 = this.physics.add.sprite(60, 250, 'heart').setScale(1);
        this.heart2 = this.physics.add.sprite(90, 250, 'heart').setScale(1);
        this.ground = this.physics.add.sprite(700,700,'ground').setScale(1);
        this.ground2 = this.physics.add.sprite(0,700,'ground').setScale(1);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;


        this.title = this.add.rectangle(0, borderUISize-12, game.config.width, (scoreUISize * 2)-5, 
        0x00699a).setOrigin(0, 0);

        //this.swordbar = this.physics.add.sprite(150, 650, 'swordbar').setScale(1.5);

        
        this.line = this.physics.add.staticGroup();
        this.line.create(100,65,'line');
        this.line.create(320,65,'line');
        this.line.create(0,250,'line2');
        this.line.create(1398, 250, 'line2');



        /*const map = this.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('castle-ground','floor')
        const tileset2 = map.addTilesetImage('bg','wall')
        const bg = map.createLayer('background',tileset2,0,400);
        const ground = map.createLayer('ground',tileset);
        map.setCollisionBetween(1, 12);
        ground.setPosition(0, 400);
        bg.setPosition(0,400)
        ground.setOrigin(0,0);
        ground.setCollisionByProperty({collides: true})*/
        
        this.player = new dude(this,300, 250, 'player');
        this.player.body.gravity.y = 200;

        this.enemy = new enemy(this,400, 580, 'enemy').setScale(1.2);
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
        this.player.health = 3;
        this.player.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.slash = this.physics.add.sprite(100,200,'slash');
        this.slash.visible = false;
        //this.slash.animations.add('SlashAni', false);
        //this.player.attack = this.input.activePointer.leftButton;

        this.physics.add.collider(this.player, this.platforms); 
        this.physics.add.collider(this.player, this.line);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.player, this.playerhitenemy);
        this.physics.add.overlap(this.enemy, this.slash, this.playerslashenemy);


        this.bar = this.add.container(10, 50);
        //this.healthbar1 = this.add.container(20, 50);
        //this.healthbar2 = this.add.container(30, 50);
        //this.heart = this.physics.add.sprite(30, 250, 'heart').setScale(1);
        this.swordbar = this.physics.add.sprite(50, 600, 'swordbar').setScale(1.5);
        //this.heart1 = this.physics.add.sprite(60, 250, 'heart').setScale(1);
        //this.heart2 = this.physics.add.sprite(90, 250, 'heart').setScale(1);
        this.bar.add(this.swordbar);
        //this.healthbar1.add(this.heart1);
        //this.healthbar2.add(this.heart2);
        this.tweens.add({
            targets: this.bar,
            x: 80,
            ease: 'Linear',
            duration: 1,
            delay: 30,
            yoyo: false,
            repeat: -1
        });

        //this.swordbar.body.setCollideWorldBounds(true);
        //this.physics.add.collider(this.swordbar, this.line);
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

        
        //this.physics.add.collider(this.player, ground); 
        this.physics.add.overlap(this.player, this.sword1, this.holySword, null, this);

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
        //this.tile.tilePositionY -= 4;
        if(this.player.gameOver != true){
            this.player.update();
            this.enemy.update();
            this.swordbar.x = this.player.body.position.x;
            if (this.player.right.isDown && this.heart.x < 1320){
                this.heart.x += 3.35;
                this.heart1.x += 3.35;
                this.heart2.x += 3.35;
            }
            else if(this.player.left.isDown && this.heart.x > 20){
                this.heart.x -= 3.1;
                this.heart1.x -= 3.1;
                this.heart2.x -= 3.1;
            }
            if(this.player.health == 2){
                if (this.heart2){
                    console.log("yoyoyoyo");
                    this.heart2.alpha = 0;;
                };
            }else if(this.player.health == 1){
                this.heart1.alpha = 0;
            }else if(this.player.health <= 0){
                this.heart.alpha = 0;
                this.player.gameOver = true;
                this.cameras.main.startFollow(this.enemy, true, 0.1, 0.1);
                this.check = this.add.text(game.config.width/2-30, game.config.height/2 + 64, 'Press (R) to Restart or (M) for Menu',
                menuConfig).setOrigin(0.5);
                this.player.death();

            }
    
            if(this.player.attack.isDown){
                this.slash.visible = true;
                this.slash.body.x = this.player.body.x +10;
                this.slash.body.y = this.player.body.y;
                this.slash.anims.play('SlashAni', true)
                this.slash.on('animationcomplete', ()=>{ 
                    console.log('animationcomplete')
                    this.slash.visible = false;
                }); 
                //this.slash.visible = false;
            }
        }

        
    }

    holySword(player,piece){
        piece.disableBody(true,true);
        this.swordbar.disableBody(true,true);
        this.holy += 1;
        this.swordbar = this.physics.add.sprite(0, 650, 'collectone').setScale(1.5);

    }

    playerhitenemy(enemy, player){
        player.health= player.health -1;
        player.x -= 25;
        //console.log("hello")
    }
    playerslashenemy(enemy, slash){
        console.log("yo");
        enemy.death();
        //console.log("hello")
    }

    // createPlatform(x,y, velocity){
    //     let test = this.random(1, 2);
    //     //let size = this.random(1, 2);
    //     console.log(test);
    //     let tile = this.physics.add.sprite(x,y,'platform').setScale(1.2);
    //     tile.body.immovable = true;
    //     tile.body.allowGravity = false;
    //     tile.body.setVelocityY(velocity);
    //     this.platforms.add(tile);
    //     let coin = this.physics.add.sprite(x,y-30,'coin').setScale(0.5);
    //     coin.body.immovable = true;
    //     coin.body.allowGravity = false;
    //     coin.body.setVelocityY(velocity);
    //     this.coin.add(coin);
    //     if(test % 2 == 0) {
    //         if (x != 300 && y != 600){
    //             let spikes = this.physics.add.sprite(x,y+26,'downspike').setScale(1);
    //             spikes.body.immovable = true;
    //             spikes.body.allowGravity = false;
    //             spikes.body.setVelocityY(velocity);
    //             this.spikes.add(spikes);
    //         }
    //     }
    // }    

}
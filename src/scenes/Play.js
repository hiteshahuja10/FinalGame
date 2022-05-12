
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.line;
        this.player;
        this.holy = 0;
        this.health = 3;
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
        this.load.tilemapTiledJSON('tilemap','./assets/Test_Map.json')
        this.load.image('line', './assets/line.png');
        this.load.image('line2', './assets/outline.png');
        this.load.image('sword1', './assets/SwordPiece_1.png');
        this.load.image('torch', './assets/torch2.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('enemy', './assets/enemy.png');
        //this.load.tilemapTiledJSON('tilemap','./assets/back.json');
        /*this.load.image('spike','./assets/Spikes.png');
        this.load.image('spike1','./assets/Spikes1.png');
        this.load.image('downspike','./assets/Spike_Down.png');
        this.load.image('lava', './assets/Lava.png');
        this.load.image('coin', './assets/coin.png');
        this.load.image('line', './assets/line.png');
        this.load.spritesheet('death_animation', './assets/DeathAnimation.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:13});
        this.load.spritesheet('leftrun', './assets/Player_LeftRun.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:4});
        this.load.spritesheet('rightrun', './assets/Play_RightRun.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:4});
        this.load.spritesheet('vibing', './assets/Player.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:0} )*/
        this.load.spritesheet('enemy1', './assets/enemy_attack.png',{frameWidth:32, frameHeight:32, startFrame:0, endFrame:5});

        

    }

    create() {
        
        
        //this.tile = this.add.tileSprite(0, 0, 560, 700, 'tile').setOrigin(0, 0);
        this.tile = this.add.tileSprite(0, 0, 1400, 700, 'sep').setOrigin(0, 0);
        this.sword1 = this.physics.add.sprite(1300, 585, 'sword1').setScale(0.5);
        this.torch = this.physics.add.sprite(100, 350, 'torch').setScale(1.5);
        //this.torch = this.physics.add.sprite(200, 300, 'torch').setScale(1.5);
        //this.torch = this.physics.add.sprite(350, 300, 'torch').setScale(1.5);
        this.torch = this.physics.add.sprite(500, 350, 'torch').setScale(1.5);
        this.torch = this.physics.add.sprite(900, 350, 'torch').setScale(1.5);
        this.heart = this.physics.add.sprite(30, 250, 'heart').setScale(1);
        this.heart1 = this.physics.add.sprite(60, 250, 'heart').setScale(1);
        this.heart2 = this.physics.add.sprite(90, 250, 'heart').setScale(1);
        this.ground = this.physics.add.sprite(700,700,'ground').setScale(1);
        this.ground2 = this.physics.add.sprite(0,700,'ground').setScale(1);
        //this.ground = this.physics.add.sprite(500,650,'ground').setScale(1);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        //this.tile2 = this.add.tileSprite(0, 300, 850, 600, 'sep2').setOrigin(0, 0);

        this.title = this.add.rectangle(0, borderUISize-12, game.config.width, (scoreUISize * 2)-5, 
        0x00699a).setOrigin(0, 0);
        //this.title2 = this.add.rectangle(0, 620, game.config.width, (scoreUISize * 2)+10, 
        //0x35464d).setOrigin(0, 0);

        
        this.heart.fixedToCamera = true;
        this.line = this.physics.add.staticGroup();
        this.line.create(100,65,'line');
        this.line.create(0,250,'line2');
        this.line.create(1398, 250, 'line2');
        //this.line.create(600,65,'line');
        //this.line.create(600,620, 'line');
        //this.line.create(150,620, 'line');

        

        /*this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);*/


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

        this.enemy = new enemy(this,300, 250, 'enemy');
        this.enemy.body.gravity.y = 200;
        //let tile = this.physics.add.sprite(200,600,'platform').setScale(2);
        //tile.body.setVelocityY(0);
        //tile.body.immovable = true;
        //tile.body.allowGravity = false;
        //this.platforms.add(tile);
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //this.Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.player.slide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.player.airdash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.physics.add.collider(this.player, this.platforms); 
        this.physics.add.collider(this.player,this.line);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.enemy, this.platforms);

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

        
        //this.physics.add.collider(this.player, ground); 
        this.physics.add.overlap(this.player, this.sword1, this.holySword, null, this);

    }
    
    update(){
        //this.tile.tilePositionY -= 4;
        if(this.player.gameOver != true){
            this.player.update();
            this.enemy.update();
        }
        if (this.player.left.isDown || this.player.right.isDown){
            this.heart.x += 5;
        }
        if(this.health != 3){
            if(this.health != 2){
                if(this.health != 1){
                    this.heart.destroy();
                    this.player.gameOver = true;
                }
                this.heart1.destroy();
            }
            this.heart2.destroy();
        }
        
    }

    holySword(player,piece){
        piece.disableBody(true,true)
        this.holy += 1;

    }

    

}
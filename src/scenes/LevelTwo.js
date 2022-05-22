class Level extends Phaser.Scene {
    constructor(){
        super("levelTwo");
    }

    preload(){
        this.load.image('sep', './assets/sep1.png');
        this.load.image('heart', './assets/heart.png');
    }

    create(){
        this.new = this.add.tileSprite(0, 0, 1400, 700, 'sep').setOrigin(0, 0);
        this.heart = this.physics.add.sprite(30, 250, 'heart').setScale(1);
        //this.music.stop();
    }

    update(){
        //this.player.update();
    }
}

/*class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_music', './assets/BeepBox-Song.wav');
        this.load.audio('sfx_jump', './assets/Jump8.wav');
        this.load.audio('sfx_jump', './assets/Jump20.wav');
        this.load.audio('sfx_jump1', './assets/Jump5.wav');
        this.load.audio('sfx_death', './assets/Death.wav');
        this.load.audio('sfx_coinpick', './assets/Pickup_Coin.wav');
        this.load.image('background', './assets/sep1.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#00a6c9',
            color: '#FFFFFF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            backgroundColor: '#0063c6',
            color: '#ffffff',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 260
        }
        this.background = this.add.tileSprite(0, 0, 850, 700, 'background').setOrigin(0, 0);
        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 100, 
            'Knight Runner!', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
            'P1: Use A&D to move & Space Bar to jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
            'Use S to decline (come down faster)', menuConfig).setOrigin(0.5);

            this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 34,
            'Press Enter to attack the enemies!', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 150,
            'Press Space Bar to start the game!', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 115,
            'Press M to return to Main Menu', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        this.background.tilePositionX += 4;
        if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.scene.start('playScene');
        }
    }
}*/
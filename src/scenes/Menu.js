class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_music', './assets/Music.wav');
        this.load.audio('sfx_jump', './assets/Jump8.wav');
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
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 100,
            'Press Space Bar to start the game!', menuConfig).setOrigin(0.5);

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
}
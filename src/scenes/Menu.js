class Menu extends Phaser.Scene {
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
        this.load.image('background', './assets/test_map3.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#702963',
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
            backgroundColor: '#702963',
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 150, 
            'Knight Runner!', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 50, 
            'P1: Use A&D to move & Space Bar to jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding - 50, 
            'Use S to decline (come down faster)', menuConfig).setOrigin(0.5);

            this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 34-50,
            'Press Enter to attack the enemies!', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 150-50,
            'Press Space Bar to start the game!', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 115-50,
            'Press M to return to Main Menu', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 135,
            'Press C for Credits Scene', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.credits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        //this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        this.background.tilePositionX += 4;
        if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.credits)) {
            this.scene.start('credits');
        }
    }
}
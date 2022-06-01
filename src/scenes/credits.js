class Credits extends Phaser.Scene {
    constructor(){
        super("credits");
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

    create(){
        this.background = this.add.tileSprite(0, 0, 850, 700, 'background').setOrigin(0, 0);
        this.menu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        let titleConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-300,
            'Credits', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-250,
            'Player and Enemy Mechanics:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-214,
            'Hitesh Ahuja, Andres Benitez', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-150,
            'Level Design and Sound:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-114,
            'Nicholas Lau, Hitesh Ahuja', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-60,
            'Artwork/Open Source Assets:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-24,
            'Kenny Chau, Andres Benitez', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+12,
            '"Pixel Castle 2D" by Szadi Art', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+50,
            '(Modified all art assets used in our game)', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+120,
            'Press M to return to Main Menu', titleConfig).setOrigin(0.5);
        
    }

    update(){
        this.background.tilePositionX += 4;
        if (Phaser.Input.Keyboard.JustDown(this.menu)){
            this.scene.start('menuScene');
        }
    }
}
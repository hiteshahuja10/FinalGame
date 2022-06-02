class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_music', './assets/BeepBox-Song.wav');
        this.load.audio('boss_music','./assets/boss_song.wav')
        this.load.audio('sfx_jump', './assets/Jump8.wav');
        this.load.audio('sfx_jump', './assets/Jump20.wav');
        this.load.audio('sfx_jump1', './assets/Jump5.wav');
        this.load.audio('sfx_death', './assets/Death.wav');
        this.load.audio('sfx_coinpick', './assets/Pickup_Coin.wav');
        this.load.image('background', './assets/test_map3.png');
        this.load.image('menu','./assets/menu.png');
    }

    create() {
        this.background = this.add.tileSprite(-85, 0, 1000, 700, 'background').setOrigin(0, 0);
        
        this.add.sprite(425,350,'menu');
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.credits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        //this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        //this.background.tilePositionX += 4;
        if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.credits)) {
            this.scene.start('credits');
        }
    }
}
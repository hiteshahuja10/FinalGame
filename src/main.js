var config = {
    type: Phaser.AUTO,
    scale: {
        width: 850,
        height: 700,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                x: 0,
                y: 0 },
            debug: false
        }
    },
    scene: [Menu,Play, Level, Three, four, Credits]
};

var menuConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
} 

var restartConfig = {
    fontFamily: 'Courier',
    fontSize: '15px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'center',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
} 

var endConfig = {
    fontFamily: 'Courier',
    fontSize: '18px',
    backgroundColor: '#702963',
    color: '#FFFFFF',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
}

var game = new Phaser.Game(config);
var v = false;
var q = false;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, spaceBar;
// set UI sizes
let scoreUISize = game.config.height/20;
let borderUISize = game.config.height / 60;
let borderPadding = borderUISize / 3;

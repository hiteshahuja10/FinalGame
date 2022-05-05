
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('tile', './assets/Tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        this.load.image('player', './assets/Player.png');
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
    }

    create() {
       
    }
    
    update(){
        
    }
    

}
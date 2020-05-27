class StartScene extends Phaser.Scene {
    constructor() {
        console.log("Start")
        super({ key: 'StartScene' });
    }
    
    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('fishPoison', 'assets/fishPoison.png');
        this.load.image('wood', 'assets/wood.png');
        this.load.image('repairRaft', 'assets/repairRaft.png');
        this.load.image('addRaft', 'assets/addRaft.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('childRaft', 'assets/childRaft.png');
        this.load.image('childRaftWithChild', 'assets/childRaftWithChild.png');
        this.load.image('childRaftChildDead', 'assets/childRaftChildDead.png');
        this.load.image('child', 'assets/child.png');
        this.load.image('rain', 'assets/rain.png');
        this.load.image('fog', 'assets/fog.png');
        this.load.image('shark', 'assets/shark.png');
    }

    create() {
        var text = this.add.text(30, 30, 'Start game').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        text.setInteractive();

        text.on('pointerdown', this.startGame, this);

        this.scene.get('SeaScene').events.on('EatFish', () => {console.log("score eats fish")}, this);

        this.scene.get('ScoreScene').events.on('StartGame', this.startGame, this);

        this.scene.get('SeaScene').events.on('Endgame', this.endGame, this);

        this.scene.launch('SeaScene')
        this.scene.launch('ScoreScene')

        this.scene.get('ScoreScene').scene.sleep();
        this.scene.get('SeaScene').scene.sleep();
    }

    startGame() {
        this.scene.setVisible(false);
        this.scene.bringToTop('SeaScene')
        this.scene.get('SeaScene').restart();
        this.scene.get('ScoreScene').restart();
        this.scene.get('SeaScene').scene.wake();
        
    }

    endGame() {
        
        this.scene.get('SeaScene').scene.sleep();
        this.scene.get('ScoreScene').scene.wake();
    }
}
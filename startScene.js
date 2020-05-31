class StartScene extends Phaser.Scene {
    constructor() {
        console.log("Start")
        super({ key: 'StartScene' });
    }
    
    preload() {

        this.sky = this.add.rectangle(this.cameras.main.width/2, ((this.cameras.main.height)/2), this.cameras.main.width, this.cameras.main.height, 0x67B2C7);

        this.startGameButton = this.add.text(30, 30, 'Loading game...').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        this.load.image('bg', 'assets/bg.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('fishPoison', 'assets/fishPoison.png');
        this.load.image('fishbubble', 'assets/fishbubble.png');
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
        this.load.image('shore', 'assets/shore.png');
        this.load.image('help', 'assets/help.png');

        this.load.audio('theme', [
            'assets/09.ogg',
            'assets/09.mp3'
        ]);

        this.load.audio('sea', [
            'assets/sea.ogg',
            'assets/sea.mp3'
        ]);

        this.load.audio('rain', [
            'assets/rain.ogg',
            'assets/rain.mp3'
        ]);

        this.load.audio('thunder', [
            'assets/thunder.ogg',
            'assets/thunder.mp3'
        ]);
    }

    create() {
        
        this.startGameButton.setText("Start game")

        this.startGameButton.setInteractive();

        this.startGameButton.on('pointerdown', this.startGame, this);

        this.helpImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2,'help')
        this.helpImage.visible = false;
        this.helpImage.setInteractive();

        this.helpImage.on('pointerdown', this.hideHelp, this);

        this.helpButton = this.add.text(30, 130, 'How to play').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        this.helpButton.setInteractive();
        this.helpButton.on('pointerdown', this.showHelp, this);

        this.scene.get('ScoreScene').events.on('StartGame', this.startGame, this);
        this.scene.get('SeaScene').events.on('Endgame', this.endGame, this);

        this.scene.launch('SeaScene')
        this.scene.launch('ScoreScene')

        this.scene.get('ScoreScene').scene.sleep();
        this.scene.get('SeaScene').scene.sleep();
    }

    showHelp() {
        this.startGameButton.visible = false;
        this.helpButton.visible = false;
        this.helpImage.visible = true;
    }

    hideHelp() {
        this.startGameButton.visible = true;
        this.helpButton.visible = true;
        this.helpImage.visible = false;
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
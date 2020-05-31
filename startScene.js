class StartScene extends Phaser.Scene {
    constructor() {
        console.log("Start")
        super({ key: 'StartScene' });
    }
    
    preload() {

        this.loadingText = this.add.text(30, 30, 'Loading game...').setFontFamily('Arial').setFontSize(32).setColor('#ffffff');

        this.load.image('start', 'assets/start.png');
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
        
        this.loadingText.visible = false;

        this.music = this.sound.add('theme');

        this.startImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'start')

        this.startNormalGameButton = this.add.rectangle(370,640,380,70, "#ffffff", 0)
        this.startNormalGameButton.setInteractive();
        this.startNormalGameButton.on('pointerdown', () => {this.startGame(false)}, this);

        this.startHardGameButton = this.add.rectangle(370,740,380,70, "#ffffff", 0)
        this.startHardGameButton.setInteractive();
        this.startHardGameButton.on('pointerdown', () => {this.startGame(true) }, this);

        this.helpButton = this.add.rectangle(370,940,380,70, "#ffffff", 0)
        this.helpButton.setInteractive();
        this.helpButton.on('pointerdown', this.showHelp, this);

        this.helpImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2,'help')
        this.helpImage.visible = false;
        this.helpImage.setInteractive();
        this.helpImage.on('pointerdown', this.hideHelp, this);

        this.scene.get('ScoreScene').events.on('BackToMenu', this.backToMenu, this);
        this.scene.get('SeaScene').events.on('Endgame', this.endGame, this);

        this.scene.launch('SeaScene')
        this.scene.launch('ScoreScene')

        this.scene.get('ScoreScene').scene.sleep();
        this.scene.get('SeaScene').scene.sleep();
    }

    backToMenu() {
        this.scene.get('ScoreScene').scene.sleep();
        this.scene.setVisible(true);
    }

    showHelp() {
        this.helpImage.visible = true;
    }

    hideHelp() {
        this.helpImage.visible = false;
    }

    startGame(hardMode) {
        console.log("starting game")
        this.music.volume = 1;
        this.music.play();

        this.scene.get('SeaScene').setMode(hardMode);

        this.scene.pause();
        this.scene.setVisible(false);

        this.scene.bringToTop('SeaScene')
        this.scene.get('SeaScene').restart();
        this.scene.get('ScoreScene').restart();
        this.scene.get('SeaScene').scene.wake();
    }

    endGame() {
        
        this.scene.resume();

        this.tweens.add({
            targets:  this.music,
            volume:   0,
            duration: 2500,
            repeat: 0,
            yoyo: false
        });

        this.scene.get('SeaScene').scene.sleep();
        this.scene.get('ScoreScene').scene.wake();

    }
}
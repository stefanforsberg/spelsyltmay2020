class ScoreScene extends Phaser.Scene {
    constructor() {
        console.log("ScoreScene")
        super({ key: 'ScoreScene' });
    }

    init() {
        console.log('Score scene init')
        this.scene.get('SeaScene').events.on('EatFish', () => this.fishEaten+=1, this);
        this.scene.get('SeaScene').events.on('FetchWood', () => this.woodCollected+=1, this);

        this.scene.get('SeaScene').events.on('Endgame', this.updateScore, this);

        var text = this.add.text(30, 800, 'Start game').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');
        text.setInteractive();
        text.on('pointerdown', ()=> { this.events.emit('StartGame')}, this);

        this.fishScore = this.add.text(30, 30, 'Score').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        this.woodScore = this.add.text(30, 60, 'Score').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        

    }
    
    create() {
        
    }

    restart() {
        this.fishEaten = 0;
        this.woodCollected = 0;
    }

    updateScore() {
        this.fishScore.setText("Fish eaten: " + this.fishEaten);
        this.woodScore.setText("Wood collected: " + this.woodCollected);
    }
}
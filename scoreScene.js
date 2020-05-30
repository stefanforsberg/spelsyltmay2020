class ScoreScene extends Phaser.Scene {
    constructor() {
        console.log("ScoreScene")
        super({ key: 'ScoreScene' });
    }

    init() {
        console.log('Score scene init')
        this.seaScene = this.scene.get('SeaScene');
        this.seaScene.events.on('EatFish', () => this.fishEaten+=1, this);
        this.seaScene.events.on('FetchWood', () => this.woodCollected+=1, this);

        this.seaScene.events.on('Endgame', this.updateScore, this);

        var text = this.add.text(30, 800, 'Start game').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');
        text.setInteractive();
        text.on('pointerdown', ()=> { this.events.emit('StartGame')}, this);

        this.playerScore = this.add.text(30, 30, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');

        this.fishScore = this.add.text(30, 100, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');

        this.woodScore = this.add.text(30, 140, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');

        this.childScoreText1 = this.add.text(30, 200, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');
        this.childScoreText2 = this.add.text(30, 250, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');
        this.childScoreText3 = this.add.text(30, 300, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');
        this.childScoreText4 = this.add.text(30, 350, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');

        this.totalScoreText = this.add.text(30, 600, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#ffff00');

    }
    
    create() {
        
    }

    restart() {
        this.fishEaten = 0;
        this.woodCollected = 0;
        
    }

    updateScore(endgameState) {

        console.log(this.seaScene.currentWeatherScene.sys.config.key);

        this.totalScore = 0;

        if(endgameState && endgameState.death) {
            this.playerScore.setText("You were lost at sea (0)")
        } else {
            this.totalScore += 50;
            this.playerScore.setText("You survived to shore (50)")
        }

        // if(this.seaScene.currentWeatherScene.sys.config.key === "DayScene") {

        // }

        var childScoreTexts = [this.childScoreText1,this.childScoreText2,this.childScoreText3,this.childScoreText4];

        for(var i = 0; i<childScoreTexts.length; i++) {
            var childScore = this.getScoreForChild(this.seaScene.childrenRafts[i].getState());
            childScoreTexts[i].setText(`${childScore.text} (${childScore.score})`);    
            this.totalScore += childScore.score;
        }

        var fishScore = Math.floor(this.fishEaten / 2);
        this.fishScore.setText(`Fish eaten: ${this.fishEaten} (${fishScore})`);
        this.totalScore+= fishScore;

        this.woodScore.setText(`Wood collected: ${this.woodCollected} (${this.woodCollected})`);
        this.totalScore+= this.woodCollected;

        this.totalScoreText.setText("Total score: " + this.totalScore) 
    }

    getScoreForChild(childState) {
        
        if(!childState.isBuilt) {
            return {score: 0, text: `Didn't build raft for ${childState.name}`}
        } else {
            if(!childState.hasChild) {
                return {score: 10, text: `Built raft for ${childState.name} but didn't save them`}
            } else {
                if(!childState.isChildAlive) {
                    return {score: 20, text: `Built raft for ${childState.name} but couldn't keep them safe`}
                } else {
                    return {score: 30, text: `You saved ${childState.name}`}
                }
            }
        }

    }
}
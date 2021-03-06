class ScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ScoreScene' });
    }

    init() {
        this.seaScene = this.scene.get('SeaScene');
        this.seaScene.events.on('EatFish', () => this.fishEaten+=1, this);
        this.seaScene.events.on('FetchWood', () => this.woodCollected+=1, this);

        this.seaScene.events.on('Endgame', this.updateScore, this);

        var text = this.add.text(30, 800, 'Back to menu').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');
        text.setInteractive();
        text.on('pointerdown', ()=> { this.events.emit('BackToMenu')}, this);

        this.playerScore = this.add.text(30, 30, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');

        this.fishScore = this.add.text(30, 100, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');

        this.woodScore = this.add.text(30, 140, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');

        this.childScoreText1 = this.add.text(30, 200, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');
        this.childScoreText2 = this.add.text(30, 250, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');
        this.childScoreText3 = this.add.text(30, 300, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');
        this.childScoreText4 = this.add.text(30, 350, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');

        this.difficultiScoreText = this.add.text(30, 400, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');

        this.totalScoreText = this.add.text(30, 600, 'Score').setFontFamily('Arial').setFontSize(28).setColor('#2B4C54');

    }
    
    create() {
        
    }

    restart() {
        this.fishEaten = 0;
        this.woodCollected = 0;
        
    }

    updateScore(endgameState) {
        this.totalScore = 0;

        if(endgameState && endgameState.death) {
            this.playerScore.setText("You were lost at sea: 0 points")
        } else {
            this.totalScore += 50;
            this.playerScore.setText("You survived to shore: 50 points")
        }

        var childScoreTexts = [this.childScoreText1,this.childScoreText2,this.childScoreText3,this.childScoreText4];

        for(var i = 0; i<childScoreTexts.length; i++) {
            var childScore = this.getScoreForChild(this.seaScene.childrenRafts[i].getState());
            childScoreTexts[i].setText(`${childScore.text}: ${childScore.score} points`);    
            this.totalScore += childScore.score;
        }

        var fishScore = Math.floor(this.fishEaten / 2);
        this.fishScore.setText(`Fish eaten: ${this.fishEaten} (${fishScore} points)`);
        this.totalScore+= fishScore;

        this.woodScore.setText(`Wood collected: ${this.woodCollected} (${this.woodCollected} points)`);
        this.totalScore+= this.woodCollected;

        var difficultiScore = Math.floor(this.totalScore*this.seaScene.gameState.current.scoreMultiplier - this.totalScore);
        this.difficultiScoreText.setText("Difficulty bonus: " + difficultiScore + " points");

        this.totalScore+=difficultiScore;

        this.totalScoreText.setText("Total score: " + this.totalScore) 
    }

    getScoreForChild(childState) {
        
        if(!childState.isBuilt) {
            return {score: 0, text: `No raft for ${childState.name}`}
        } else {
            if(!childState.hasChild) {
                return {score: 10, text: `Built raft for ${childState.name} but didn't rescue`}
            } else {
                if(!childState.isChildAlive) {
                    return {score: 20, text: `Built raft for ${childState.name} but they died`}
                } else {
                    return {score: 30, text: `You saved ${childState.name}`}
                }
            }
        }

    }
}
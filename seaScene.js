class SeaScene extends Phaser.Scene {
    constructor(e) {
        console.log("sea")
        super({ key: 'SeaScene' });
    }
    
    preload() {
        this.load.image('fish', 'assets/fish.png');
        this.load.image('player', 'assets/player.png');
    }

    create() {
        console.log("create")

        var graphics = this.add.graphics();

        graphics.fillStyle(0x429cbd, 1);
        graphics.fillRect(0, 0, 750, 1334);

        this.player = new Player(this);

        this.fish = new Fish(this, 50, 50, 'fish');

        this.fish2 = new Fish(this, 600, 0, 'fish');

        this.fishEaten = 0;

        this.events.on("EatFish", () => { this.fishEaten = this.fishEaten + 1;}, this);

        this.fishEatenText = this.add.text(30, 30, '0').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');


    
        
    

    }

    update() {

        this.player.update();

        this.fishEatenText.setText(this.fishEaten)
        
        var playerBounds = [this.player];        

        this.fish.update(playerBounds);
        this.fish2.update(playerBounds);


    }

}
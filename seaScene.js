class SeaScene extends Phaser.Scene {
    constructor(e) {
        console.log("sea")
        super({ key: 'SeaScene' });
    }
    
    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('wood', 'assets/wood.png');
        this.load.image('repairRaft', 'assets/repairRaft.png');
        this.load.image('player', 'assets/player.png');
    }

    create() {
        console.log("create")

        this.bg1 = this.add.sprite(400,700,'bg');
        this.bg2 = this.add.sprite(400,700-1400,'bg');

        // this.tweens.add({
        //     targets: bg,
        //     x: 440,
        //     ease: 'Sine.InOut',
        //     duration: 10000,
        //     yoyo: true,
        //     repeat: -1
        // });

        // this.tweens.add({
        //     targets: bg,
        //     angle: 5,
        //     ease: 'Sine.InOut',
        //     duration: 5000,
        //     yoyo: true,
        //     repeat: -1
        // });

        this.tweens.add({
            targets: [ this.bg1, this.bg2 ],
            props: {
                x: { value: '+=40', duration: 10000, ease: 'Sine.InOut' },
                angle: { value: '+=5', duration: 15000, ease: 'Sine.InOut' }
            },
            yoyo: true,
            repeat: -1
        });

        // var graphics = this.add.graphics();

        // graphics.fillStyle(0x429cbd, 1);
        // graphics.fillRect(0, 0, 750, 1334);

        this.player = new Player(this);

        

        this.fish = new Fish(this, 50, 50, 'fish');

        this.fish2 = new Fish(this, 600, 0, 'fish');

        this.wood = new Wood(this, 600, 0, 'wood');

        this.crafting = new Crafting(this);

        this.fishEaten = 0;

        this.events.on("EatFish", () => { this.fishEaten = this.fishEaten + 1;}, this);

        this.fishEatenText = this.add.text(30, 30, '0').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');


    
        
    

    }

    update() {

        this.bg1.y+=0.5;
        

        if(this.bg1.y > 700+1300) {
            console.log("moving 1")
            this.bg1.y = -700
        }

        this.bg2.y+=0.5;

        if(this.bg2.y > 700+1300) {
            console.log("moving 2")
            this.bg2.y = -700
        }

        

        this.player.update();

        this.fishEatenText.setText(this.fishEaten)
        
        var playerBounds = [this.player];        

        this.fish.update(playerBounds);
        this.fish2.update(playerBounds);

        this.wood.update(this.player);


    }

}
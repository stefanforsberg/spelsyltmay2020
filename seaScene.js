class SeaScene extends Phaser.Scene {
    constructor(e) {
        console.log("sea")
        super({ key: 'SeaScene' });
    }

    preload() {
        console.log("preloading")
    }

    create() {
        console.log("create")

        this.events.on('Endgame', this.endGame, this);

        this.isStarted = false;

        this.crafting = new Crafting(this);
    }

    restart() {
        this.bg1 = this.add.sprite(400,700,'bg');
        this.bg2 = this.add.sprite(400,700-1400,'bg');

        this.tweens.add({
            targets: [ this.bg1, this.bg2 ],
            props: {
                x: { value: '+=40', duration: 10000, ease: 'Sine.InOut' },
                angle: { value: '+=5', duration: 15000, ease: 'Sine.InOut' }
            },
            yoyo: true,
            repeat: -1
        });

        this.currentWeatherScene = null;

        this.childrenRafts = []

        this.raftRopes = this.add.graphics();

        this.player = new Player(this);

        this.children = [];

        this.fish = new Fish(this, 50, 50, 'fish');

        this.fish2 = new Fish(this, 600, 0, 'fish');

        this.wood = new Wood(this, 600, 0, 'wood');

        this.addRafts();

        this.switchToDay();

        this.crafting.restart();

        this.crafting.depth = 1000
        
        console.log("finished restart");
    }

    endGame() {
        this.children.forEach(c => c.destroy());
        this.player.destroy();
        this.currentWeatherScene.scene.stop();
        this.cameras.main.resetFX();
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

        var playerBounds = [this.player, ...this.childrenRafts.filter(c => c.canChildEat())];        

        this.fish.update(playerBounds);
        this.fish2.update(playerBounds);

        this.wood.update(this.player);

        this.childrenRafts.forEach(r => r.update(this.children, this.player))

        this.children.forEach(c => c.update())

        this.crafting.update();

        this.currentWeatherScene.update();
    }

    addRafts() {
        this.childrenRafts.push(
            new ChildRaft(this, 310, 1150, 1),
            new ChildRaft(this, 490, 1150, 2),
            new ChildRaft(this, 630, 1030, 3),
            new ChildRaft(this, 180, 1030, 4)
        );
    }

    

    shake() {
        console.log("shak")
        this.cameras.main.shake(300);
    }

    addChild() {
        var child = new Child(this, 0, 0, 'child');
        this.children.push(child);
    }

    switchToDay() {
        
        this.scene.launch('DayScene')
        this.scene.bringToTop('DayScene')
        this.currentWeatherScene = this.scene.get('DayScene');
    }

    switchToNight() {
        this.scene.stop('DayScene')
        this.scene.launch('NightScene')
        this.scene.bringToTop('NightScene')
        this.currentWeatherScene = this.scene.get('NightScene');
    }

    switchToStorm() {
        this.scene.stop('NightScene')
        this.scene.launch('StormScene')
        this.scene.bringToTop('StormScene')
        
        this.currentWeatherScene = this.scene.get('StormScene');
        this.player.activateStormScene();
    }

    switchToShore() {
        this.scene.stop('StormScene')
        this.scene.launch('ShoreScene')
        this.scene.bringToTop('ShoreScene')

        this.tweens.add({
            targets: [ this.fish, this.fish2, this.wood ],
            props: {
                alpha: { value: 0, duration: 5000 },
            },
            yoyo: false,
            repeat: 0,
            onComplete: function () { this.scene.pause() },
            onCompleteScope: this,
            
        });
        
        this.currentWeatherScene = this.scene.get('ShoreScene');
    }
}
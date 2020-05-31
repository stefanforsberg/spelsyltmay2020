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

        this.music = this.sound.add('theme');
        this.seaSound = this.sound.add('sea', {loop: true, volume: 0.5});

        this.rainSound = this.sound.add('rain', {loop: true, volume: 0.3});

        this.thunderSound = this.sound.add('thunder', {loop: false, volume: 0.5});

        this.crafting = new Crafting(this);

        this.gameState = {
            normal: {
                poisonFishChange: 0.2,
                woodAmount: 5,
                childRaftLifeDecrease: 0.02,
                childLifeDecrease: 0.01,
                playerRaftLifeDecrease: 0.03,
                playerLifeDecrease: 0.03,
                repairRaftAmount: 30,
                scoreMultiplier: 1
            },
            hard: {
                poisonFishChange: 0.4,
                woodAmount: 3,
                childRaftLifeDecrease: 0.05,
                childLifeDecrease: 0.03,
                playerRaftLifeDecrease: 0.05,
                playerLifeDecrease: 0.05,
                repairRaftAmount: 20,
                scoreMultiplier: 1.4
            }
        }

        this.gameState.current = this.gameState.normal;
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

        this.music.play();
        this.seaSound.play();
        
        console.log("finished restart");
    }

    endGame() {
        this.music.stop();
        this.seaSound.stop();
        this.thunderSound.stop();
        this.rainSound.stop();

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

        this.tweens.add({
            targets: this.music,
            props: {
                volume: { value: 0.8, duration: 5000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.tweens.add({
            targets: this.seaSound,
            props: {
                volume: { value: 0.3, duration: 5000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.scene.stop('DayScene')
        this.scene.launch('NightScene')
        this.scene.bringToTop('NightScene')
        this.currentWeatherScene = this.scene.get('NightScene');
    }

    switchToStorm() {

        this.rainSound.play();
        this.seaSound.stop();

        this.tweens.add({
            targets: this.music,
            props: {
                volume: { value: 1, duration: 5000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.rain

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
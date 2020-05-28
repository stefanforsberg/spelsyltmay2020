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

        this.events.on("AddRaft", this.addRaft, this);

        this.events.on('Endgame', this.endGame, this);

        this.isStarted = false;
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

        this.crafting = new Crafting(this);

        this.fish = new Fish(this, 50, 50, 'fish');

        this.fish2 = new Fish(this, 600, 0, 'fish');

        this.wood = new Wood(this, 600, 0, 'wood');

        this.switchToDay();
        
        console.log("finished restart");
    }

    endGame() {
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

        this.wood.update([this.player, ...this.childrenRafts]);

        this.childrenRafts.forEach(r => r.update(this.children, this.player))

        this.children.forEach(c => c.update())

        this.crafting.update();

        this.currentWeatherScene.update();

        this.updateRaftRopes();
    }

    updateRaftRopes() {

        // if(this.childrenRafts.length > 0) {

        //     var playerBounds = this.player.getBounds();

        //     this.raftRopes.clear();

        //     this.raftRopes.lineStyle(5, 0xF3F3F3);

        //     this.childrenRafts.forEach(r => {
        //         this.raftRopes.beginPath();
        
        //         this.raftRopes.moveTo(playerBounds.x+playerBounds.width/2, playerBounds.y+playerBounds.height-20);
        //         this.raftRopes.lineTo(r.x, r.y+20);
            
        //         this.raftRopes.closePath();
        //         this.raftRopes.strokePath();
        //     });
        // }
    }

    addRaft() {
        switch(this.childrenRafts.length) {
            case 0:
                var childrenRaft = new ChildRaft(this, 310, 1150, 1)
                this.childrenRafts.push(childrenRaft);
                break;
            case 1:
                var childrenRaft = new ChildRaft(this, 490, 1150, 1)
                this.childrenRafts.push(childrenRaft);
                break;
        }
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
}
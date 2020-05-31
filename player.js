class Player extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, 0);

        this.scene = scene;

        this.name = "Player"

        this.depth = 20;

        this.addRaftWaves();

        this.life = 0;

        this.player = this.scene.add.image(400, 800, 'player');

        this.player.setInteractive();

        this.player.on('pointerdown', () => {
            scene.events.emit("RepairRaftRequest", this);
        }, this);

        this.playerLife = this.scene.add.graphics();

        this.raftLife = 180;
        this.raftLifeGraphics = this.scene.add.graphics();
        
        this.add(this.player);
        this.add(this.playerLife);
        this.add(this.raftLifeGraphics)
        
        scene.add.existing(this);

        this.angle = -1;
        this.x-= 10;
        this.y+= 10;

        this.raftTween = scene.tweens.add({
            targets: [ this ],
            props: {
                x: { value: '+=10', duration: 5000, ease: 'Sine.InOut' },
                y: { value: '-=10', duration: 7000, ease: 'Sine.InOut' },
                angle: { value: 1, duration: 10000, ease: 'Sine.InOut' },
            },
            yoyo: true,
            repeat: -1,
            
        });

        scene.events.on("RepairRaft", this.repairRaft, this);
    }

    addRaftWaves() {
        for(var i = 0; i < 5; i++) {
            let raftWave = this.scene.add.ellipse(400, 800, 100, 150, 0xFFFFFF, 0);
            raftWave.setStrokeStyle(5, 0xFFFFFF, 0.3);

            this.add(raftWave)

            this.scene.tweens.add({
                targets: [ raftWave ],
                props: {
                    displayWidth : { value: "+=200", duration: 7000, ease: 'Sine.InOut' },
                    displayHeight: { value: "+=220", duration: 7000, ease: 'Sine.InOut' },
                    alpha: { from: 1, to: 0.1, duration: 7000, ease: 'Sine.InOut' },
                    y: { value: "+=50", duration: 7000, ease: 'Normal' },
                },
                repeat: -1,
                delay: 1300*i
            });
        }
    }


    getBounds() {
        return this.player.getBounds()
    }

    eat(eatValue) {
        console.log("eat")
        this.life -= eatValue;

        if(this.life < 0) {
            this.life = 0;
        }
    }

    fetchWood() {
        console.log("wood")
        this.wood += 20;
    }

    sharkBite() {
        this.raftLife -= 20;
    }

    repairRaft() {
        this.raftLife += this.scene.gameState.current.repairRaftAmount;

        if(this.raftLife > 180) {
            this.raftLife = 180;
        }
    }

    update() {
        if(this.life < 180) {
            this.life = this.life + this.scene.gameState.current.playerLifeDecrease;
        }

        if(this.life >= 180) {
            this.scene.events.emit("Endgame", {death: true});
        }

        this.playerLife.clear();

        this.playerLife.lineStyle(1, 0x1D5608, 3);
        this.playerLife.strokeRect(330, 697, 140, 17);

        this.playerLife.fillStyle(0x1D5608, 0.4);
        this.playerLife.fillRect(330, 697, 140, 17);

        this.playerLife.fillStyle(0x5AFF19, 1);
        this.playerLife.fillRect(330, 697, ((180-this.life)/180)*140, 17);

        this.playerLife.strokeRect(330, 697, ((180-this.life)/180)*140, 17);

        this.updateRaft();
    }

    updateRaft() {

        if(!this.active) {
            return;
        }

        if(this.raftLife > 0) {
            this.raftLife -= this.scene.gameState.current.playerRaftLifeDecrease;
        }
        
        if(this.raftLife <= 0) {
            this.scene.events.emit("Endgame", {death: true});
        }

        this.raftLifeGraphics.clear();

        this.raftLifeGraphics.lineStyle(1, 0x3B2A20, 3);
        this.raftLifeGraphics.strokeRect(305, 930, 180, 17);

        this.raftLifeGraphics.fillStyle(0x3B2A20, 0.4);
        this.raftLifeGraphics.fillRect(305, 930, 180, 17);

        this.raftLifeGraphics.fillStyle(0xC69669, 1);
        this.raftLifeGraphics.fillRect(305, 930, this.raftLife, 17);

        this.raftLifeGraphics.strokeRect(305, 930, this.raftLife, 17);
    }

    activateStormScene() {
        this.raftTween.remove()
        this.raftTween = this.scene.tweens.add({
            targets: [ this ],
            props: {
                x: { value: '+=180', duration: 4000, ease: 'Sine.InOut' },
                y: { value: '-=80', duration: 5000, ease: 'Sine.InOut' },
                angle: { value: 5, duration: 5000, ease: 'Sine.InOut' }
            },
            yoyo: true,
            repeat: -1,
            
        });
    }
}
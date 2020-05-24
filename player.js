class Player extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, 0);

        this.scene = scene;

        this.name = "Player"

        this.addRaftWaves();

        this.life = 0;

        this.player = this.scene.add.image(400, 800, 'player');

        this.playerLife = this.scene.add.graphics();

        this.raftLife = 180;
        this.raftLifeGraphics = this.scene.add.graphics();

        
        
        this.add(this.player);
        this.add(this.playerLife);
        this.add(this.raftLifeGraphics)
        


        scene.add.existing(this);

        scene.tweens.add({
            targets: [ this ],
            props: {
                x: { value: `+=${Phaser.Math.Between(-10, 10)}`, duration: 5000, ease: 'Sine.InOut' },
                y: { value: `+=${Phaser.Math.Between(-10, 10)}`, duration: 5000, ease: 'Sine.InOut' },
                angle: { value: `+=${Phaser.Math.Between(-5, 5)}`, duration: 15000, ease: 'Sine.InOut' }
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

    repairRaft() {
        this.raftLife += 20;

        if(this.raftLife > 180) {
            this.raftLife = 180;
        }
    }

    update() {
        if(this.life < 180) {
            // this.life = this.life + 0.5;
            this.life = this.life + 0.05;

        }

        if(this.life >= 180) {
            this.scene.events.emit("Endgame");
        }

        if(this.raftLife > 0) {
            this.raftLife -= 0.05;
        }
        

        this.playerLife.clear();

        this.playerLife.lineStyle(10, 0xffffff);
        this.playerLife.beginPath();
        this.playerLife.arc(400, 800, 40, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(360-this.life), false, 0.02);
        this.playerLife.strokePath();
        this.playerLife.closePath();

        this.updateRaft();


    }

    updateRaft() {
        this.raftLifeGraphics.clear();

        this.raftLifeGraphics.fillStyle(0x0000ff, 1);
        this.raftLifeGraphics.fillRect(310, 930, this.raftLife, 20);
    }
}
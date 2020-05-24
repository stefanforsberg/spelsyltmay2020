class Player extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, 0);

        this.name = "Player"

        this.player = this.scene.add.image(400, 800, 'player');

        this.playerLife = this.scene.add.graphics();

        this.raftLife = 180;
        this.raftLifeGraphics = this.scene.add.graphics();
        
        this.life = 0;

        this.add(this.player);
        this.add(this.playerLife);

        this.scene = scene;

        scene.add.existing(this);

        scene.events.on("RepairRaft", this.repairRaft, this);
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
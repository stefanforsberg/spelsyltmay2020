class Crafting extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, scene.cameras.main.height-80);

        this.scene = scene;

        this.name = "Crafting"

        var background = scene.add.graphics();

        background.fillStyle(0x3B6672, 1);
        background.fillRect(0, 0, scene.cameras.main.width, 80);

        this.woodText = scene.add.text(100, 15, '0').setFontFamily('Arial').setFontSize(48).setColor('#ffffff');

        var woodImage = scene.add.sprite(45, 40, 'wood')

        this.add(background);
        this.add(this.woodText);
        this.add(woodImage);

        scene.add.existing(this);

        scene.events.on("FetchWood", this.fetchWood, this);

        scene.events.on("RepairRaftRequest", this.repairRaft, this);

        scene.events.on("BuildRaftRequest", this.buildRaft, this);
        
    }

    restart() {
        this.wood = 0;
    }

    buildRaft(e) {
        if(this.wood >= 1) {
            this.wood-=1;
            e.build();
        }
    }

    repairRaft(e) {
        if(this.wood >=1) {
            this.wood-=1;
            e.repairRaft();
        }
    }

    fetchWood() {
        this.wood+= this.scene.gameState.current.woodAmount;
    }

    update() {
        if(!this.active) {
            return;
        }
        
        this.woodText.setText(this.wood);
    }
}
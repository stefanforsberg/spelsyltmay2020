class Crafting extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, scene.cameras.main.height-80);

        this.scene = scene;

        this.name = "Crafting"

        var background = scene.add.graphics();

        background.fillStyle(0xff00ff, 1);
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
        console.log("build: " + this.wood)
        if(this.wood >=5) {
            this.wood-=5;
            e.build();
        }
    }

    repairRaft(e) {
        console.log("repair: " + this.wood)
        if(this.wood >=1) {
            console.log("repair with wood")
            this.wood-=1;
            e.repairRaft();
        }
    }

    fetchWood() {
        this.wood+=1;
    }

    update() {
        if(!this.active) {
            return;
        }
        
        this.woodText.setText(this.wood);
    }
}
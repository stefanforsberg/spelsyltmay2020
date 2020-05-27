class Crafting extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, scene.cameras.main.height-80);

        this.scene = scene;

        this.name = "Crafting"

        var background = scene.add.graphics();

        background.fillStyle(0xff00ff, 0.4);
        background.fillRect(0, 0, scene.cameras.main.width, 80);

        this.woodText = scene.add.text(10, 10, '0').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        var repairPlayerRaft = scene.add.sprite(130, 40, 'repairRaft');
        repairPlayerRaft.setInteractive();
        repairPlayerRaft.on('pointerdown', this.repairRaft, this);

        var addRaft = scene.add.sprite(230, 40, 'addRaft');
        addRaft.setInteractive();
        addRaft.on('pointerdown', this.addRaft, this);

        this.add(background);
        this.add(repairPlayerRaft);
        this.add(addRaft);
        this.add(this.woodText);

        scene.add.existing(this);

        this.wood = 0;

        scene.events.on("FetchWood", this.fetchWood, this);
    }

    addRaft() {
        console.log("add: " + this.wood)

        this.scene.events.emit("AddRaft");
    }

    repairRaft() {
        console.log("repair: " + this.wood)
        if(this.wood >=20) {
            console.log("repair with woof")
            this.wood-=20;
            this.scene.events.emit("RepairRaft");
        }
    }

    fetchWood() {
        this.wood+=20;
        

    }

    update() {
        this.woodText.setText(this.wood);
    }

    
}
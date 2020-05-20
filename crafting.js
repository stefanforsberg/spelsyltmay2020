class Crafting extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, scene.cameras.main.height-80);

        this.name = "Crafting"

        var background = scene.add.graphics();

        background.fillStyle(0xff00ff, 0.4);
        background.fillRect(0, 0, scene.cameras.main.width, 80);

        this.woodText = scene.add.text(10, 10, '0').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        var repairPlayerRaft = scene.add.sprite(130, 40, 'repairRaft');

        repairPlayerRaft.setInteractive();

        repairPlayerRaft.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
    
        });

        this.add(background);
        this.add(repairPlayerRaft);
        this.add(this.woodText);


        scene.add.existing(this);

        this.wood = 0;

        scene.events.on("FetchWood", this.fetchWood, this);
    }

    fetchWood() {
        this.wood+=20;
        this.woodText.setText(this.wood);

    }

    update() {

    }

    
}
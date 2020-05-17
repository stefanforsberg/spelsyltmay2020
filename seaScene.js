class SeaScene extends Phaser.Scene {
    constructor(e) {
        console.log("sea")
        super({ key: 'SeaScene' });
    }
    
    preload() {
        this.load.image('fish', 'assets/fish.png');
    }

    create() {
        console.log("create")

        var graphics = this.add.graphics();

        graphics.fillStyle(0x429cbd, 1);
        graphics.fillRect(0, 0, 750, 1334);

        graphics.fillStyle(0xff0000, 0.5);
        graphics.fillRect(250, 450, 300, 500);

        this.fish = new Fish(this, 50, 50, 'fish');

        this.input.setDraggable(this.fish);

        this.fish2 = new Fish(this, 600, 0, 'fish');

        this.input.setDraggable(this.fish2);

    }

    update() {
        this.fish.update();
        this.fish2.update();
    }

}
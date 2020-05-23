class Child extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

        this.setInteractive();

        this.canMove = true;

        scene.input.setDraggable(this);

        this.on('dragstart', function (pointer) {
            this.canMove = false;
            this.setTint(Math.random() * 0xffffff);

        });

        this.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });

        this.on('dragend', function (pointer) {
            this.canMove = true;
            this.clearTint();
        });

        this.scene = scene;

        this.respawn();

        scene.add.existing(this);
    }

    canBePlacedOnRaft() {
        return this.canMove;
    }

    respawn() {
        this.x = Phaser.Math.Between(20, 700);
        this.y = Phaser.Math.Between(0, 30);
    }

    update(player) {

        if(this.canMove) {
            this.y += 1;
        }
    }   
}
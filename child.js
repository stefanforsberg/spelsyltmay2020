class Child extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

        this.setInteractive();

        this.canMove = true;

        this.setDepth(10);

        this.scene = scene;

        this.respawn();

        this.setTween()

        scene.input.setDraggable(this);

        this.on('dragstart', function (pointer) {
            this.canMove = false;
            this.tween.remove();
        });

        this.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', function (pointer) {
            this.canMove = true;
            this.setTween();
        });

        scene.add.existing(this);
    }

    setTween() {
        this.tween = this.scene.tweens.add({
            targets: this,
            props: {
                y: { value: `+=${Phaser.Math.Between(-20, 20)}`, ease: 'Sine.InOut' }
            },
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
    }

    canBePlacedOnRaft() {
        return this.canMove;
    }

    respawn() {
        this.x = -30;
        this.y = Phaser.Math.Between(50, 500);
    }

    update(player) {

        if(this.canMove) {
            this.angle+= 0.2;
            this.x += 0.5;
        }
    }   
}
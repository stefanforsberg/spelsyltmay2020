class Wood extends Phaser.GameObjects.Sprite {

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

        var particles = this.scene.add.particles('fishbubble');

        this.emitter = particles.createEmitter({
            speed: 4,
            frequency: 300,
            scale: { start: 0, end: 4 },
            alpha: { start: 1, end: 0 },
            blendMode: 'NORMAL'
        });

        this.emitter.startFollow(this, 0, 20);

        scene.add.existing(this);
    }

    respawn() {
        this.x = Phaser.Math.Between(20, 700);
        this.y = Phaser.Math.Between(-80, -50);
        this.angleSpeed = Phaser.Math.FloatBetween(0.1, 0.3);
    }

    update(player) {

        if(this.alpha <= 0.5) {
            this.emitter.setVisible(false);
        }

        this.angle+=+this.angleSpeed;

        if(this.canMove) {
            this.y += 1;

            if(this.y > 1400) {
                this.respawn();
            }
            
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), player.getBounds())) {
                player.fetchWood();
                this.scene.events.emit("FetchWood");
                this.respawn();
            }

            
        }
    }   
}
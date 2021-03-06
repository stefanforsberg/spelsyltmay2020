class Fish extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

        this.scene = scene;

        this.setInteractive();

        this.canMove = true;

        this.speed = 0;

        this.eatValue = 0;

        scene.input.setDraggable(this);

        this.on('dragstart', function (pointer) {
            this.tween.remove();
            this.canMove = false;
        });

        this.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', function (pointer) {
            this.canMove = true;
            this.setTween();
        });

        this.scene = scene;

        this.setTween();

        this.respawn();

        var particles = this.scene.add.particles('fishbubble');

        this.emitter = particles.createEmitter({
            speed: 60,
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: 'NORMAL'
        });

        this.emitter.startFollow(this, 0, 36);

        scene.add.existing(this);
    }

    setTween() {

        if(this.tween) {
            this.tween.remove();
        }

        this.tween = this.scene.tweens.add({
            targets: this,
            props: {
                x: { value: `+=30`, ease: 'Sine.InOut' },
            },
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
    }

    respawn() {
        this.x = Phaser.Math.Between(20, 700);
        this.y = Phaser.Math.Between(-150, -100);
        this.speed = Phaser.Math.FloatBetween(1,1.75);

        this.alpha = 1;

        if(Phaser.Math.FloatBetween(0,1) > (1-this.scene.gameState.current.poisonFishChange)) {
            this.setTexture('fishPoison');
            this.eatValue = -20;
        } else {
            this.setTexture('fish');
            this.eatValue = 20;
        }
    }

    update(players) {

        if(this.alpha <= 0.5) {
            this.emitter.setVisible(false)
        }

        if(this.canMove) {
            this.y += this.speed;

            if(this.y > 1400) {
                this.respawn();
            }

            players.forEach(pb => {
                if(Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), pb.getBounds())) {
                    pb.eat(this.eatValue);
                    this.scene.events.emit("EatFish");
                    this.respawn();
                }
            });
        }
    }   
}
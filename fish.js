class Fish extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

        this.scene = scene;

        console.log()

        this.setInteractive();

        this.canMove = true;

        this.speed = 0;

        this.eatValue = 0;

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

    respawn() {
        this.x = Phaser.Math.Between(20, 700);
        this.y = Phaser.Math.Between(0, 30);
        this.speed = Phaser.Math.FloatBetween(1,3);

        if(Phaser.Math.FloatBetween(0,1) > 0.8) {
            console.log("poison fish")
            this.setTexture('fishPoison');
            this.eatValue = -10;
        } else {
            console.log("normal fish")
            this.setTexture('fish');
            this.eatValue = 20;
        }
    }

    update(players) {

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
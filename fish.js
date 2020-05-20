class Fish extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

        this.scene = scene;

        console.log()

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

    respawn() {
        this.x = Phaser.Math.Between(20, 700);
        this.y = Phaser.Math.Between(0, 30);
    }

    update(players) {

        if(this.canMove) {
            this.y += 3;

            if(this.y > 1400) {
                this.respawn();
            }

            players.forEach(pb => {
                if(Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), pb.getBounds())) {
                    pb.eat();
                    this.scene.events.emit("EatFish");
                    this.respawn();
                }
            });
        }


        
        

        // // Horizontal movement
        // if (this.scene.cursors.left.isDown)
        // {
        //     this.flipX = true;
        //     this.body.setVelocityX(-80);
        // }
        // else if (this.scene.cursors.right.isDown)
        // {
        //     this.flipX = false;
        //     this.body.setVelocityX(80);
        // } else {
        //     this.body.setVelocityX(0);
        // }
        // // Vertical movement
        // if (this.scene.cursors.up.isDown)
        // {
        //     this.flipY = false;
        //     this.body.setVelocityY(-80);
        // }
        // else if (this.scene.cursors.down.isDown)
        // {
        //     this.flipY = true;
        //     this.body.setVelocityY(80);
        // }  

        // if (this.scene.cursors.left.isDown || this.scene.cursors.right.isDown) {
        //     this.anims.play('vertical', true);
        // } else if (this.scene.cursors.up.isDown || this.scene.cursors.down.isDown) {
        //     this.anims.play('horisontal', true);
        // } else {
        //     this.anims.stop();
        // }
    }   
}
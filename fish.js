class Fish extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

        this.scene = scene;

        console.log()

        // var emitter = scene.add.particles('fog').createEmitter({
        //     speed: 10,
        //     lifespan: {
        //         onEmit: function (particle, key, t, value)
        //         {
        //             return Phaser.Math.Percent(player.body.speed, 0, 300) * 2000;
        //         }
        //     },
        //     alpha: {
        //         onEmit: function (particle, key, t, value)
        //         {
        //             return Phaser.Math.Percent(player.body.speed, 0, 100);
        //         }
        //     },
        //     scale: { start: 1, end: 3 },
        //     blendMode: 'ADD'
        // });

        // emitter.startFollow(this);

        
        
        // this.add.sprite(50, 50, 'fish');


        this.setInteractive();

        this.canMove = true;

        // this.on('pointerdown', function (pointer) {
        //     this.setTint(Math.random() * 0xffffff);
        // });

        // this.on('pointerout', function (pointer) {
        //     // this.clearTint();
        // });

        scene.input.setDraggable(this);

        this.on('dragstart', function (pointer) {
            this.canMove = false;
            this.setTint(Math.random() * 0xffffff);
            // this.setTint(0xff0000);

        });

        this.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });

        this.on('dragend', function (pointer) {
            this.canMove = true;
            this.clearTint();

        });
        

        this.respawn();

        scene.add.existing(this);

        // this.body.setVelocityY(50)

        // var graphics = this.add.graphics();

        // graphics.fillStyle(0xff0000, 1);
        // graphics.fillRect(0, 0, 100, 100);

        // this.body.setVelocityY(-80);

    }

    respawn() {
        this.x = Phaser.Math.Between(20, 700);
        this.y = Phaser.Math.Between(-90, -30);
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
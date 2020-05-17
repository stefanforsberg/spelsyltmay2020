class Fish extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key);

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

        this.on('pointerdown', function (pointer) {
            this.setTint(Math.random() * 0xffffff);
        });

        this.on('pointerout', function (pointer) {
            // this.clearTint();
        });
        

        scene.add.existing(this);

        // this.body.setVelocityY(50)

        // var graphics = this.add.graphics();

        // graphics.fillStyle(0xff0000, 1);
        // graphics.fillRect(0, 0, 100, 100);

        // this.body.setVelocityY(-80);

    }

    update() {

        console.log("update")

        this.y += 3;

        if(this.y > 1400) {
            this.y = -100
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
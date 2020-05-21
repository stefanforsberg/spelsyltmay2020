class ChildRaft extends Phaser.GameObjects.Container {
    constructor(scene, x, y, i) {

        super(scene, x, y);

        this.name = "ChildRaft" + i;

        this.raft = this.scene.add.image(0, 0, 'childRaft');

        this.raftLife = 100;
        this.raftLifeGraphics = this.scene.add.graphics();
        
        this.add(this.raft);
        this.add(this.raftLifeGraphics);

        scene.add.existing(this);

        scene.tweens.add({
            targets: [ this ],
            props: {
                x: { value: `+=${Phaser.Math.Between(-10, 10)}`, duration: 5000, ease: 'Sine.InOut' },
                y: { value: `+=${Phaser.Math.Between(-10, 10)}`, duration: 5000, ease: 'Sine.InOut' },
                angle: { value: `+=${Phaser.Math.Between(-5, 5)}`, duration: 15000, ease: 'Sine.InOut' }
            },
            yoyo: true,
            repeat: -1
        });

        // scene.events.on("RepairRaft", this.repairRaft, this);
    }

    // getBounds() {
    //     return this.player.getBounds()
    // }

    // eat() {
    //     console.log("eat")
    //     this.life -= 40;

    //     if(this.life < 0) {
    //         this.life = 0;
    //     }
    // }

    // fetchWood() {
    //     console.log("wood")
    //     this.wood += 20;
    // }

    // repairRaft() {
    //     this.raftLife += 20;

    //     if(this.raftLife > 180) {
    //         this.raftLife = 180;
    //     }
    // }

    update() {
        // if(this.life < 180) {
        //     this.life = this.life + 0.05;
        // }

        if(this.raftLife > 0) {
            this.raftLife -= 0.05;
        }
        

        // this.playerLife.clear();

        // this.playerLife.lineStyle(10, 0xffffff);
        // this.playerLife.beginPath();
        // this.playerLife.arc(400, 800, 40, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(360-this.life), false, 0.02);
        // this.playerLife.strokePath();
        // this.playerLife.closePath();

        this.updateRaft();


    }

    updateRaft() {
        this.raftLifeGraphics.clear();

        this.raftLifeGraphics.fillStyle(0x0000ff, 1);
        this.raftLifeGraphics.fillRect(-50, 50, this.raftLife, 10);
    }
}

// class Player extends Phaser.GameObjects.Sprite {

//     constructor(scene, x, y, key) {
//         super(scene, x, y, key);

//         scene.add.existing(this);

//         // this.body.setVelocityY(50)

//         // var graphics = this.add.graphics();

//         // graphics.fillStyle(0xff0000, 1);
//         // graphics.fillRect(0, 0, 100, 100);

//         // this.body.setVelocityY(-80);

//     }

//     update() {

//         // if(this.canMove) {
//         //     this.y += 3;

//         //     if(this.y > 1400) {
//         //         this.y = -100
//         //     }
//         // }
        

//         // // Horizontal movement
//         // if (this.scene.cursors.left.isDown)
//         // {
//         //     this.flipX = true;
//         //     this.body.setVelocityX(-80);
//         // }
//         // else if (this.scene.cursors.right.isDown)
//         // {
//         //     this.flipX = false;
//         //     this.body.setVelocityX(80);
//         // } else {
//         //     this.body.setVelocityX(0);
//         // }
//         // // Vertical movement
//         // if (this.scene.cursors.up.isDown)
//         // {
//         //     this.flipY = false;
//         //     this.body.setVelocityY(-80);
//         // }
//         // else if (this.scene.cursors.down.isDown)
//         // {
//         //     this.flipY = true;
//         //     this.body.setVelocityY(80);
//         // }  

//         // if (this.scene.cursors.left.isDown || this.scene.cursors.right.isDown) {
//         //     this.anims.play('vertical', true);
//         // } else if (this.scene.cursors.up.isDown || this.scene.cursors.down.isDown) {
//         //     this.anims.play('horisontal', true);
//         // } else {
//         //     this.anims.stop();
//         // }
//     }   
// }
class Player extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, 0);

        this.name = "Player"

        this.player = this.scene.add.image(400, 800, 'player');

        this.playerLife = this.scene.add.graphics();
        
        this.playerLifeLife = 0;
    }

    getBounds() {
        return this.player.getBounds()
    }

    eat() {
        this.playerLifeLife -= 40;

        if(this.playerLifeLife < 0) {
            this.playerLifeLife = 0;
        }
    }

    update() {
        if(this.playerLifeLife < 180) {
            this.playerLifeLife = this.playerLifeLife + 0.3;
        }
        

        this.playerLife.clear();

        this.playerLife.lineStyle(10, 0xffffff);
        this.playerLife.beginPath();
        this.playerLife.arc(400, 800, 40, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(360-this.playerLifeLife), false, 0.02);
        this.playerLife.strokePath();
        this.playerLife.closePath();
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
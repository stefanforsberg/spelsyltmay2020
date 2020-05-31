class NightScene extends Phaser.Scene {
    constructor() {
        console.log("NightScene")
        super({ key: 'NightScene' });
    }

    init() {
        console.log("Init Night")

        this.sky = this.add.rectangle(this.cameras.main.width/2, ((this.cameras.main.height-80)/2), this.cameras.main.width, this.cameras.main.height-80, 0x000000);
        this.sky.alpha = 0.7;
        this.sky.setDepth(100);
    }
    
    create() {

        console.log("Create Night")

        this.seaScene = this.scene.get('SeaScene');

        this.player = this.seaScene.player;

        this.time.delayedCall(20000, this.daybreak, [], this);

        this.sharks = [];

        this.time.delayedCall(5000, this.addShark, [], this);
        this.time.delayedCall(15000, this.addShark, [], this);
        this.time.delayedCall(20000, this.addShark, [], this);
        this.time.delayedCall(30000, this.addShark, [], this);
        this.time.delayedCall(35000, this.addShark, [], this);
        this.time.delayedCall(40000, this.addShark, [], this);

        this.time.delayedCall(30000, this.seaScene.addChild, [], this.seaScene);
    }

    daybreak() {
        this.tweens.add({
            targets: [ this.sky ],
            props: {
                alpha : { value: 0, duration: 40000, ease: 'Power.Easein' }
            },
            repeat: 0,
            yoyo: false,
            onComplete: function () { this.scene.get('SeaScene').switchToStorm() },
            onCompleteScope: this,
        });
    }

    addShark() {
        var shark = this.add.image(Phaser.Math.Between(0, 750), -100, 'shark');

        this.sharks.push(shark)

        var angle = Phaser.Math.Angle.Between(shark.x, shark.y, 400, 900);

        shark.rotation = angle;

        shark.canHurt = true;

        var sharkTween = this.tweens.add({
            targets: [ shark ],
            props: {
                x : { value: 400, duration: 7000, ease: 'Cubic.In' },
                y : { value: 800, duration: 7000, ease: 'Cubic.In' }
            },
            repeat: 0,
            yoyo: false,
        });

        shark.setInteractive();

        shark.on('pointerdown', function() {

            shark.canHurt = false;

            var targetX = shark.x > 375 ? 850 : -100;
            var targetY = shark.y+300;

            var angle = Phaser.Math.Angle.Between(shark.x, shark.y, targetX, targetY);

            this.tweens.add({
                targets: [ shark ],
                props: {
                    x : { value: targetX , duration: 2000, ease: 'Normal' },
                    y : { value: targetY , duration: 2000, ease: 'Normal' },
                    scale : { value: 0.5 , duration: 2000, ease: 'Normal' },
                    alpha : { value: 0 , duration: 2000, ease: 'Normal' },
                    rotation : { value: angle , duration: 2000, ease: 'Cubic.Out' },
                },
                repeat: 0,
                yoyo: false,
            });
        }, this);


    }

    update() {
        
        if(!this.player) {
            return;
        }
        
        var playerBounds = this.player.getBounds();
        this.sharks.forEach(shark => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(shark.getBounds(), playerBounds)) {
                this.seaScene.shake();
                shark.canHurt = false;
                shark.destroy();
                this.player.sharkBite();
            }
        });

        this.sharks = this.sharks.filter(s => s.canHurt);
    }
}
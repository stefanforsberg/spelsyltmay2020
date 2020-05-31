class DayScene extends Phaser.Scene {
    constructor() {
        console.log("DayScene")
        super({ key: 'DayScene' });
    }

    init() {
        console.log("Init Day")

        this.seaScene = this.scene.get('SeaScene');

        this.sky = this.add.rectangle(this.cameras.main.width/2, ((this.cameras.main.height-80)/2), this.cameras.main.width, this.cameras.main.height-80, 0x000000);
        this.sky.alpha = 0.0;
    }
    
    create() {

        console.log("Create Day")

        this.time.delayedCall(40000, this.nightfall, [], this);

        this.time.delayedCall(10000, this.seaScene.addChild, [], this.seaScene);

        this.time.delayedCall(40000, this.seaScene.addChild, [], this.seaScene);
    }

    nightfall() {
        this.tweens.add({
            targets: [ this.sky ],
            props: {
                alpha : { value: 0.7, duration: 20000, ease: 'Power.Easein' }
            },
            repeat: 0,
            yoyo: false,
            onComplete: function () { this.seaScene.switchToNight() },
            onCompleteScope: this,
        });
    }
}
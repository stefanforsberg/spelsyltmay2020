class ShoreScene extends Phaser.Scene {
    constructor() {
        console.log("ShoreScene")
        super({ key: 'ShoreScene' });
    }

    init() {
        console.log("Init Shore")

        this.seaScene = this.scene.get('SeaScene');

        // this.seaScene.scene.pause();

        this.shore = this.add.image(0, -3000, 'shore')
        this.shore.x = this.shore.width/2;
        this.shore.y = -this.shore.height/2;
    }
    
    create() {

        console.log("Create Shore")

        this.tweens.add({
            targets: [ this.shore ],
            props: {
                y: { value: `+=700`, duration: 8000 },
            },
            yoyo: false,
            repeat: 0,
            onComplete: function () { this.seaScene.events.emit("Endgame") },
            onCompleteScope: this,
        });

        // this.time.delayedCall(20000, this.nightfall, [], this);

        // this.time.delayedCall(0, this.seaScene.addChild, [], this.seaScene);

        // this.time.delayedCall(30000, this.seaScene.addChild, [], this.seaScene);
    }

    // nightfall() {
    //     this.tweens.add({
    //         targets: [ this.sky ],
    //         props: {
    //             alpha : { value: 0.7, duration: 40000, ease: 'Power.Easein' }
    //         },
    //         repeat: 0,
    //         yoyo: false,
    //         onComplete: function () { this.seaScene.switchToNight() },
    //         onCompleteScope: this,
    //     });
    // }
}
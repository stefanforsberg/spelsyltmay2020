class DayScene extends Phaser.Scene {
    constructor() {
        console.log("DayScene")
        super({ key: 'DayScene' });
    }

    init() {
        console.log("Init Day")

        this.sky = this.add.rectangle(this.cameras.main.width/2, ((this.cameras.main.height-80)/2), this.cameras.main.width, this.cameras.main.height-80, 0x000000);
        this.sky.alpha = 0.0;
    }
    
    create() {

        console.log("Create Day")

        this.time.delayedCall(4000, this.nightfall, [], this);

        
    }

    nightfall() {
        this.tweens.add({
            targets: [ this.sky ],
            props: {
                alpha : { value: 0.7, duration: 10000, ease: 'Power.Easein' }
            },
            repeat: 0,
            yoyo: false,
            onComplete: function () { this.scene.get('SeaScene').switchToNight() },
            onCompleteScope: this,
        });
    }
}
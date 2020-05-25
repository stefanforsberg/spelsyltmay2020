class NightScene extends Phaser.Scene {
    constructor() {
        console.log("NightScene")
        super({ key: 'NightScene' });
    }

    init() {
        console.log("Init Night")

        this.sky = this.add.rectangle(this.cameras.main.width/2, ((this.cameras.main.height-80)/2), this.cameras.main.width, this.cameras.main.height-80, 0x000000);
        this.sky.alpha = 0.7;
    }
    
    create() {

        console.log("Create Night")

        this.time.delayedCall(4000, this.daybreak, [], this);

        
    }

    daybreak() {
        this.tweens.add({
            targets: [ this.sky ],
            props: {
                alpha : { value: 0, duration: 10000, ease: 'Power.Easein' }
            },
            repeat: 0,
            yoyo: false,
            onComplete: function () { this.scene.get('SeaScene').switchToStorm() },
            onCompleteScope: this,
        });
    }
}
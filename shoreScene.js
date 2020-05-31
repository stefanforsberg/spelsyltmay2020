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
    }
}
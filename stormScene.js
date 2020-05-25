class StormScene extends Phaser.Scene {
    constructor() {
        console.log("StormScene")
        super({ key: 'StormScene' });
    }

    init() {
        console.log("Init Storm")

        // this.sky = this.add.rectangle(this.cameras.main.width/2, ((this.cameras.main.height-80)/2), this.cameras.main.width, this.cameras.main.height-80, 0x000000);
        // this.sky.alpha = 0.7;
    }
    
    create() {

        console.log("Create Storm")

        var particles = this.add.particles('rain');

        particles.createEmitter({
            x: 0, y: 0,
            lifespan: 2000,
            quantity: 4,
            scale: {min: 1, max: 3 },
            alpha: { start: 1, end: 0 },
            speed: { min: -400, max: -600 },
            angle: 115,
            gravityY: 100,
            blendMode: 'ADD',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, -100, 900, 1300) }
    
            // Compare:
            // emitZone: { type: 'random', source: circle }
        });

        
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
}
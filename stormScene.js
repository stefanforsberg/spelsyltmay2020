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
            blendMode: 'NORMAL',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, -100, 900, 1300) }
        });

        var fog = this.add.particles('fog');

        var emitterLeft = fog.createEmitter({
            x: 0, y: 0,
            lifespan: 20000,
            scale: {min: 1, max: 3 },
            speedX: { min: 10, max: 30 },
            gravityY: 1,
            gravityX: 1,
            frequency: 800,
            blendMode: 'NORMAL',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(-200, 0, 200, 1300) },
        });

        emitterLeft.setAlpha(function (p, k, t) { 
            return 0.5 - 2 * Math.abs(t - 0.5); 
        });

        var emitterRight = fog.createEmitter({
            x: 0, y: 0,
            lifespan: 20000,
            scale: {min: 1, max: 3 },
            speedX: { min: -30, max: -10 },
            gravityY: -1,
            gravityX: 1,
            frequency: 800,
            blendMode: 'NORMAL',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(750, 0, 200, 1300) },
        });

        emitterRight.setAlpha(function (p, k, t) { 
            return 0.5 - 2 * Math.abs(t - 0.5); 
        });


        this.time.delayedCall(4000, this.flash, [], this);

        
    }

    flash() {
        this.cameras.main.flash(1000);
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
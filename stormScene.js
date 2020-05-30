class StormScene extends Phaser.Scene {
    constructor() {
        console.log("StormScene")
        super({ key: 'StormScene' });
    }

    init() {
        console.log("Init Storm")

        this.seaScene = this.scene.get('SeaScene');
    }
    
    create() {

        console.log("Create Storm")

        var particles = this.add.particles('rain');

        this.rainEmitter = particles.createEmitter({
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

        this.emitterLeft = fog.createEmitter({
            x: 0, y: 0,
            lifespan: 20000,
            scale: {min: 1, max: 4 },
            speedX: { min: 20, max: 40 },
            gravityY: 1,
            gravityX: 1,
            frequency: 600,
            blendMode: 'ADD',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(-200, 0, 200, 1300) },
        });

        this.emitterLeft.setAlpha(function (p, k, t) { 
            return 0.7 - 2 * Math.abs(t - 0.5); 
        });

        this.emitterRight = fog.createEmitter({
            x: 0, y: 0,
            lifespan: 20000,
            scale: {min: 1, max: 4 },
            speedX: { min: -40, max: -20 },
            gravityY: -1,
            gravityX: 1,
            frequency: 600,
            blendMode: 'ADD',
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(750, 0, 200, 1300) },
        });

        this.emitterRight.setAlpha(function (p, k, t) { 
            return 0.7 - 2 * Math.abs(t - 0.5); 
        });


        this.time.delayedCall(4000, this.flash, [], this);

        this.time.delayedCall(20000, this.flash, [], this);

        this.time.delayedCall(35000, this.flash, [], this);

        this.time.delayedCall(35000, this.stopClouds, [], this);
        this.time.delayedCall(55000, this.stopStorm, [], this);
    }

    flash() {
        this.seaScene.thunderSound.play();
        this.cameras.main.flash(1000);
    }

    stopClouds() {
        this.emitterLeft.stop();
        this.emitterRight.stop();
    }

    stopStorm() {
        this.rainEmitter.stop();     
        this.seaScene.switchToShore();         
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
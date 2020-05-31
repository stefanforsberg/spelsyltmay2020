class IntroScene extends Phaser.Scene {
    constructor() {
        console.log("IntroScene")
        super({ key: 'IntroScene' });
    }

    init() {
        console.log("Init Intro")

        // this.seaScene = this.scene.get('SeaScene');

        // this.sky.alpha = 0.0;
    }
    
    create() {

        this.seaSound = this.sound.add('sea', {loop: true, volume: 0.5});
        this.rainSound = this.sound.add('rain', {loop: true, volume: 0});
        this.thunderSound = this.sound.add('thunder', {loop: false, volume: 1});

        this.seaSound.play();

        var bg = this.add.rectangle(this.cameras.main.width/2,this.cameras.main.height/2, 700, 670, 0xF5F4F0);
        bg.alpha = 0;





        this.tweens.add({
            targets: bg,
            props: {
                alpha: { value: 1, duration: 2000 },
            },
            yoyo: false,
            repeat: 0,
            onComplete: this.intro01,
            onCompleteScope: this
        });

        



        // console.log("Create Day")

        // this.time.delayedCall(40000, this.nightfall, [], this);

        // this.time.delayedCall(10000, this.seaScene.addChild, [], this.seaScene);

        // this.time.delayedCall(40000, this.seaScene.addChild, [], this.seaScene);
    }

    intro01() {

        var intro01 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'intro01');
        intro01.alpha = 0;

        var intro01Speak01 = this.add.rectangle(295, 628, 75,62, 0xF5F4F0);
        intro01Speak01.alpha = 1;

        var intro01Speak02 = this.add.rectangle(455, 608, 100 ,100, 0xF5F4F0);
        intro01Speak02.alpha = 1;

        this.tweens.add({
            targets: intro01,
            props: {
                alpha: { value: 1, duration: 3000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: intro01Speak01,
                props: {
                    alpha: { value: 0, duration: 1000 },
                },
                yoyo: false,
                repeat: 0
            })
         }, [], this);

         this.time.delayedCall(4500, () => {
            this.tweens.add({
                targets: intro01Speak02,
                props: {
                    alpha: { value: 0, duration: 1000 },
                },
                yoyo: false,
                repeat: 0
            })
         }, [], this);

         this.time.delayedCall(8000, this.intro02, [], this);


        
    }

    intro02() {
        console.log("intro 2")
        var intr02 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'intro02');
        intr02.alpha = 0;

        this.tweens.add({
            targets: this.seaSound,
            props: {
                volume: { value: 0, duration: 1000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.rainSound.play();

        this.tweens.add({
            targets: this.rainSound,
            props: {
                volume: { value: 0.5, duration: 1000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.tweens.add({
            targets: intr02,
            props: {
                alpha: { value: 1, duration: 3000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.time.delayedCall(6000, this.intro03, [], this);
    }

    intro03() {
        this.cameras.main.flash(1000);
        this.cameras.main.shake(800);

        var intro03 = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'intro03');
        this.thunderSound.play();

        this.tweens.add({
            targets: intro03,
            props: {
                scale: { value: 1.25, duration: 8000 },
            },
            yoyo: false,
            repeat: 0,
        });

        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(5000, 103, 178, 199);
            
            this.tweens.add({
                targets: [this.rainSound, this.thunderSound],
                props: {
                    volume: { value: 0, duration: 5000 },
                },
                yoyo: false,
                repeat: 0,
            });
        }, [], this);

        this.time.delayedCall(8000, ()=> { this.scene.get('StartScene').hideIntro() }, [], this.scene.get('StartScene'));

        

    }
}
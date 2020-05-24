class SeaScene extends Phaser.Scene {
    constructor(e) {
        console.log("sea")
        super({ key: 'SeaScene' });
    }

    preload() {
        console.log("preloading")
    }

    create() {
        console.log("create")

        this.events.on("EatFish", () => { this.fishEaten = this.fishEaten + 1;}, this);

        this.events.on("AddRaft", this.addRaft, this);

        this.restart();

    }

    restart() {
        this.bg1 = this.add.sprite(400,700,'bg');
        this.bg2 = this.add.sprite(400,700-1400,'bg');

        this.tweens.add({
            targets: [ this.bg1, this.bg2 ],
            props: {
                x: { value: '+=40', duration: 10000, ease: 'Sine.InOut' },
                angle: { value: '+=5', duration: 15000, ease: 'Sine.InOut' }
            },
            yoyo: true,
            repeat: -1
        });

        this.childrenRafts = []

        this.player = new Player(this);

        this.wood = new Wood(this, 600, 0, 'wood');

        this.children = [];

        this.child = new Child(this, 0, 0, 'child');

        this.children.push(this.child);

        this.crafting = new Crafting(this);

        this.fishEaten = 0;

        this.fishEatenText = this.add.text(30, 30, '0').setFontFamily('Arial').setFontSize(48).setColor('#ffff00');

        this.fish = new Fish(this, 50, 50, 'fish');

        this.fish2 = new Fish(this, 600, 0, 'fish');
    }

    update() {

        this.bg1.y+=0.5;
        

        if(this.bg1.y > 700+1300) {
            console.log("moving 1")
            this.bg1.y = -700
        }

        this.bg2.y+=0.5;

        if(this.bg2.y > 700+1300) {
            console.log("moving 2")
            this.bg2.y = -700
        }

        this.child.update();

        this.player.update();

        this.fishEatenText.setText(this.fishEaten)
        
        var playerBounds = [this.player, ...this.childrenRafts.filter(c => c.hasChild)];        

        this.fish.update(playerBounds);
        this.fish2.update(playerBounds);

        this.wood.update([this.player, ...this.childrenRafts]);

        this.childrenRafts.forEach(r => r.update(this.children))

        this.crafting.update();

    }

    addRaft() {
        switch(this.childrenRafts.length) {
            case 0:
                var childrenRaft = new ChildRaft(this, 310, 1150, 1)
                this.childrenRafts.push(childrenRaft);
                break;
            case 1:
                var childrenRaft = new ChildRaft(this, 490, 1150, 1)
                this.childrenRafts.push(childrenRaft);
                break;
        }
    }

}
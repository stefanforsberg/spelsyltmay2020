class ChildRaft extends Phaser.GameObjects.Container {
    constructor(scene, x, y, name) {

        super(scene, x, y);

        this.scene = scene;

        this.hasChild = false;
        this.isChildAlive = false;

        this.name = name;

        this.raftRope = this.scene.add.graphics();

        this.raft = this.scene.add.image(0, 0, 'childRaft');

        this.isBuilt = false;

        this.raft.alpha = 0.3;

        this.raft.setInteractive();

        this.raft.on('pointerdown', () => {
            if(!this.isBuilt) {
                scene.events.emit("BuildRaftRequest", this);
            } else {
                scene.events.emit("RepairRaftRequest", this);
            }
        }, this);

        this.add(this.raft);

        scene.add.existing(this);
    }

    build() {
        this.isBuilt = true;
        this.raft.alpha = 1;
        this.raftLife = 100;
        this.raftLifeGraphics = this.scene.add.graphics();

        this.childLife = 0;
        this.childLifeGraphics = this.scene.add.graphics();

        this.addRaftWaves();
        this.add(this.raftRope);
        this.add(this.raftLifeGraphics);
        this.add(this.childLifeGraphics);

        this

        this.scene.tweens.add({
            targets: [ this ],
            props: {
                x: { value: `+=${Phaser.Math.Between(-10, 10)}`, duration: 5000, ease: 'Sine.InOut' },
                y: { value: `+=${Phaser.Math.Between(-10, 10)}`, duration: 5000, ease: 'Sine.InOut' },
                angle: { value: `+=${Phaser.Math.Between(-5, 5)}`, duration: 15000, ease: 'Sine.InOut' }
            },
            yoyo: true,
            repeat: -1
        });

        this.bringToTop(this.raft);
        this.bringToTop(this.childLifeGraphics);

    }

    eat(eatValue) {
        this.childLife -= eatValue;

        if(this.childLife < 0) {
            this.childLife = 0;
        }
    }

    repairRaft() {
        this.raftLife += this.scene.gameState.current.repairRaftAmount;

        if(this.raftLife > 100) {
            this.raftLife = 100;
        }
    }

    getBounds() {
        return this.raft.getBounds()
    }

    getState() {

        return {
            isBuilt: this.isBuilt, 
            hasChild: this.hasChild,
            isChildAlive: this.isChildAlive,
            name: this.name
        }
    }

    addRaftWaves() {
        for(var i = 0; i < 5; i++) {
            let raftWave = this.scene.add.ellipse(0, 0, 40, 60, 0xFFFFFF, 0);
            raftWave.depth = 5;
            raftWave.setStrokeStyle(3, 0xFFFFFF, 0.3);

            this.add(raftWave)

            this.scene.tweens.add({
                targets: [ raftWave ],
                props: {
                    displayWidth: { value: "+=90", duration: 7000, ease: 'Sine.InOut' },
                    displayHeight: { value: "+=90", duration: 7000, ease: 'Sine.InOut' },
                    alpha: { from: 1, to: 0.1, duration: 7000, ease: 'Sine.InOut' },
                    y: { value: "+=30", duration: 7000, ease: 'Normal' },
                },
                repeat: -1,
                delay: 1300*i
            });
        }
    }

    update(children, player) {
        if(!this.active || !this.isBuilt) {
            return;
        }

        this.updateChild(children);
        this.updateRaft(player);
    }

    canChildEat() {
        return this.hasChild && this.isChildAlive;
    }

    updateChild(children) {
        if(this.hasChild) {
            if(this.isChildAlive) {
                if(this.childLife < 180) {
                    this.childLife = this.childLife + this.scene.gameState.current.childLifeDecrease;
                }

                this.childLifeGraphics.clear();

                if(this.childLife >= 180) {
                    this.isChildAlive = false;
                    this.raft.setTexture('childRaftChildDead')
                    
                } else {
                    this.childLifeGraphics.lineStyle(1, 0x1D5608, 3);
                    this.childLifeGraphics.strokeRect(-42, -40, 84, 13);
            
                    this.childLifeGraphics.fillStyle(0x1D5608, 0.4);
                    this.childLifeGraphics.fillRect(-42, -40, 84, 13);
            
                    this.childLifeGraphics.fillStyle(0x5AFF19, 1);
                    this.childLifeGraphics.fillRect(-42, -40, ((180-this.childLife)/180)*84, 13);
            
                    this.childLifeGraphics.strokeRect(-42, -40, ((180-this.childLife)/180)*84, 13);
                }
    

            }
        } else {
            children.filter(c => c.canBePlacedOnRaft()).forEach(child => {
                if(Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), child.getBounds())) {
                    child.destroy();
                    child.canMove = false;
                    this.addChildToRaft();
                }
            });
        }
    }

    updateRaft(player) {

        if(this.raftLife > 0) {
            this.raftLife -= this.scene.gameState.current.childRaftLifeDecrease;
        }

        if(this.raftLife <= 0) {
            this.destroy();
        }
        
        this.raftLifeGraphics.clear();

        this.raftLifeGraphics.lineStyle(1, 0x3B2A20, 3);
        this.raftLifeGraphics.strokeRect(-53, 50, 100, 13);

        this.raftLifeGraphics.fillStyle(0x3B2A20, 0.4);
        this.raftLifeGraphics.fillRect(-53, 50, 100, 13);

        this.raftLifeGraphics.fillStyle(0xC69669, 1);
        this.raftLifeGraphics.fillRect(-53, 50, this.raftLife, 13);

        this.raftLifeGraphics.strokeRect(-53, 50, this.raftLife, 13);


        var playerBounds = player.getBounds();

        this.raftRope.clear();

        this.raftRope.lineStyle(5, 0xF3F3F3);

        this.raftRope.beginPath();

        this.raftRope.moveTo(0,-40);

        this.raftRope.lineTo(playerBounds.x-this.x+playerBounds.width/2, playerBounds.y + playerBounds.height - this.y - 20);
    
        this.raftRope.closePath();
        this.raftRope.strokePath();
    }

    addChildToRaft() {
        this.hasChild = true;
        this.isChildAlive = true;
        this.raft.setTexture('childRaftWithChild')
    }
}
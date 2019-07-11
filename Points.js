class Points {
    constructor(canvasConfig, playerConfig) { 
        this.cvs = canvasConfig.cvs; 
        this.ctx = canvasConfig.ctx;
        this.playerSize = playerConfig.playerSize;
        this.pointSize = 10;
        this.pointX = Math.random() * (this.cvs.width-this.pointSize);
        this.pointY = Math.random() * (this.cvs.height-this.pointSize);
        this.pointSound = new Sound("./Sounds/getPoint.wav");
    }
    drawPoint(newPoint){
        let blocks = block.getBlocks();
        if (newPoint){
            this.pointX = Math.random() * (this.cvs.width - this.pointSize);
            this.pointY = Math.random() * (this.cvs.height - this.pointSize);
            for (let i = 0; i < blocks.length; i++) { //whork when point is to close to blocks
                if (block.getDistance(this.pointX, this.pointY, blocks[i].blockX, blocks[i].blockY)< 40){
                    this.drawPoint('true')
                }
            }
            if(block.getDistance(this.pointX, this.pointY,x, y) < 20){ //work when point is to close to player
                this.drawPoint('true')
            }
        }
        ctx.beginPath();
        ctx.rect(this.pointX, this.pointY, this.pointSize, this.pointSize);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.pointX +2, this.pointY +2, this.pointSize -4, this.pointSize -4);
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        ctx.closePath();
    }
    pointDetector() { //specify the contact between player and point
        if (x + this.playerSize > this.pointX && x < this.pointX + this.pointSize && y + this.playerSize > this.pointY && y < this.pointY + this.pointSize) {
            score++;
            if (score % 2 == 0){enemies.createEnemy();}
            booster.deleteBooster();
            if (score % 5 == 0){
                booster.drawBooster('true')
                if (score > 0) {
                    booster.deleteBooster(true)
                }
            }
            block.createBlock();
            this.pointSound.play();
            this.drawPoint('true');
        }
    }
    getPointConfig() { // this getter returns playerSize to other classes
        let pointConfig = {
            pointX: this.pointX,
            pointY: this.pointY,
            pointSize: this.pointSize,
        };
        return pointConfig;
    };
}
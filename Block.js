class Block {
    constructor(canvasConfig, playerConfig, pointConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
        this.pointX = pointConfig.pointX
        this.pointY = pointConfig.pointY
        this.playerSize = playerConfig.playerSize;
        this.blocks = [];
    }
    blockModel() {
        for (let i = 0; i < this.blocks.length; i++) {
            this.drawBlock(this.blocks[i].blockX, this.blocks[i].blockY, this.blocks[i].blockSizeX, this.blocks[i].blockSizeY)
            this.playerCollision(this.blocks[i].blockX, this.blocks[i].blockY, this.blocks[i].blockSizeX, this.blocks[i].blockSizeY)
        }
    }
    drawBlock(x, y, xSize, ySize) {
        ctx.beginPath();
        ctx.rect(x, y, xSize, ySize);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x + 2, y + 2, xSize - 4, ySize - 4);
        ctx.fillStyle = "#A9A9A9";
        ctx.fill();
        ctx.closePath();
    }
    createBlock(){
        let blockSizeX
        let blockSizeY
        if (Math.random() > 0.5){ //random direction of block
            blockSizeX = 10
            blockSizeY = Math.floor(Math.random() * 30) + 20
        } else {
            blockSizeY = 10
            blockSizeX = Math.floor(Math.random() * 30) + 20
        }
        let blockX = Math.random() * (this.cvs.width - blockSizeX);
        let blockY = Math.random() * (this.cvs.height - blockSizeY);
        for (let i = 0; i < this.blocks.length; i++) {
            if (
                (this.getDistance(blockX, blockY, this.blocks[i].blockX, this.blocks[i].blockY)< 30 ) ||
                (this.getDistance(x, y, this.blocks[i].blockX, this.blocks[i].blockY) < 30  ) ||
                (this.getDistance(this.pointX, this.pointY, this.blocks[i].blockX, this.blocks[i].blockY) < 30)
                ) {
                return;
            }
        }
        let blockInfo = { //info about enemies
            blockX: blockX,
            blockY: blockY,
            blockSizeX: blockSizeX,
            blockSizeY: blockSizeY,
        };
        this.blocks.push(blockInfo);
    }
    playerCollision(blockX, blockY, blockSizeX, blockSizeY){
        if (x + this.playerSize > blockX && x < blockX + blockSizeX && y + this.playerSize > blockY && y < blockY + blockSizeY) {
            if (y > blockY + blockSizeY - 6) {
                y = y + 6
            }
            if (y + this.playerSize - 6 < blockY){
                    y = y - 6
                }
            if (x + this.playerSize - 6 < blockX ) {
                    x = x - 6}
            if (x > blockX + blockSizeX - 6) {
                x = x + 6
            }
        }
    }
    getDistance(x1, y1, x2, y2) {
        let a = x1 - x2;
        let b = y1 - y2;
        let c = Math.sqrt(a * a + b * b);
        return c;
    }
    getBlockConfig() { // this getter returns blocksconfigs to other classes
        let pointConfig = {
            blockX: this.blockX,
            blockY: this.blockY,
            blockSizeX: this.blockSizeX,
            blockSizeY: this.blockSizeY,
        };
        return pointConfig;
    };
    getBlocks() { // this getter returns playerSize to other classes
        let blocksConfig = this.blocks
        return blocksConfig;
    };
}
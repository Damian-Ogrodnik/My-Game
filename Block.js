class Block {
    constructor(canvasConfig, playerConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
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
            blockSizeX = Math.floor(Math.random() * 30) + 20
            blockSizeY = 10
        }
        let blockX = Math.random() * (this.cvs.width - blockSizeX);
        let blockY = Math.random() * (this.cvs.height - blockSizeY);
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
            if (y > blockY + blockSizeY - 5) {
                y = y + 2
            }
            if (y + this.playerSize - 5 < blockY){
                    y = y - 2
                }
            if (x + this.playerSize - 5 < blockX ) {
                    x = x - 2}
            if (x > blockX + blockSizeX - 5) {
                x = x + 2
            }
        }
    }
    getBlockConfig() { // this getter returns playerSize to other classes
        let pointConfig = {
            blockX: this.blockX,
            blockY: this.blockY,
            blockSizeX: this.blockSizeX,
            blockSizeY: this.blockSizeY,
        };
        return pointConfig;
    };
}
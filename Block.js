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
        }
    }
    drawBlock(x, y, xSize, ySize) {
        ctx.beginPath();
        ctx.rect(x, y, xSize + 20, ySize);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x + 2, y + 2, xSize - 4 + 20, ySize - 4);
        ctx.fillStyle = "#A9A9A9";
        ctx.fill();
        ctx.closePath();
    }
    createBlock(){
        console.log('create')
        console.log(this.blocks.length)
        let blockSizeX = Math.floor(Math.random() * 30) + 5
        let blockSizeY = 10
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
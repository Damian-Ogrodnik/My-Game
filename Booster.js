class Booster {
    constructor(canvasConfig, playerConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
        this.playerSize = playerConfig.playerSize;
        this.boosterSize = 10;
        this.boosterX = Math.random() * (this.cvs.width - this.boosterSize);
        this.boosterY = Math.random() * (this.cvs.height - this.boosterSize);
        this.boosterSound = new Sound("./Sounds/getPoint.wav");
    }
    drawBooster(newBooster) {
        let blocks = block.getBlocks(); 
        if (newBooster) {
            this.boosterX = Math.random() * (this.cvs.width - this.boosterSize);
            this.boosterY = Math.random() * (this.cvs.height - this.boosterSize);
            for (let i = 0; i < blocks.length; i++) { //check if booster is to close to blocks
                if (block.getDistance(this.boosterX, this.boosterY, blocks[i].blockX, blocks[i].blockY) < 40) {
                    this.drawBooster('true');
                }
            }
        }
        ctx.beginPath();
        ctx.rect(this.boosterX, this.boosterY, this.boosterSize, this.boosterSize);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.boosterX + 2, this.boosterY + 2, this.boosterSize - 4, this.boosterSize - 4);
        ctx.fillStyle = "#7a3db8";
        ctx.fill();
        ctx.closePath();
    }
    boosterDetector() {
        if (x + this.playerSize > this.boosterX && x < this.boosterX + this.boosterSize && y + this.playerSize > this.boosterY && y < this.boosterY + this.boosterSize) {
            this.boosterSound.play();
            player.increaseSpeed();
            player.decreaseSpeed();
            this.timer()
            this.deleteBooster();
        }
    }
    getBoosterConfig() {
        let boosterConfig = {
            boosterX: this.boosterX,
            boosterY: this.boosterY,
            boosterSize: this.boosterSize,
        };
        return boosterConfig;
    }
    async deleteBooster(delay){
        if(delay){
            await this.sleep(5000)
        }
        this.boosterX = -20;
        this.boosterY = -20;
    }

    async timer(){
        let timeDiv = document.getElementById('timeDiv')
        timeDiv.style.width = '490px'
        timeDiv.style.visibility = 'visible'
        for (let i = 0; i < 900; i++){
            await this.sleep(9)
            timeDiv.style.width = `${490- i*0.5}px`
        }
        timeDiv.style.visibility = 'hidden'
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

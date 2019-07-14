// TO DO:
//repair bug when player take booster timerDiv still works

class Booster {
    constructor(canvasConfig, playerConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
        this.playerSize = playerConfig.playerSize;
        this.boosterSize = 10;
        this.boosterX = Math.random() * (this.cvs.width - this.boosterSize);
        this.boosterY = Math.random() * (this.cvs.height - this.boosterSize);
        this.boosterON = false;
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
            this.boosterON = true
            player.decreaseSpeed();
            this.timer(9000, "#FFD700", "#272100" )
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
            this.timer(5000, "#7a3db8", "#000000", true, false)
            await this.sleep(5000)
        }
        this.boosterX = -20;
        this.boosterY = -20;
    }

    async timer(ms, color1, color2, boosterAppearDiv, bossterWorkingDiv){
        let timeDiv = document.getElementById('timeDiv')
        let time = ms/10; 
        let width = 490;
        timeDiv.style.backgroundImage = `linear-gradient(to bottom right, ${color1}, ${color2})`
        timeDiv.style.visibility = 'visible';
        for (let i = 0; i < time; i++){
            if (boosterAppearDiv){
                if(this.boosterON){
                    return
                }
            }
            await this.sleep(9)
            timeDiv.style.width = `${width- i*width/time}px`
        }
        let currentWidth = timeDiv.style.width
        let newcurrentWidth = parseInt(currentWidth.slice(0,-2))
        if (newcurrentWidth < 10){
            timeDiv.style.visibility = 'hidden'
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    boosterOF(){
        this.boosterON = false;
    }
}

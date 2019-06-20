class Player {
    constructor(canvasConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.playerSize = 20;
        this.playerSpeed = 3;
    }
    drawPlayer() {
        ctx.beginPath();
        ctx.rect(x, y, this.playerSize, this.playerSize);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x+3, y+3, this.playerSize - 6, this.playerSize - 6);
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        ctx.closePath();
     }
    
    getPlayerConfig() { // this getter returns playerSize to other classes
        let playerConfig = {
            playerSize: this.playerSize,                 
        };
        return playerConfig;
    };
    changePosition() {
        if (this.rightPressed && x < cvs.width - this.playerSize) {
            x += this.playerSpeed;
        }
        if (this.leftPressed && x > 0) {
            x -= this.playerSpeed;
        }
        if (this.upPressed && y > 0) {
            y -= this.playerSpeed;
        }
        if (this.downPressed && y < cvs.height - this.playerSize) {
            y += this.playerSpeed;
        }
    };
    playerMove(key, type){
        switch(key){
            case 'ArrowRight':
                (type == 'keydown') ? this.rightPressed = true: this.rightPressed = false;
                player.changePosition()
                break;
            case 'ArrowLeft':
                (type == 'keydown') ? this.leftPressed = true: this.leftPressed = false;
                player.changePosition()
                break;
            case 'ArrowUp':
                (type == 'keydown') ? this.upPressed = true: this.upPressed = false;
                player.changePosition()
                break;
            case 'ArrowDown':
                (type == 'keydown') ? this.downPressed = true: this.downPressed = false;
                player.changePosition()
                break;
        }
    }
}
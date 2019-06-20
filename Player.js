class Player {
    constructor(canvasConfig) {
        this.cvs = canvasConfig.cvs; // pobranie wartości cvs z gettera 
        this.ctx = canvasConfig.ctx; // pobranie wartości ctx z gettera 
        this.rightPressed = false; // czy prawa strzałka jest obecnie wciśnięta
        this.leftPressed = false; // czy lewa strzałka jest obecnie wciścnięta
        this.upPressed = false;
        this.downPressed = false;
        this.playerSize = 20;
        this.playerSpeed = 3;
    }
    drawPlayer() { // rysowanie gracza
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
    
    getPlayerConfig() { // getter zwracający playerSize do innych klas
        let playerConfig = {
            playerSize: this.playerSize,                 
        };
        return playerConfig;
    };
    movePlayer() { //porusznie sie gracza
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
    move(key, type){
        console.log(type)
        console.log(key)
        switch(key){
            case 'ArrowRight':
                if ( type == 'keydown'){
                    this.rightPressed = true
                    player.movePlayer()
                } else {
                    this.rightPressed = false
                    player.movePlayer()
                }
                break;
            case 'ArrowLeft':
                if (type == 'keydown') {
                    this.leftPressed = true
                    player.movePlayer()
                } else {
                    this.leftPressed = false
                    player.movePlayer()
                }
                break;
            case 'ArrowUp':
                if (type == 'keydown') {
                    this.upPressed = true
                    player.movePlayer()
                } else {
                    this.upPressed = false
                    player.movePlayer()
                }
                break;
            case 'ArrowDown':
                if ( type == 'keydown'){
                    this.downPressed = true
                    player.movePlayer()
                } else {
                    this.downPressed = false
                    player.movePlayer()
                }
                break;
        }
    }
}

class Points {
    constructor(canvasConfig, playerConfig) { 
        this.cvs = canvasConfig.cvs; // pobranie wartości cvs z gettera 
        this.ctx = canvasConfig.ctx; // pobranie wartości ctx z gettera
        this.playerSize = playerConfig.playerSize; // rozmiar gracza z gettera players
        this.pointSize = 10;  //rozmiar point
        this.pointX = Math.random() * (this.cvs.width-this.pointSize); //miejsce point na osi x
        this.pointY = Math.random() * (this.cvs.height-this.pointSize); //miejsce poiny na osi y
        this.point = false;
    }
    drawPoint(newPoint){ //nanosi punkt na canvas
        if (newPoint){
            this.pointX = Math.random() * (this.cvs.width - this.pointSize); //miejsce point na osi x
            this.pointY = Math.random() * (this.cvs.height - this.pointSize); //miejsce poiny na osi y
        }
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
    pointDetector() { //określa czy gracz wszedł w punkt, 
        if (x + this.playerSize > this.pointX && x < this.pointX + this.pointSize && y + this.playerSize > this.pointY && y < this.pointY + this.pointSize) {
            score++;
            if (score % 2 == 0){enemies.createEnemy();}
            this.drawPoint('true');
        }
    }
    getPointConfig() { // this getter returns playerSize to other classes
        let pointConfig = {
            pointX: this.pointX,
            pointY: this.pointY,
        };
        return pointConfig;
    };
}
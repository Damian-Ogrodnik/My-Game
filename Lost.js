class Lost {
    constructor(canvasConfig) {
        this.cvs = canvasConfig.cvs; // pobranie wartości cvs z gettera 
        this.ctx = canvasConfig.ctx; // pobranie wartości ctx z gettera 
    }
    lostFunction() { // KONIEC GRY
        clearInterval(interval);
        this.cvs = document.querySelector('#myCanvas'); // odniesienie się do elementu o id myCanvas w htmlu
        this.ctx = this.cvs.getContext('2d'); //nadanie contextu
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.font = "bold 45px Courier New";
        ctx.fillStyle = "#FFD700";
        ctx.textAlign = "center";
        ctx.fillText("YOU LOST", cvs.width / 2, cvs.height / 2);
        ctx.font = "20px Courier New";
        ctx.fontweight = "bold";
        ctx.fillStyle = "#FFD700";
        ctx.textAlign = "center";
        ctx.fillText("Click to play again ", cvs.width / 2, cvs.height / 2 + 30);
        let elem = document.getElementById('body');
        elem.addEventListener('keypress', () => document.location.reload())
        elem.addEventListener('click', () => document.location.reload())
    }
}
class Lost {
    constructor(canvasConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
    }
    lostFunction() { // GAME OVER
        let timeDiv = document.getElementById("timeDiv")
        if (timeDiv){
            timeDiv.remove();
        }
        clearInterval(interval);
        this.cvs = document.querySelector('#myCanvas');
        this.ctx = this.cvs.getContext('2d'); 
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

export var lol = 100
var lol2 = 120

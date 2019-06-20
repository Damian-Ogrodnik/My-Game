class Start {
    constructor(canvasConfig) {
        this.cvs = canvasConfig.cvs; // pobranie wartości cvs z gettera 
        this.ctx = canvasConfig.ctx; // pobranie wartości ctx z gettera 
    }
    startScreen(z){
        let za = 1;
        this.cvs = document.querySelector('#myCanvas'); // odniesienie się do elementu o id myCanvas w htmlu
        this.ctx = this.cvs.getContext('2d'); //nadanie contextu
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("Kliknij aby zacząć", cvs.width / 2, cvs.height / 2);
        ctx.font = "15px Comic Sans MS";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("Używaj strzałek do poruszania", cvs.width / 2, cvs.height / 2 + 30);
        let elem = document.getElementById('body');
        elem.addEventListener('keypress', () => {return za = 1})
        elem.addEventListener('click', () => {return za = 1})
    }
    
}
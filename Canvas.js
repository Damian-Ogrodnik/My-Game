class Canvas {
    constructor() {
        this.cvs = document.querySelector('#myCanvas'); // odniesienie się do elementu o id myCanvas w htmlu
        this.ctx = this.cvs.getContext('2d'); //nadanie contextu
    }
    getCanvasConfig() { // getter zwracający this.cvs i this.ctx
        let canvasConfig = {
            cvs: this.cvs,
            ctx: this.ctx
        };
        return canvasConfig;
    };
}


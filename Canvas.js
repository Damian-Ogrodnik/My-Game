class Canvas {
    constructor() {
        this.cvs = document.querySelector('#myCanvas'); // reference to id myCanvas in  htmlu
        this.ctx = this.cvs.getContext('2d'); //set context
    }
    getCanvasConfig() { // getter with returns cvs and ctx
        let canvasConfig = {
            cvs: this.cvs,
            ctx: this.ctx
        };
        return canvasConfig;
    };
}


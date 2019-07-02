//TO DO
// -create start screen

let score = 0;
const canvas = new Canvas();
const {ctx,cvs} = canvas.getCanvasConfig();
const player = new Player(canvas.getCanvasConfig());
const points = new Points(canvas.getCanvasConfig(), player.getPlayerConfig());
const startDisplay = new Start(canvas.getCanvasConfig());
const lost = new Lost(canvas.getCanvasConfig());
const block = new Block(canvas.getCanvasConfig(), player.getPlayerConfig(), points.getPointConfig());
const enemies = new Enemies(canvas.getCanvasConfig(), player.getPlayerConfig());
let x = cvs.width / 2; // PLAYER X POSITION
let y = cvs.height / 2; // PLAYER Y POSITION

//MAIN GAME LOOP
const start = () => {
     ctx.clearRect(0, 0, cvs.width, cvs.height); //canvas clearing
     player.drawPlayer();
     points.drawPoint();
     block.blockModel();
     points.pointDetector();
     enemies.drawEnemies();
     enemies.enemiesMove();
     enemies.collisonModel(points.getPointConfig());
     document.querySelector("#score span").innerText = score;
};

//INTERVAL FOR GAME LOOP
const interval = setInterval(start, 15);

// PLAYER MOVE
document.addEventListener('keydown', (e) => {
     player.playerMove(e.key, e.type)
});
document.addEventListener('keyup', (e) => {
     player.playerMove(e.key, e.type)
});

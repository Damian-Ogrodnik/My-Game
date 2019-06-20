//TO DO
// -poprawic model kolizji
// -zrobic ekran startowy
// - poprawic wyglad strony
// - dodac bloki odbijajaca

let score = 0;
const canvas = new Canvas();
const player = new Player(canvas.getCanvasConfig());
const points = new Points(canvas.getCanvasConfig(), player.getPlayerConfig());
const startDisplay = new Start(canvas.getCanvasConfig());
const {ctx,cvs} = canvas.getCanvasConfig();
let x = cvs.width / 2; // PLAYER X POSITION
let y = cvs.height / 2; // PLAYER Y POSITION

//MAIN GAME LOOP
const start = () => {
     ctx.clearRect(0, 0, cvs.width, cvs.height); //czyszecznie canvas'a
     player.drawPlayer();
     points.drawPoint();
     points.pointDetector();
     points.drawEnemies();
     points.enemiesMove();
     points.enemiesPlayer();
     points.enemiesCollision();
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

//TO DO
// -poprawic model kolizji
// -zrobic ekran startowy
// - poprawic wyglad strony
// - dodac bloki odbijajaca


let score = 0; // wynik
// utworzenie obiektów na podstawie klas
const canvas = new Canvas();
const player = new Player(canvas.getCanvasConfig());
const points = new Points(canvas.getCanvasConfig(), player.getPlayerConfig());
const startDisplay = new Start(canvas.getCanvasConfig());
const {ctx,cvs} = canvas.getCanvasConfig();
let x = cvs.width / 2; // początkowa pozycja gracza oś x
let y = cvs.height / 2; // początkowa pozycja gracza oś y

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
    // umieszczenie zmiennej score w spanie, w nagówku h1 o id "score", tego jeszcze nie było, więc nie musice nic tu zmieniać
     document.querySelector("#score span").innerText = score;
};

//INTERWAL WYWOLUJACY FUNKCJE START
const interval = setInterval(start, 15);

// PORUSZANIE GRACZA
document.addEventListener('keydown', (e) => {
     player.move(e.key, e.type)
});
document.addEventListener('keyup', (e) => {
     player.move(e.key, e.type)
});

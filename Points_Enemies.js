class Points {
    constructor(canvasConfig, playerConfig) { 
        this.cvs = canvasConfig.cvs; // pobranie wartości cvs z gettera 
        this.ctx = canvasConfig.ctx; // pobranie wartości ctx z gettera
        this.playerSize = playerConfig.playerSize; // rozmiar gracza z gettera players
        this.pointSize = 10;  //rozmiar point
        this.pointX = Math.random() * (this.cvs.width-this.pointSize); //miejsce point na osi x
        this.pointY = Math.random() * (this.cvs.height-this.pointSize); //miejsce poiny na osi y
        this.point = false;
        this.enemies = [];    //tablica z przeciwnikami jako obiekty
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
            if (score % 2 == 0){this.createEnemy();}

            this.drawPoint('true');
        }
    }
    createEnemy() { //tworzy przeciwników
        let dx = 1; // "szybkośc poruszania się przeciwnika
        let dy = 1; // "szybkośc poruszania się przeciwnika
        let enemySpace = 60; //minimalny odstep w jakim nie pojawiaja sie przeciwnicy
        let randomPosition1 = Math.random();
        let randomPosition2 = Math.random();
        if (randomPosition1 > 0.5){ //losowy poczatkowy kierunek przeciwnikow
             if (randomPosition2 > 0.5){
                 dx = 1; 
                 dy = 1;
             }else{
                 dx = 1;
                 dy = 1;
             }
        }
        let enemySize = 15; //wielkość przeciwnika
        let enemyX = Math.random() * (this.cvs.width - enemySize); //pozycja x przeciwnika
        let enemyY = Math.random() * (this.cvs.height - enemySize); //pozycja y przeciwnika
        if (enemyX - x < enemySpace || enemyX - x < -enemySpace || enemyY - y < enemySpace || enemyY - y < -enemySpace) { // ma na celu sprawdzenie aby przeciwnik nie pojawil sie za blisko nas
            if (x > this.cvs.width/2){
                enemyX = this.cvs.width / 2 - enemySpace;
            } else{
                enemyX = this.cvs.width / 2 + enemySpace;
            }
            }
        let enemyInfo = { //obiekt przechowujacy dane o przeciwniku
            x: enemyX,
            y: enemyY,
            dx: dx,
            dy: dy,
            enemysize: enemySize
        };
        this.enemies.push(enemyInfo);
    }
    drawEnemies(){ //nanosi przeciwnikow na canvas
        for(let i = 0; i < this.enemies.length; i++){
            ctx.beginPath();
            ctx.rect(this.enemies[i].x, this.enemies[i].y, this.enemies[i].enemysize, this.enemies[i].enemysize);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.rect(this.enemies[i].x + 2, this.enemies[i].y +2, this.enemies[i].enemysize -4, this.enemies[i].enemysize - 4);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();
        }
    }
    enemiesMove(){ //ruch przeciwników + kolizja z punktami
        //KOLIZJA ZE SCIANOM
        for (let i = 0; i < this.enemies.length; i++){
            if (this.enemies[i].x + this.enemies[i].dx > cvs.width - this.enemies[i].enemysize || this.enemies[i].x + this.enemies[i].dx <= 0) {
                this.enemies[i].dx = -this.enemies[i].dx;
            }
            if (this.enemies[i].y + this.enemies[i].dy > cvs.height - this.enemies[i].enemysize || this.enemies[i].y + this.enemies[i].dy <= 0) {
                this.enemies[i].dy = -this.enemies[i].dy;
            }
        //KOLIZJA Z PUNKTEM
            //GÓRA PUNKTU
            let up = this.pointX+2;
            if (this.enemies[i].x + this.enemies[i].enemysize > up && this.pointX < this.enemies[i].x + this.enemies[i].enemysize && this.pointX + this.pointSize > this.enemies[i].x && this.pointY < this.enemies[i].y + this.enemies[i].enemysize && this.pointY+this.pointSize > this.enemies[i].y && this.enemies[i].dx < 0 && this.enemies[i].dy > 0) {
                     this.enemies[i].dy = -this.enemies[i].dy
                 }
             if (this.enemies[i].x + this.enemies[i].enemysize > up && this.pointX < this.enemies[i].x + this.enemies[i].enemysize && this.pointX + this.pointSize > this.enemies[i].x && this.pointY < this.enemies[i].y + this.enemies[i].enemysize && this.pointY + this.pointSize > this.enemies[i].y && this.enemies[i].dx > 0 && this.enemies[i].dy > 0) {
                     this.enemies[i].dy = -this.enemies[i].dy
                 }
            //LEWY BOK
            let left = this.pointX-2;
            if (left<this.enemies[i].x + this.enemies[i].enemysize && this.pointX > this.enemies[i].x + this.enemies[i].enemysize && this.pointY < this.enemies[i].y + this.enemies[i].enemysize && this.pointY + this.pointSize > this.enemies[i].y && this.enemies[i].dx > 0 && this.enemies[i].dy > 0) {
                this.enemies[i].dx = -this.enemies[i].dx
            }
            if (left < this.enemies[i].x + this.enemies[i].enemysize && this.pointX > this.enemies[i].x + this.enemies[i].enemysize && this.pointY < this.enemies[i].y + this.enemies[i].enemysize && this.pointY + this.pointSize > this.enemies[i].y  && this.enemies[i].dx > 0 && this.enemies[i].dy < 0) {
                this.enemies[i].dx = -this.enemies[i].dx
            }
            //PRAWY BOK
            let right = this.pointX + this.pointSize + 2 ;
            if (this.enemies[i].x < right && this.pointX + this.pointSize < this.enemies[i].x && this.pointY < this.enemies[i].y + this.enemies[i].enemysize && this.pointY + this.pointSize > this.enemies[i].y && this.enemies[i].dx < 0 && this.enemies[i].dy > 0) {
                this.enemies[i].dx = -this.enemies[i].dx
            }
            if (this.enemies[i].x < right && this.pointX + this.pointSize < this.enemies[i].x && this.pointY < this.enemies[i].y + this.enemies[i].enemysize && this.pointY + this.pointSize > this.enemies[i].y && this.enemies[i].dx < 0 && this.enemies[i].dy < 0) {
                this.enemies[i].dx = -this.enemies[i].dx
            }
            //DÓŁ PUNKTU
            let down = this.pointY + this.pointSize + 2;
            if (this.pointX < this.enemies[i].x + this.enemies[i].enemysize && this.pointX + this.pointSize > this.enemies[i].x && this.pointY + this.pointSize < this.enemies[i].y && down > this.enemies[i].y && this.enemies[i].dx < 0 && this.enemies[i].dy < 0) {
                this.enemies[i].dy = -this.enemies[i].dy

            } else if (this.pointX < this.enemies[i].x + this.enemies[i].enemysize && this.pointX + this.pointSize > this.enemies[i].x && this.pointY + this.pointSize < this.enemies[i].y && down > this.enemies[i].y && this.enemies[i].dx > 0 && this.enemies[i].dy < 0) {
                this.enemies[i].dy = this.enemies[i].dx
            }
            this.enemies[i].x += this.enemies[i].dx;
            this.enemies[i].y += this.enemies[i].dy;
        }
    }
    getDistance(x1,y1,x2,y2){
        let xDistance = x2 - x1;
        let yDistance = y2-y1;
        return Math.floor(Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance,2)));
    }

 enemiesCollision() { //kolizja pomiędzy przeciwnikami
     if (this.enemies.length >= 2) {
         for (let i = 0; i < this.enemies.length; i++) {
             let newArray = [...this.enemies]
             let index = newArray.indexOf(this.enemies[i].x)
             newArray.splice(index, 1)
             for (let j = 0; j < newArray.length; j++) {
                 if (this.enemies[i].x - newArray[j].x < this.enemies[i].enemysize - 2 && newArray[j].x - this.enemies[i].x < this.enemies[i].enemysize - 2 && this.enemies[i].y < newArray[j].y && this.enemies[i].y + this.enemies[i].enemysize > newArray[j].y) {
                    if ((this.enemies[j].dx > 0 && this.enemies[j].dx > 0 && this.enemies[j].dx < 0 && this.enemies[j].dy < 0) ||
                    (this.enemies[j].dx < 0 && this.enemies[j].dx < 0 && this.enemies[j].dx > 0 && this.enemies[j].dy > 0)||
                    (this.enemies[j].dx > 0 && this.enemies[j].dx < 0 && this.enemies[j].dx < 0 && this.enemies[j].dy > 0)||
                    (this.enemies[j].dx < 0 && this.enemies[j].dx > 0 && this.enemies[j].dx > 0 && this.enemies[j].dy < 0)
                    )
                    {
                        this.enemies[j].dx = -this.enemies[j].dx
                        this.enemies[i].dx = -this.enemies[i].dx
                        this.enemies[j].dx = -this.enemies[j].dy
                        this.enemies[i].dx = -this.enemies[i].dy
                    }
                    else    if (this.enemies[j].dx > 0 ) {
                        this.enemies[j].dx = -this.enemies[j].dx
                        this.enemies[i].dx = -this.enemies[i].dx       
                    } 
                    else if (this.enemies[j].dx < 0) {
                        this.enemies[j].dx = -this.enemies[j].dx
                        this.enemies[i].dx = -this.enemies[i].dx
                    }
                
                if (this.enemies[i].y - newArray[j].y < this.enemies[i].enemysize - 2 && newArray[j].y - this.enemies[i].y < this.enemies[i].enemysize - 2 && this.enemies[i].x < newArray[j].x && this.enemies[i].x + this.enemies[i].enemysize > newArray[j].x) {
                     if ((this.enemies[j].dx > 0 && this.enemies[j].dx > 0 && this.enemies[j].dx < 0 && this.enemies[j].dy < 0) ||
                         (this.enemies[j].dx < 0 && this.enemies[j].dx < 0 && this.enemies[j].dx > 0 && this.enemies[j].dy > 0) ||
                         (this.enemies[j].dx > 0 && this.enemies[j].dx < 0 && this.enemies[j].dx < 0 && this.enemies[j].dy > 0) ||
                         (this.enemies[j].dx < 0 && this.enemies[j].dx > 0 && this.enemies[j].dx > 0 && this.enemies[j].dy < 0)
                     ) {
                         this.enemies[j].dx = -this.enemies[j].dx
                         this.enemies[i].dx = -this.enemies[i].dx
                         this.enemies[j].dx = -this.enemies[j].dy
                         this.enemies[i].dx = -this.enemies[i].dy
                     } else if (this.enemies[j].dx > 0) {
                         this.enemies[j].dx = -this.enemies[j].dx
                         this.enemies[i].dx = -this.enemies[i].dx
                     } else if (this.enemies[j].dx < 0) {
                         this.enemies[j].dx = -this.enemies[j].dx
                         this.enemies[i].dx = -this.enemies[i].dx
                     }
                          
         }}}
     }
 }}
    enemiesPlayer(){ // kolizja przeciwników z graczem
        for (let i = 0; i < this.enemies.length; i++){
            if (x + this.playerSize > this.enemies[i].x && x < this.enemies[i].x + this.enemies[i].enemysize && y + this.playerSize > this.enemies[i].y && y < this.enemies[i].y + this.enemies[i].enemysize) {
               this.lostFunction()
            }
        }
    }
    lostFunction(){ // KONIEC GRY
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














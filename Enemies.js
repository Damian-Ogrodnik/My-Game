class Enemies {
    constructor(canvasConfig, playerConfig, pointConfig) {
        this.cvs = canvasConfig.cvs;
        this.ctx = canvasConfig.ctx;
        this.playerSize = playerConfig.playerSize;
        this.enemies = []; //this array contains information about enemies
        this.enemyHitSound = new Sound("./Sounds/enemyHit.mp3");
    }
    createEnemy() {
        let dx = 1; // enemy speed
        let dy = 1;
        let enemySpace = 60; //space between enemies
        let randomPosition1 = Math.random();
        let randomPosition2 = Math.random();
        if (randomPosition1 > 0.5) { //random direcion of enemies move
            if (randomPosition2 > 0.5) {
                dx = 1;
                dy = 1;
            } else {
                dx = 1;
                dy = 1;
            }
        }
        let enemySize = 15;
        let enemyX = Math.random() * (this.cvs.width - enemySize);
        let enemyY = Math.random() * (this.cvs.height - enemySize);
        if (enemyX - x < enemySpace || enemyX - x < -enemySpace || enemyY - y < enemySpace || enemyY - y < -enemySpace) { // runs when enemies can generate too close each other
            if (x > this.cvs.width / 2) {
                enemyX = this.cvs.width / 2 - enemySpace;
            } else {
                enemyX = this.cvs.width / 2 + enemySpace;
            }
        }
        let enemyInfo = { //info about enemies
            x: enemyX,
            y: enemyY,
            dx: dx,
            dy: dy,
            enemysize: enemySize
        };
        this.enemies.push(enemyInfo);
    }
    drawEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            ctx.beginPath();
            ctx.rect(this.enemies[i].x, this.enemies[i].y, this.enemies[i].enemysize, this.enemies[i].enemysize);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.rect(this.enemies[i].x + 2, this.enemies[i].y + 2, this.enemies[i].enemysize - 4, this.enemies[i].enemysize - 4);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();
        }
    }
    enemiesMove() { //enemies move + point and wall collision
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].x += this.enemies[i].dx;
            this.enemies[i].y += this.enemies[i].dy;
        }
    }
    collisonModel(pointConfig) {
        for (let i = 0; i < this.enemies.length; i++) {
            this.playerCollision(i)
            this.staticPointCollision(pointConfig.pointX, pointConfig.pointY, pointConfig.pointSize, pointConfig.pointSize, this.enemies[i].x, this.enemies[i].y, this.enemies[i].enemysize, i)
            this.blockEnemiesCollision(block.getBlocks(), i)
            this.wallCollision(i)
            this.enemiesCollision(i)
        }
    }

    playerCollision(i) { // PLAYER COLLISION
        if (x + this.playerSize > this.enemies[i].x && x < this.enemies[i].x + this.enemies[i].enemysize && y + this.playerSize > this.enemies[i].y && y < this.enemies[i].y + this.enemies[i].enemysize) {
            this.enemyHitSound.play();
            lost.lostFunction()
        }
    }
    wallCollision(i) {
        //WALL COLLISION
        if (this.enemies[i].x + this.enemies[i].dx > cvs.width - this.enemies[i].enemysize || this.enemies[i].x + this.enemies[i].dx <= 0) {
            this.enemies[i].dx = -this.enemies[i].dx;
        }
        if (this.enemies[i].y + this.enemies[i].dy > cvs.height - this.enemies[i].enemysize || this.enemies[i].y + this.enemies[i].dy <= 0) {
            this.enemies[i].dy = -this.enemies[i].dy;
        }
    }
    enemiesCollision(i) {
        if (this.enemies.length >= 2) {
            let newArray = [...this.enemies]
            let index = newArray.indexOf(this.enemies[i].x)
            newArray.splice(index, 1)
            for (let j = 0; j < newArray.length; j++) {
                let distance = this.getDistance(this.enemies[i].x, this.enemies[i].y, this.enemies[j].x, this.enemies[j].y)
                if (distance == 0) {
                    break;
                }
                if (distance <= 20) {
                    if (this.enemies[j].dx > 0 && this.enemies[j].dy < 0 && this.enemies[i].dx < 0 && this.enemies[i].dy > 0) {
                        this.enemies[j].dx = -this.enemies[j].dx
                        this.enemies[i].dx = -this.enemies[i].dx
                        this.enemies[j].dy = -this.enemies[j].dy
                        this.enemies[i].dy = -this.enemies[i].dy
                        break;
                    }
                    if (distance <= 15) {
                        this.enemies[j].dx = -this.enemies[j].dx
                        break;
                    }
                    this.enemies[j].dx = -this.enemies[j].dx
                    this.enemies[i].dx = -this.enemies[i].dx
                }
            }
        }
    }
    getDistance(x1, y1, x2, y2) {
        let a = x1 - x2;
        let b = y1 - y2;
        let c = Math.sqrt(a * a + b * b);
        return c;
    }
    blockEnemiesCollision(blockArray, enemyNumber){
        for (let i = 0; i < blockArray.length; i++) {
            this.staticPointCollision(blockArray[i].blockX, blockArray[i].blockY, blockArray[i].blockSizeX, blockArray[i].blockSizeY, this.enemies[enemyNumber].x, this.enemies[enemyNumber].y, this.enemies[enemyNumber].enemysize, enemyNumber)
        }
    }
    staticPointCollision(pointX, pointY, sizeX, sizeY, enemyX, enemyY, enemySize, i) {
        //UP
        let up = pointX + 2;
        if (enemyX + enemySize > up && pointX < enemyX + enemySize && pointX + sizeX > enemyX && pointY < enemyY + enemySize && pointY + sizeY > enemyY && this.enemies[i].dx < 0 && this.enemies[i].dy > 0) {
            this.enemies[i].dy = -this.enemies[i].dy
        }
        if (enemyX + enemySize > up && pointX < enemyX + enemySize && pointX + sizeX > enemyX && pointY < enemyY + enemySize && pointY + sizeY > enemyY && this.enemies[i].dx > 0 && this.enemies[i].dy > 0) {
            this.enemies[i].dy = -this.enemies[i].dy
        }
        //LEFT
        let left = pointX - 2;
        if (left < enemyX + enemySize && pointX > enemyX + enemySize && pointY < enemyY + enemySize && pointY + sizeY > enemyY && this.enemies[i].dx > 0 && this.enemies[i].dy > 0) {
            this.enemies[i].dx = -this.enemies[i].dx
        }
        if (left < enemyX + enemySize && pointX > enemyX + enemySize && pointY < enemyY + enemySize && pointY + sizeY > enemyY && this.enemies[i].dx > 0 && this.enemies[i].dy < 0) {
            this.enemies[i].dx = -this.enemies[i].dx
        }
        //RIGHT
        let right = pointX + sizeX + 2;
        if (enemyX < right && pointX + sizeX < enemyX && pointY < enemyY + enemySize && pointY + sizeY > enemyY && this.enemies[i].dx < 0 && this.enemies[i].dy > 0) {
            this.enemies[i].dx = -this.enemies[i].dx
        }
        if (enemyX < right && pointX + sizeX < enemyX && pointY < enemyY + enemySize && pointY + sizeY > enemyY && this.enemies[i].dx < 0 && this.enemies[i].dy < 0) {
            this.enemies[i].dx = -this.enemies[i].dx
        }
        //DOWN
        let down = pointY + sizeY + 2;
        if (pointX < enemyX + enemySize && pointX + sizeX > enemyX && pointY + sizeY < enemyY && down > enemyY && this.enemies[i].dx < 0 && this.enemies[i].dy < 0) {
            this.enemies[i].dy = -this.enemies[i].dy

        } else if (pointX < enemyX + enemySize && pointX + sizeX > enemyX && pointY + sizeY < enemyY && down > enemyY && this.enemies[i].dx > 0 && this.enemies[i].dy < 0) {
            this.enemies[i].dy = this.enemies[i].dx
        }
    }
}
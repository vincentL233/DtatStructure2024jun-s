const live = 1;
const dead = 0;

class Life {
    constructor(_row, _col) {
        this.row = _row;
        this.col = _col;
        this.grid = [];
        for (let r = 0; r < this.row; r++) {
            this.grid.push([]);
            for (let c = 0; c < this.col; c++) {
                this.grid[r].push(dead);
            }
        }
    }

    initgame =function(random) {
        if(random == true){
            for( var r = 0; r< this.row; r++){
                for(var c = 0; c<this.col; c++){
                    this.grid[r][c] = (Math.random()< 0.2)? live : dead;
                }
            }
        }else{

        }
    }

    update() {
        const nextGrid = JSON.parse(JSON.stringify(this.grid));

        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                const neighbors = this.neighborcount(r, c);

                if (this.getStatusAt(r, c) === live && (neighbors <= 1 || neighbors >= 4)) {
                    nextGrid[r][c] = dead;
                } else if (this.getStatusAt(r, c) === dead && neighbors === 3) {
                    nextGrid[r][c] = live;
                }
            }
        }

        this.grid = nextGrid;
    }

    neighborcount(row, col) {
        let count = 0;
        count += this.getStatusAt(row - 1, col - 1);
        count += this.getStatusAt(row - 1, col);
        count += this.getStatusAt(row - 1, col + 1);
        count += this.getStatusAt(row, col - 1);
        count += this.getStatusAt(row, col + 1);
        count += this.getStatusAt(row + 1, col - 1);
        count += this.getStatusAt(row + 1, col);
        count += this.getStatusAt(row + 1, col + 1);
        return count;
    }

    getStatusAt(row, col) {
        if (row < 0 || col < 0 || row >= this.row || col >= this.col) {
            return dead;
        }
        return this.grid[row][col];
    }

    drawctx(canvasId) {
        const canvas = document.getElementById(canvasId).getContext("2d");
        this.size = Math.min(canvas.canvas.height / this.row, canvas.canvas.width / this.col); 

        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                canvas.fillStyle = this.grid[r][c] === live ? "#000000" : "#FFFFFF";
                canvas.fillRect(c * this.size, r * this.size, this.size, this.size);
                canvas.strokeRect(c * this.size, r * this.size, this.size, this.size);
            }
         }
    }
    drawPoint(canvasId, r, c) {
            const canvas = document.getElementById(canvasId).getContext("2d");
            this.size = Math.min(canvas.canvas.height / this.row, canvas.canvas.width / this.col);
            canvas.fillStyle = this.grid[r][c] === live ? "#000000" : "#FFFFFF";
            canvas.fillRect(c * this.size, r * this.size, this.size, this.size);
            canvas.strokeRect(c * this.size, r * this.size, this.size, this.size);
    }
    
}

function tonext() {
    myGame.update();
    myGame.drawctx("gameCanvas");
}
function mouseclick(event) {
    const r = Math.floor(event.offsetY / myGame.size);
    const c = Math.floor(event.offsetX / myGame.size);
   
    myGame.grid[r][c] = Number(!myGame.getStatusAt(r, c)); 
    //myGame.grid[r][c] = myGame.getStatusAt(r, c) === live ? dead : live;
    myGame.drawPoint("gameCanvas", r,c);
}
function random(){
    myGame.initgame(true)
    myGame.drawctx("gameCanvas")
}
const myGame = new Life(50, 50);
myGame.initgame();
myGame.drawctx("gameCanvas");


const maze = [
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],// 0:通路, 1:牆
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 1]
];

let isRunning = false;//防誤觸開始或重置

class Point {
    constructor(r, c) {
        this.row = r;
        this.col = c;
    }
    //比較當前與終點位置是否相同
    isEnd(other) {
        return this.row === other.row && this.col === other.col;
    }
}
const start = new Point(0, 0);
const end = new Point(6, 2);

class MazeSolver {
    constructor(maze, start, end) {
        this.maze = maze;
        this.start = start;
        this.end = end;
        this.visited = Array(maze.length).fill().map(() => Array(maze[0].length).fill(false));
        this.stack = [];
        this.stepCount = 0;
        this.directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        this.shortestPath = new Map();
        this.finalPath = [];
    }
//檢查點是否在迷宮範圍內
    isValidPosition(point) {
        return point.row >= 0 && point.row < this.maze.length && 
               point.col >= 0 && point.col < this.maze[0].length;
    }
//檢查是否可以移動到該點
    isValidMove(point) {
        return this.isValidPosition(point) && 
               this.maze[point.row][point.col] === 0 && 
               !this.visited[point.row][point.col];
    }

    updateCell(point, className) {
        const cell = document.getElementById(`cell-${point.row}-${point.col}`);
        if (!cell || (cell.classList.contains('start') && className !== 'visited') || 
                    (cell.classList.contains('end') && className !== 'visited')) return;
        cell.className = `cell ${className}`;
    }

    updateUI(point, className) {
        this.maze[point.row][point.col] = 2;
        this.updateCell(point, className);
        document.getElementById('stepCount').textContent = ++this.stepCount;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    findNextMove(current) {
        for (const [dr, dc] of this.directions) {
            const nextPoint = new Point(current.row + dr, current.col + dc);
            if (this.isValidMove(nextPoint)) return nextPoint;
        }
        return null;
    }

    async solve() {
        this.stack = [this.start];
        this.visited[this.start.row][this.start.col] = true;
        this.updateUI(this.start, 'backtrack');
        
        while (this.stack.length > 0) {
            const current = this.stack[this.stack.length - 1];
            
            if (current.isEnd(this.end)) {
                this.finalPath = this.reconstructPath();
                await this.visualizeFinalPath();
                return true;
            }

            const nextPoint = this.findNextMove(current);
            if (nextPoint) {
                this.shortestPath.set(`${nextPoint.row},${nextPoint.col}`, current);
                await this.processNextMove(nextPoint);
            } else {
                await this.handleBacktrack();
            }
            await this.delay(300);
        }
        return false;
    }

    async processNextMove(point) {
        this.stack.push(point);
        this.visited[point.row][point.col] = true;
        this.updateUI(point, 'backtrack');
    }

    async handleBacktrack() {
        const current = this.stack.pop();
        if (!this.finalPath.length) {
            this.updateUI(current, 'backtrack-deep');
        }
    }

    reconstructPath() {
        const path = [];
        let current = this.end;
        while (!current.isEnd(this.start)) {
            path.unshift(current);
            const key = `${current.row},${current.col}`;
            current = this.shortestPath.get(key);
        }
        path.unshift(this.start);
        return path;
    }

    async visualizeFinalPath() {
        for (const point of this.finalPath) {
            this.updateUI(point, 'visited');
            await this.delay(100);
        }
    }
}



function createCell(i, j) {
    const cell = document.createElement('div');
    cell.className = getCellClassName(i, j);
    cell.id = `cell-${i}-${j}`;
    return cell;
}

function getCellClassName(i, j) {
    if (i === start.row && j === start.col) return 'cell start';
    if (i === end.row && j === end.col) return 'cell end';
    return `cell ${maze[i][j] === 1 ? 'wall' : 'path'}`;
}

function initializeMaze() {
    const mazeElement = document.getElementById('maze');
    mazeElement.innerHTML = '';
    
    maze.forEach((row, i) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'maze-row';
        row.forEach((_, j) => rowElement.appendChild(createCell(i, j)));
        mazeElement.appendChild(rowElement);
    });
}

async function startMaze() {
    if (isRunning) return;
    
    const button = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    button.disabled = true;
    resetButton.disabled = true;
    isRunning = true;
    
    try {
        const solver = new MazeSolver(maze, start, end);
        const result = await solver.solve();
        if (!result) alert('找不到路徑！');
    } catch (error) {
        alert(`錯誤：${error.message}`);
    } finally {
        button.disabled = false;
        resetButton.disabled = false;
        isRunning = false;
    }
}

function resetMaze() {
    if (isRunning) return;
    document.getElementById('stepCount').textContent = '0';
    document.getElementById('startButton').disabled = false;
    initializeMaze();
}

// 初始化迷宮
window.addEventListener('load', initializeMaze);
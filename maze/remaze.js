var maze = [
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 0]
];

class Point {
    constructor(r, c) {
        this.row = r;
        this.col = c;
    }

    isEnd() {
        return this.row === end.row && this.col === end.col;
    }
}

var start = new Point(0, 0);
var end = new Point(7, 9);
var stack = [];
var step = start;
var moveposition = [
    [-1, 0], [1, 0], [0, -1], [0, 1] // 上、下、左、右
];
moveposition.sort((a, b) => Math.random() - 0.5); // 隨機打亂移動方向

function isValid(r, c) {
    return r >= 0 && r < maze.length &&
           c >= 0 && c < maze[0].length &&
           maze[r][c] === 0; // 確認位置有效且尚未訪問
}

function go() {
    stack.push(step);
    while (!step.isEnd()) {
        maze[step.row][step.col] = 2; // 標記當前位置為已訪問
        let moved = false;

        for (let [dr, dc] of moveposition) {
            let newRow = step.row + dr;
            let newCol = step.col + dc;

            if (isValid(newRow, newCol)) {
                step = new Point(newRow, newCol);
                moved = true;
                break; // 找到第一個有效方向即移動
            }
        }

        if (moved) {
            stack.push(step);
        } else {
            // 如果無路可走，進行回溯
            stack.pop(); // 移除當前位置
            if (stack.length > 0) {
                step = stack[stack.length - 1]; // 回到上一個位置
            } else {
                console.log("無法找到路徑！");
                return false;
            }
        }
    }

    console.log("找到路徑！");
    return true;
}

function printMaze() {
    for (let row of maze) {
        console.log(row.join(' '));
    }
}
function drawPath(_stack) {
    var canvas = document.getElementById("map").getContext("2d");
    var size = Math.min(canvas.canvas.height/maze.length,
                       canvas.canvas.width/maze[0].length);
    _stack.forEach(item => {
        canvas.fillStyle = "#FF0000";
        canvas.fillRect(item.col * size, item.row * size, size, size);
    });
}

function drawBroad() {
    var ctx = document.getElementById("map").getContext("2d");
    var size = Math.min(ctx.canvas.height/maze.length,
                       ctx.canvas.width/maze[0].length);
    
    for(var r = 0; r < maze.length; r++) {
        for(var c = 0; c < maze[0].length; c++) {
            if(maze[r][c] == 1) {
                ctx.fillStyle = "#000000";
            } else if (maze[r][c] == 0) {
                ctx.fillStyle = "#FFFFFF";
            } else if (maze[r][c] == 2) {
                ctx.fillStyle = "#FFFF00";
            }
            ctx.fillRect(c * size, r * size, size, size);
            ctx.strokeRect(c * size, r * size, size, size);
        }
    }
}
console.log("開始尋路：");
const result = go();
console.log("是否找到路徑：", result);
printMaze(); // 打印最終的迷宮狀態
drawBroad(); // 先繪製迷宮
drawPath(stack); // 再繪製路徑
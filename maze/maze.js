var maze = [
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 0]
];

class Point{
    constructor(r,c){
        this.row = r;
        this.col = c;

    }
    isEnd = function(){
        return this.row == end.row && this.col == end.col
    }
   
}
var start = new Point(0,0);
var end = new Point(7,9);
var stack =[];
var step = start;
function isValid(r, c) {
    return r >= 0 && r < maze.length && 
           c >= 0 && c < maze[0].length;
}
function go() {
    stack.push(step);
    maze[step.row][step.col] = 2; 
    
    while (!step.isEnd()) {
        let moved = false;
        // 上
        if(isValid(step.row-1, step.col) && maze[step.row-1][step.col] === 0){
            step = new Point(step.row-1, step.col);
            moved = true;
        }
        // 下
        else if (isValid(step.row+1, step.col) && maze[step.row+1][step.col] === 0) {
            step = new Point(step.row+1, step.col);
            moved = true;
        }
        // 左
        else if (isValid(step.row, step.col-1) && maze[step.row][step.col-1] === 0) {
            step = new Point(step.row, step.col-1);
            moved = true;
        }
        // 右
        else if (isValid(step.row, step.col+1) && maze[step.row][step.col+1] === 0) {
            step = new Point(step.row, step.col+1);
            moved = true;
        }
        
        if (moved) {
            // 標記當前位置為已訪問
            maze[step.row][step.col] = 2;
            stack.push(step);
        } else {
            // 如果無路可走，回溯
            if (stack.length > 0) {
                stack.pop(); // 移除當前位置
                if (stack.length > 0) {
                    step = stack[stack.length - 1]; // 回到上一個位置
                } else {
                    console.log("No path found!");
                    return false;
                }
            } else {
                console.log("No path found!");
                return false;
            }
        }
    }
    
    console.log("Path found!");
    return true;
}
function printMaze() {
    for (let row of maze) {
        console.log(row.join(' '));
    }
}
console.log("開始尋路：");
const result = go();
console.log("是否找到路徑：", result);
printMaze();  // 打印最終的迷宮狀態
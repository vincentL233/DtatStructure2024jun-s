const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const stepBtn = document.getElementById("stepBtn");
const randomBtn = document.getElementById("randomBtn");
const clearBtn = document.getElementById("clearBtn");
const generationCountElement = document.getElementById("generationCount");

// 網格大小設定
const rows = 40; // 行數
const cols = 40; // 列數
const cellSize = canvas.width / cols; // 每個單位方格的大小
const simulationSpeed = 100; // 模擬更新速度，單位為毫秒

// 遊戲狀態
var grid = createGrid(rows, cols); // 初始化網格
var intervalId = null; // 儲存定時器的 ID
var generation = 0; // 世代計數

// 函式：創建一個空的網格
function createGrid(rows, cols) {
    return Array(rows).fill().map(() => Array(cols).fill(0)); // 生成 0 填滿的二維陣列，表示所有細胞均為死亡狀態
}

// 函式：隨機生成細胞狀態
function randomizeGrid() {
    grid = grid.map(row => row.map(() => Math.random() > 0.7 ? 1 : 0)); // 70% 機率產生活細胞
    generation = 0; // 重設世代計數
    updateGenerationDisplay(); // 更新世代顯示
    drawGrid(); // 繪製網格
}

// 函式：清除所有細胞狀態
function clearGrid() {
    grid = createGrid(rows, cols); // 重設網格
    generation = 0; // 重設世代計數
    updateGenerationDisplay(); // 更新世代顯示
    drawGrid(); // 繪製網格
}

// 函式：更新世代數顯示
function updateGenerationDisplay() {
    generationCountElement.textContent = generation; // 顯示目前的世代數
}

// 函式：繪製網格與細胞
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空畫布
    
    // 繪製細胞
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.fillStyle = grid[row][col] === 1 ? "#000000" : "#FFFFFF"; // 活細胞為黑色，死亡細胞為白色
            ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2); // 填充細胞顏色
        }
    }

    // 繪製網格線
    ctx.strokeStyle = "#CCCCCC"; // 網格線顏色
    ctx.lineWidth = 1;
    for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
    for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
    }
}

// 函式：計算下一世代的細胞狀態
function getNextGeneration() {
    const nextGrid = createGrid(rows, cols); // 創建下一世代的網格
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const neighbors = countNeighbors(row, col); // 計算鄰居的數量
            const currentCell = grid[row][col];
            
            if (currentCell === 1) {
                // 活細胞的存活規則：擁有 2 或 3 個活鄰居則繼續存活
                nextGrid[row][col] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
                // 死細胞的誕生規則：擁有 3 個活鄰居則誕生新細胞
                nextGrid[row][col] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    
    return nextGrid; // 返回下一世代的網格
}

// 函式：計算指定細胞周圍的活鄰居數量
function countNeighbors(row, col) {
    let count = 0;
    for (var i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // 忽略自己
            
            const newRow = row + i;
            const newCol = col + j;
            
            // 確認鄰居是否在邊界內並計算活細胞
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count; // 返回活鄰居的數量
}

// 函式：更新遊戲狀態
function update() {
    grid = getNextGeneration(); // 更新至下一世代
    generation++; // 增加世代計數
    updateGenerationDisplay(); // 更新世代顯示
    drawGrid(); // 繪製網格
}

// 函式：開始遊戲
function startGame() {
    if (!intervalId) { // 檢查遊戲是否已啟動
        intervalId = setInterval(update, simulationSpeed); // 設置定時更新
        startBtn.disabled = true; // 禁用開始按鈕
        stopBtn.disabled = false; // 啟用停止按鈕
    }
}

// 函式：停止遊戲
function stopGame() {
    if (intervalId) {
        clearInterval(intervalId); // 停止定時更新
        intervalId = null;
        startBtn.disabled = false; // 啟用開始按鈕
        stopBtn.disabled = true; // 禁用停止按鈕
        stepBtn.disabled = false; // 啟用步進按鈕
    }
}

// 事件監聽器：點擊畫布以手動改變細胞狀態
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = grid[row][col] === 1 ? 0 : 1; // 切換細胞狀態
        drawGrid();
    }
});

// 按鈕事件監聽器
startBtn.addEventListener("click", startGame); // 開始遊戲
stopBtn.addEventListener("click", stopGame); // 停止遊戲
stepBtn.addEventListener("click", update); // 進行單步更新
randomBtn.addEventListener("click", randomizeGrid); // 隨機生成細胞狀態
clearBtn.addEventListener("click", clearGrid); // 清除所有細胞狀態

// 初始設置
stopBtn.disabled = true; // 禁用停止按鈕
drawGrid(); // 繪製初始網格
